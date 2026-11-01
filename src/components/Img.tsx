type Meta = { width: number; height: number };

type Props = {
  /**
   * A `?hq` import — vite-imagetools returns a srcset string covering the
   * WebP renditions it generates at build time.
   */
  src: string;
  /** Fallback URL for `src`; any `?hq&as=url` import of the same file. */
  fallback: string;
  /**
   * A `?meta` import of the same file. Its intrinsic size sets width/height,
   * which reserves the right box before the photo loads and lets the image
   * keep its own shape instead of being cropped to a fixed ratio.
   */
  meta: Meta;
  alt: string;
  className?: string;
  /** Matches the slot's CSS width so the browser picks the right rendition. */
  sizes?: string;
  eager?: boolean;
};

const Img = ({ src, fallback, meta, alt, className = "", sizes, eager = false }: Props) => (
  <img
    src={fallback}
    srcSet={src}
    sizes={sizes}
    width={meta.width}
    height={meta.height}
    alt={alt}
    loading={eager ? "eager" : "lazy"}
    decoding={eager ? "sync" : "async"}
    className={`photo-warm ${className}`}
  />
);

export default Img;
