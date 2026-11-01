import { useRef } from "react";
import { gsap, useGSAP, reduceMotion, MOBILE_BREAKPOINT } from "@/lib/gsap";

/**
 * Nudges an element a few pixels toward the cursor while it is hovered, then
 * lets it settle back. The pull is deliberately small — past about 8px it stops
 * reading as weight and starts reading as a bug.
 *
 * Only ever active on a desktop-sized viewport with a real pointer: on touch
 * there is no hover to track, and the handlers would just cost memory.
 */
export const useMagnetic = <T extends HTMLElement = HTMLAnchorElement>(
  strength = 6,
) => {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduceMotion) return;

      const mm = gsap.matchMedia();

      mm.add(
        `(min-width: ${MOBILE_BREAKPOINT}px) and (hover: hover) and (pointer: fine)`,
        () => {
          const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            // Offset from centre, normalised to -1..1, then scaled.
            const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
            const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
            gsap.to(el, {
              x: x * strength,
              y: y * strength,
              duration: 0.5,
              ease: "power3.out",
            });
          };

          const reset = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
          };

          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", reset);

          return () => {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", reset);
            gsap.set(el, { x: 0, y: 0 });
          };
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return ref;
};
