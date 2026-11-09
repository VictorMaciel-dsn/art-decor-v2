/**
 * Google Analytics 4, switched on by VITE_GA_MEASUREMENT_ID at build time and
 * only on the real domain, so local runs and *.vercel.app never reach the
 * report. Page views, including client-side route changes, come from GA's
 * Enhanced Measurement; this module adds the contact clicks that matter.
 *
 * Nothing here is inline, so the CSP in vercel.json needs no extra hash.
 */
import { SITE_URL } from "@/lib/seo";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// gtag.js only understands real `arguments` objects, not plain arrays.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
}

export const track = (event: string, params: Record<string, string> = {}) => {
  gtag("event", event, params);
};

/** Which link a click counts as, by where it leads. */
const contactEvent = (href: string) => {
  if (href.startsWith("https://wa.me/")) return "whatsapp_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.includes("instagram.com")) return "instagram_click";
  if (href.includes("maps.google.") || href.includes("google.com/maps")) return "directions_click";
  return null;
};

const linkPlacement = (link: Element) => {
  if (link.classList.contains("whatsapp-fab")) return "botao_flutuante";
  const landmark = link.closest("header, footer");
  if (landmark) return landmark.tagName.toLowerCase();
  return link.closest("section[id]")?.id ?? "pagina";
};

// One listener instead of a handler on each of the site's contact links.
const onClick = (e: MouseEvent) => {
  const link = (e.target as Element | null)?.closest?.("a[href]");
  if (!link) return;
  const event = contactEvent(link.getAttribute("href") ?? "");
  if (event) track(event, { link_placement: linkPlacement(link) });
};

export const initAnalytics = () => {
  if (!MEASUREMENT_ID || window.location.hostname !== new URL(SITE_URL).hostname) return;

  window.dataLayer = window.dataLayer ?? [];
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID);
  document.addEventListener("click", onClick, true);

  // Queued calls wait in dataLayer, so the script can arrive after the page
  // has painted and keep its weight out of the mobile PageSpeed numbers.
  const load = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };
  const whenIdle = () => {
    if ("requestIdleCallback" in window) window.requestIdleCallback(load, { timeout: 3000 });
    else setTimeout(load, 1500);
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
};
