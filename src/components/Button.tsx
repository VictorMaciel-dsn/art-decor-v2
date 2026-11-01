import type { MouseEvent } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import SparkRing from "./SparkRing";

/** Written out in full so Tailwind's scanner can see both class names. */
const VARIANTS = {
  solid: "btn-solid",
  outline: "btn-outline",
} as const;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className="h-3.5 w-3.5 shrink-0">
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type Props = {
  children: string;
  href: string;
  variant?: keyof typeof VARIANTS;
  /** External links get the new-tab treatment; anchors stay in the page. */
  external?: boolean;
  arrow?: boolean;
  /** Suppresses the magnetic pull where a button sits in tight layout. */
  magnetic?: boolean;
  /** Adds the travelling gold spark. Reserved for the page's primary CTAs. */
  spark?: boolean;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * The site's link-button. The label is static: hover only changes the
 * surface under it (fill, glow) over 300ms, and the arrow nudges 3px. No
 * text motion — a label that moves under the cursor is hard to read.
 */
const Button = ({
  children,
  href,
  variant = "solid",
  external = false,
  arrow = true,
  magnetic = true,
  spark = false,
  className = "",
  onClick,
}: Props) => {
  const ref = useMagnetic<HTMLAnchorElement>(magnetic ? 6 : 0);

  return (
    <a
      ref={magnetic ? ref : undefined}
      href={href}
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`${VARIANTS[variant]} ${spark ? "btn-spark" : ""} ${className}`}
    >
      {spark && <SparkRing />}
      <span className="btn-label">{children}</span>
      {arrow && <Arrow />}
    </a>
  );
};

export default Button;
