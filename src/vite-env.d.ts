/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 "G-…" id, set in Vercel for Production. Unset means no analytics. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

// vite-imagetools imports. `?hq` yields a srcset string (900w + 1800w WebP);
// `?hq&as=url` yields a single URL to use as the plain src fallback.
declare module "*?hq" {
  const srcset: string;
  export default srcset;
}

declare module "*?hq&as=url" {
  const src: string;
  export default src;
}

// Any hand-tuned directive chain ending in `as=url` is a single URL too.
declare module "*&as=url" {
  const src: string;
  export default src;
}

// And a chain ending in `as=srcset` is a srcset string.
declare module "*&as=srcset" {
  const srcset: string;
  export default srcset;
}

// `?meta` yields the source's intrinsic dimensions, so a layout can follow the
// photo's real shape instead of a hard-coded aspect ratio.
declare module "*?meta" {
  const meta: { width: number; height: number };
  export default meta;
}
