type Props = {
  className?: string;
  /** Animates the metallic sweep across the letters. */
  sheen?: boolean;
};

/**
 * The Art Decor wordmark, drawn as live text with the gold-foil gradient
 * clipped to the glyphs — stays razor sharp at any size, unlike the JPEG.
 */
const Logo = ({ className = "", sheen = false }: Props) => (
  <span className={`inline-flex flex-col items-center leading-none ${className}`}>
    <span
      className={`gold-text font-serif font-semibold tracking-[0.01em] ${
        sheen ? "gold-text-sheen" : ""
      }`}
      style={{ fontSize: "1em" }}
    >
      ART DECOR
    </span>
    <span
      className="gold-text-sm mt-[0.28em] text-[0.2em] font-medium uppercase tracking-[0.34em]"
      style={{ lineHeight: 1 }}
    >
      de Teresópolis
    </span>
  </span>
);

export default Logo;
