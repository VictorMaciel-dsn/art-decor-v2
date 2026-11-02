import { useEffect } from "react";
import { INTRO_MS, NO_INTRO_CLASS } from "@/lib/intro";

/**
 * Two pleated panels covering the viewport that draw apart to reveal the hero.
 * Pleats are a repeating linear-gradient rather than an image, so the opening
 * costs nothing to load.
 *
 * Runs on CSS alone (see .curtain in index.css), so it is part of the first
 * paint and never waits for JavaScript. Whether it shows at all is decided by
 * the inline script in index.html.
 */
const CurtainIntro = () => {
  useEffect(() => {
    const id = window.setTimeout(
      () => document.documentElement.classList.add(NO_INTRO_CLASS),
      INTRO_MS,
    );
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div aria-hidden="true" className="curtain pointer-events-none fixed inset-0 z-[90] flex overflow-hidden">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="curtain-panel h-full w-1/2 bg-ink"
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
