import { useRef } from "react";
import { gsap, useGSAP, EASE_INOUT } from "@/lib/gsap";

/**
 * Two pleated panels covering the viewport that draw apart to reveal the hero,
 * then unmount. Pleats are a repeating linear-gradient rather than an image, so
 * the opening costs nothing to load and is never the thing delaying it.
 */
const CurtainIntro = ({ onDone }: { onDone?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(el, { display: "none" });
            onDone?.();
          },
        })
        // A beat of black before it moves — the pause is what makes the
        // opening feel deliberate instead of like a slow page load.
        .to(el.querySelectorAll("[data-panel]"), {
          xPercent: (i) => (i === 0 ? -100 : 100),
          duration: 1.6,
          ease: EASE_INOUT,
          delay: 0.25,
        });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90] flex"
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          data-panel
          className="h-full w-1/2 bg-ink"
          style={{
            // Soft vertical banding reads as fabric; the inset shadow on the
            // meeting edge keeps the two halves from looking like one flat wall.
            backgroundImage:
              "repeating-linear-gradient(90deg, hsl(var(--ink)) 0px, hsl(var(--ink-raised)) 14px, hsl(var(--ink)) 30px)",
            boxShadow:
              i === 0
                ? "inset -24px 0 48px hsl(0 0% 0% / 0.7)"
                : "inset 24px 0 48px hsl(0 0% 0% / 0.7)",
          }}
        />
      ))}
    </div>
  );
};

export default CurtainIntro;
