import { useEffect, type RefObject } from "react";

/**
 * Resolves once the page has loaded and the main thread has a moment, so
 * nothing below it competes with the first paint.
 */
export const afterLoad = () =>
  new Promise<void>((resolve) => {
    if (typeof window === "undefined") return resolve();

    const idle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => resolve(), { timeout: 1500 });
      } else {
        setTimeout(resolve, 200);
      }
    };
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });

export type GsapModule = typeof import("./gsap");

/** Fetches GSAP immediately, for motion the visitor has just asked for. */
export const importGsap = (): Promise<GsapModule> => import("./gsap");

let deferred: Promise<GsapModule> | null = null;

/** Fetches GSAP after first paint. Every caller shares the one download. */
export const loadGsap = () => (deferred ??= afterLoad().then(importGsap));

/**
 * useGSAP for the first-load bundle: runs `setup` in a GSAP context scoped to
 * `scope` once GSAP has arrived, and reverts it on unmount.
 */
export const useDeferredGsap = (
  setup: (module: GsapModule) => void | (() => void),
  scope: RefObject<Element>,
) => {
  useEffect(() => {
    let cancelled = false;
    let context: gsap.Context | undefined;

    loadGsap().then((module) => {
      if (cancelled) return;
      context = module.gsap.context(() => setup(module), scope.current ?? undefined);
    });

    return () => {
      cancelled = true;
      context?.revert();
    };
    // Runs once per mount, as useGSAP does without dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
