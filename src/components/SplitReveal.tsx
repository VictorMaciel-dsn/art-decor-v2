import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, reduceMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  /** Rendered element. Headings should pass their real tag for a11y. */
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Plays on mount (hero) instead of waiting for the element to scroll in. */
  immediate?: boolean;
  start?: string;
};

/**
 * Headline that rises line by line out of a mask, so the text appears to be
 * uncovered rather than flown in. The mask is what separates this from a
 * generic fade-up — nothing is ever seen outside its own line box.
 *
 * Splitting measures the rendered text, so it has to happen after the webfont
 * has swapped in. document.fonts.ready is awaited first; splitting against
 * Georgia and then having Cormorant load leaves the lines mis-measured.
 */
const SplitReveal = ({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  stagger = 0.12,
  duration = 1.1,
  immediate = false,
  start = "top 85%",
}: Props) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion || !ref.current) return;

      const el = ref.current;
      let split: SplitText | null = null;
      let cancelled = false;

      // Hidden until the split exists, so the unsplit text never flashes.
      gsap.set(el, { autoAlpha: 0 });

      // A title that stays invisible is far worse than one that misses its
      // animation, so the reveal is guaranteed: if fonts never settle, or
      // the split throws, the text is shown regardless.
      const show = () => gsap.set(el, { autoAlpha: 1 });
      const failsafe = window.setTimeout(show, 3000);

      document.fonts.ready
        .then(() => {
          if (cancelled) return;
          window.clearTimeout(failsafe);

          try {
            split = new SplitText(el, { type: "lines", mask: "lines" });
          } catch {
            show();
            return;
          }

          show();

          gsap.from(split.lines, {
            yPercent: 110,
            duration,
            delay,
            ease: "expo.out",
            stagger,
            ...(immediate
              ? {}
              : { scrollTrigger: { trigger: el, start, once: true } }),
          });
        })
        .catch(() => {
          window.clearTimeout(failsafe);
          show();
        });

      return () => {
        cancelled = true;
        window.clearTimeout(failsafe);
        split?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
};

export default SplitReveal;
