/**
 * The curtain opening plays on the first view of a session: the reveal is a
 * piece of theatre, and theatre repeated on every navigation becomes a toll.
 *
 * The decision is made by the inline script in index.html, before first paint,
 * and is carried by this class on <html>. Once the opening has run the class is
 * added here too, so returning to the home page within the session skips it.
 */
export const NO_INTRO_CLASS = "no-intro";

/** Curtain delay + travel, plus the photo's settle running under it. */
export const INTRO_MS = 3600;
