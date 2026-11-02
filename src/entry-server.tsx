/* eslint-disable react-refresh/only-export-components -- build-time module, never hot-reloaded */
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";

export { ROUTES, headTags, absoluteUrl, SITE_URL } from "./lib/seo";

/**
 * Build-time only (scripts/prerender.mjs): renders a route to plain HTML so
 * its text, headings, links and images are in the page source for crawlers
 * that do not run JavaScript. In the browser, main.tsx mounts a fresh tree
 * over it rather than hydrating, because several first-paint states (the
 * curtain intro, reduced motion) are only known on the client.
 */
export const render = (url: string) =>
  renderToStaticMarkup(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
