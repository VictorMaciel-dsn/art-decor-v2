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
import { useLenis } from "@/hooks/useLenis";

const Index = () => {
  useLenis();

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
