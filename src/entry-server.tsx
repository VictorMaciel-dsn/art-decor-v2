/* eslint-disable react-refresh/only-export-components -- build-time module, never hot-reloaded */
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";

export { ROUTES, headTags, absoluteUrl, SITE_URL } from "./lib/seo";

/**
 * Build-time only (scripts/prerender.mjs): renders a route to HTML so it paints
 * before any JavaScript runs and its text is in the source for crawlers. In the
 * browser, main.tsx hydrates this markup, so anything only known on the client
 * (reduced motion) must not change what a component renders on its first pass.
 *
 * The stream API because it waits for lazy chunks. renderToString would write
 * every lazy section as its empty fallback, and the page would lose its text.
 */
export const render = (url: string) =>
  new Promise<string>((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk;
        done();
      },
    });
    // React's Node stream flushes its whole buffer when an accented character
    // does not fit at the end, leaving a stray NUL byte in the markup.
    sink.on("finish", () => resolve(html.replace(/\0/g, "")));

    const { pipe } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      {
        onAllReady: () => pipe(sink),
        onShellError: reject,
        onError: reject,
      },
    );
  });
