import { useRef } from "react";
import { gsap, useGSAP, EASE, reduceMotion } from "@/lib/gsap";

type Options = {
  /** Distance travelled, in px. Keep it small — long throws read as cheap. */
  y?: number;
  delay?: number;
  duration?: number;
  /**
   * Stagger between direct children instead of moving the container as one
   * block. Pass the gap in seconds.
   */
  stagger?: number;
  /** Overrides which descendants move. Defaults to the element itself. */
  selector?: string;
  /** Viewport position that fires it, in ScrollTrigger's syntax. */
  start?: string;
};

/**
 * Fade-and-rise on scroll-in, the default entrance for everything on the page.
 *
 * Returns a ref to spread onto the element. Under reduced motion the hook does
 * nothing at all and the content simply renders in place — no opacity:0 is ever
 * written, so there is no way for content to get stuck invisible.
 */
export const useReveal = <T extends HTMLElement = HTMLDivElement>({
  y = 28,
  delay = 0,
  duration = 1,
  stagger,
  selector,
  start = "top 85%",
}: Options = {}) => {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;

      const targets = selector
        ? ref.current.querySelectorAll(selector)
        : stagger
          ? ref.current.children
          : ref.current;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        ease: EASE,
        stagger,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return ref;
};
