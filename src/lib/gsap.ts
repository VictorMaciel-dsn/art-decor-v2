import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { reduceMotion, MOBILE_BREAKPOINT } from "./motion";

// Registered once, here, so no component has to remember to do it.
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * The house easing. Long tail, no overshoot — movement decelerates into place
 * instead of settling onto it, which is what reads as expensive.
 */
export const EASE = "power3.out";
/** For curtains and masks: slow start AND slow finish, nothing abrupt. */
export const EASE_INOUT = "power4.inOut";

export { gsap, ScrollTrigger, SplitText, useGSAP, reduceMotion, MOBILE_BREAKPOINT };
