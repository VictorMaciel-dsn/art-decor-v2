/* eslint-disable react-refresh/only-export-components -- loaded through React.lazy, never hot-swapped on its own */
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import About from "./About";
import Products from "./Products";
import Projects from "./Projects";
import Benefits from "./Benefits";
import Process from "./Process";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

export { default as Footer } from "./Footer";

/**
 * Everything on the home page past the hero, as one chunk that arrives after
 * first paint. Its markup is already on screen from the pre-render.
 */
export const Sections = () => {
  // The triggers below are measured as they mount, and the pinned section moves
  // everything after it, so they are all re-measured together, once, against
  // the final fonts.
  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <About />
      <Products />
      <Projects />
      <Benefits />
      <Process />
      <Testimonials />
      <CTA />
    </>
  );
};
