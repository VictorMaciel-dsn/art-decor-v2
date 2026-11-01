import { useRef } from "react";
import { gsap, useGSAP, reduceMotion, MOBILE_BREAKPOINT } from "@/lib/gsap";

type Options = {
  /**
   * How far the element drifts over its full pass through the viewport, as a
   * percentage of its own height. Positive moves it down (it lags the scroll).
   */
  amount?: number;
  /** Phones get a gentler drift; under 640px it is switched off entirely. */
  mobileAmount?: number;
  /** Element the scroll is measured against. Defaults to the target's parent. */
  trigger?: () => Element | null;
};

/**
 * Scrubbed vertical drift. The element must sit inside an `overflow-hidden`
 * parent and be oversized (h-[120%] or similar), or the drift exposes an edge.
 *
 * gsap.matchMedia handles the breakpoints and reverts cleanly on resize, so a
 * phone rotated to landscape gets the desktop treatment without a reload.
 */
export const useParallax = <T extends HTMLElement = HTMLDivElement>({
  amount = 18,
  mobileAmount = 8,
  trigger,
}: Options = {}) => {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;

      const mm = gsap.matchMedia();

      const drift = (yPercent: number) => () => {
        gsap.fromTo(
          ref.current,
          { yPercent: -yPercent / 2 },
          {
            yPercent: yPercent / 2,
            ease: "none",
            scrollTrigger: {
              trigger: trigger?.() ?? ref.current!.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      };

      mm.add(`(min-width: ${MOBILE_BREAKPOINT}px)`, drift(amount));
      mm.add(
        `(min-width: 640px) and (max-width: ${MOBILE_BREAKPOINT - 1}px)`,
        drift(mobileAmount),
      );
      // Below 640px: no parallax. Small screens scroll fast and the drift just
      // reads as the image sliding around.

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
};
