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
      className={`gold-text gold-text-bright font-serif font-semibold tracking-[0.01em] ${
        sheen ? "gold-text-sheen" : ""
      }`}
      style={{ fontSize: "1em" }}
    >
      ART DECOR
    </span>
    {/* 0.2em of the wordmark was 4–5.6px — below what any screen can draw
        legibly. The floor keeps it at a real caption size, and a flat
        colour renders crisper than a gradient clipped to such small glyphs. */}
    <span
      className="-mr-[0.24em] mt-[0.4em] font-semibold uppercase tracking-[0.24em] text-gold-light"
      style={{ fontSize: "max(0.24em, 0.5625rem)", lineHeight: 1 }}
    >
      de Teresópolis
    </span>
  </span>
);

export default Logo;
