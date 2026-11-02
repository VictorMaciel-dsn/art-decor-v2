import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { reduceMotion } from "@/lib/motion";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// useLayoutEffect warns when rendered at build time, and has nothing to do there.
const useBeforePaint = typeof document === "undefined" ? useEffect : useLayoutEffect;

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/**
 * Fade-and-rise as the block scrolls into view, once. The hidden state is only
 * ever written from here, so the pre-rendered HTML always shows the content,
 * including to crawlers and to anyone without JavaScript.
 */
const Reveal = ({ children, delay = 0, y = 24, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useBeforePaint(() => {
    const el = ref.current;
    if (!el || reduceMotion) return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.style.transition = `opacity 0.9s ${EASE} ${delay}s, transform 0.9s ${EASE} ${delay}s`;
        el.style.opacity = "1";
        el.style.transform = "none";
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
    // Runs once: a re-render must not re-hide content already shown.
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
