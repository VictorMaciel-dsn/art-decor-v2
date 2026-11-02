import { useEffect } from "react";
import type Lenis from "lenis";
import { reduceMotion } from "@/lib/motion";
import { loadGsap } from "@/lib/loadGsap";

/**
 * The single Lenis instance. Held at module scope so anchors anywhere in the
 * tree can scroll through it without prop-drilling or context.
 */
let lenis: Lenis | null = null;

export const getLenis = () => lenis;

/**
 * Scrolls to an anchor, clearing the fixed navbar so the target heading is not
 * hidden underneath it. Falls back to a native jump when smooth scroll is off,
 * which is also the reduced-motion path.
 */
export const scrollToAnchor = (hash: string) => {
  const target = document.querySelector(hash);
  if (!target) return;

  // The header shrinks as you scroll, so it is measured rather than assumed.
  // It also reappears on any upward scroll, so the gap is always reserved —
  // offsetHeight is used even while the bar is retracted.
  const header = document.querySelector("header");
  const offset = -((header?.offsetHeight ?? 0) + 8);

  if (lenis) {
    // scrollTo clamps to the page height Lenis last measured, which is stale if
    // the target's section has only just mounted.
    lenis.resize();
    lenis.scrollTo(target as HTMLElement, { offset, duration: 1.4 });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  }
};

/**
 * Smooth scroll driven by GSAP's ticker rather than its own rAF loop, so Lenis
 * and every ScrollTrigger advance on the same frame. Running two loops is what
 * makes scrubbed animation jitter.
 *
 * Loaded after first paint; until then the page scrolls natively.
 */
export const useLenis = () => {
  useEffect(() => {
    // Reduced motion gets the browser's own instant scrolling.
    if (reduceMotion) return;

    let cancelled = false;
    let stop: (() => void) | undefined;

    Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
      if (cancelled) return;

      const instance = new Lenis({
        duration: 1.1,
        // Slightly eased-out ramp; the default is a touch floaty for this much black.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Touch devices already scroll well natively, and hijacking it on a phone
        // is the fastest way to make a site feel broken.
        syncTouch: false,
        autoRaf: false,
        anchors: false,
      });

      lenis = instance;

      instance.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => instance.raf(time * 1000);
      gsap.ticker.add(tick);
      // GSAP smooths delta times by default; Lenis wants the raw clock.
      gsap.ticker.lagSmoothing(0);

      stop = () => {
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        instance.destroy();
        lenis = null;
      };
    });

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);
};
