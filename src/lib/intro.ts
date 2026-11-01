import { reduceMotion } from "@/lib/gsap";

const SEEN_KEY = "artdecor:intro-seen";

/**
 * Whether the full curtain opening should play. True only on the first view of
 * a session: the reveal is a piece of theatre, and theatre repeated on every
 * navigation becomes a toll. Evaluated once at module load so Hero and
 * CurtainIntro cannot disagree about it mid-render.
 */
export const playsIntro = (() => {
  if (typeof window === "undefined" || reduceMotion) return false;
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false;
    sessionStorage.setItem(SEEN_KEY, "1");
    return true;
  } catch {
    // Private mode / storage blocked — treat it as a repeat visit rather than
    // replaying the long opening on every single page view.
    return false;
  }
})();
