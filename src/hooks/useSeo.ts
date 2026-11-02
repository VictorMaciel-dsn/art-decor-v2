import { useEffect } from "react";
import { absoluteUrl, structuredData, type RouteSeo } from "@/lib/seo";

/** Finds a <head> element by selector, creating it on first use. */
const ensure = (selector: string, create: () => HTMLElement) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
};

const setMeta = (attr: "name" | "property", key: string, content: string) =>
  ensure(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  }).setAttribute("content", content);

/**
 * Keeps <head> in step with the current route in the browser. Each page's
 * static HTML already arrives with these tags written in (see
 * scripts/prerender.mjs); this only matters once the visitor navigates
 * client-side — and for Google, which renders the page and reads the result.
 */
export const useSeo = (route: RouteSeo) => {
  useEffect(() => {
    const url = absoluteUrl(route.path);

    document.title = route.title;
    setMeta("name", "description", route.description);
    setMeta(
      "name",
      "robots",
      route.noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    setMeta("property", "og:title", route.title);
    setMeta("property", "og:description", route.description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", route.title);
    setMeta("name", "twitter:description", route.description);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (route.noindex) {
      canonical?.remove();
    } else {
      ensure('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }).setAttribute("href", url);
    }

    ensure('script[type="application/ld+json"]', () => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      return s;
    }).textContent = JSON.stringify(structuredData(route));
  }, [route]);
};
