import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLenis, scrollToAnchor } from "@/hooks/useLenis";
import { useSeo } from "@/hooks/useSeo";
import { ROUTES } from "@/lib/seo";

const Index = () => {
  useLenis();
  useSeo(ROUTES.home);
  const { state } = useLocation();
  const anchor = (state as { anchor?: string } | null)?.anchor;

  // Coming back from the gallery via a nav link: the section only exists
  // once this page has mounted, so the jump is made here rather than in the
  // header. A frame of delay lets Lenis take over the scroll first.
  useEffect(() => {
    if (!anchor) return;
    const id = requestAnimationFrame(() => scrollToAnchor(anchor));
    return () => cancelAnimationFrame(id);
  }, [anchor]);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <About />
        <Products />
        <Projects />
        <Benefits />
        <Process />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      {/* Over everything, so the grain sits on the photos too. */}
      <div className="grain" aria-hidden="true" />
    </div>
  );
};

export default Index;
