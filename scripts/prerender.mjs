/**
 * Post-build step (see "build" in package.json). Runs after the client build
 * (dist/) and the SSR build of src/entry-server.tsx (dist-ssr/):
 *
 *  1. renders every route to static HTML and writes it into its own file,
 *     with that route's <title>, description, canonical, Open Graph and
 *     JSON-LD — so crawlers that never execute JavaScript (AI assistants,
 *     link previews) see the real page, and Google gets it on first fetch;
 *  2. writes 404.html, which Vercel serves with a real 404 status for any
 *     unknown address (no more soft-404s on the homepage);
 *  3. writes sitemap.xml, listing every indexable page and the photos on it.
 *
 * Adding a route: add it to AppRoutes (src/App.tsx), to ROUTES
 * (src/lib/seo.ts) and to PAGES below.
 */
import { readFile, writeFile, rm, access } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render, headTags, ROUTES, SITE_URL, absoluteUrl } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

/** Route → output file. cleanUrls in vercel.json serves projetos.html at /projetos. */
const PAGES = [
  { route: ROUTES.home, file: "index.html", priority: "1.0" },
  { route: ROUTES.projetos, file: "projetos.html", priority: "0.8" },
  { route: ROUTES.notFound, file: "404.html" },
];

const template = await readFile(path.join(dist, "index.html"), "utf8");
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!SEO_BLOCK.test(template) || !template.includes("<!--app-html-->")) {
  throw new Error("index.html is missing the seo:start/seo:end or app-html markers");
}

const decode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const xml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const sitemapEntries = [];
const missing = new Set();

for (const { route, file, priority } of PAGES) {
  const body = render(route.path);
  const html = template
    .replace(SEO_BLOCK, headTags(route))
    .replace("<!--app-html-->", `<div class="prerender">${body}</div>`);
  await writeFile(path.join(dist, file), html);

  // Every asset the static page points at must exist in the client build —
  // the SSR pass computes its own URLs, so this catches any drift.
  for (const m of body.matchAll(/\/assets\/[^"\s,)]+/g)) {
    try {
      await access(path.join(dist, m[0]));
    } catch {
      missing.add(m[0]);
    }
  }

  if (route.noindex) continue;

  // Photos on the page, by their single-URL fallback (src). Decorative
  // images carry an empty alt and are skipped.
  const images = [];
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const src = m[0].match(/\ssrc="([^"]+)"/)?.[1];
    const alt = m[0].match(/\salt="([^"]*)"/)?.[1];
    if (src && alt && !images.some((i) => i.src === src)) {
      images.push({ src: decode(src), alt: decode(alt) });
    }
  }
  sitemapEntries.push({ loc: absoluteUrl(route.path), priority, images });
  console.log(`prerendered ${route.path} → ${file} (${images.length} images)`);
}

if (missing.size) {
  throw new Error(`prerendered HTML references missing assets:\n${[...missing].join("\n")}`);
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${sitemapEntries
  .map(
    (e) => `  <url>
    <loc>${xml(e.loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${e.priority}</priority>
${e.images
  .map(
    (i) => `    <image:image>
      <image:loc>${xml(SITE_URL + i.src)}</image:loc>
    </image:image>`,
  )
  .join("\n")}
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log(`sitemap.xml → ${sitemapEntries.length} pages`);

await rm(ssrDir, { recursive: true, force: true });
