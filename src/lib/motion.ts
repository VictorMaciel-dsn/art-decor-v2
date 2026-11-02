/**
 * Motion settings that are safe in the first-load bundle. GSAP itself is not:
 * see lib/loadGsap.ts.
 */

/**
 * Read once at module load. A visitor who flips the OS setting mid-session is
 * rare enough that re-running every timeline to honour it costs more than it
 * is worth; a reload picks it up.
 */
export const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Parallax and other scrubbed motion is halved on phones and off under 640px. */
export const MOBILE_BREAKPOINT = 1024;
