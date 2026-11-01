import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registered once, here, so no component has to remember to do it.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The house easing. Long tail, no overshoot — movement decelerates into place
 * instead of settling onto it, which is what reads as expensive.
 */
export const EASE = "power3.out";
/** For curtains and masks: slow start AND slow finish, nothing abrupt. */
export const EASE_INOUT = "power4.inOut";

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

export { gsap, ScrollTrigger, SplitText, useGSAP };
