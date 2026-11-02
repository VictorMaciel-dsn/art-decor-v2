import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useLenis, scrollToAnchor } from "@/hooks/useLenis";
import { useSeo } from "@/hooks/useSeo";
import { afterLoad } from "@/lib/loadGsap";
import { ROUTES } from "@/lib/seo";

const belowFold = () => afterLoad().then(() => import("@/components/HomeBelowFold"));
const Sections = lazy(() => belowFold().then((m) => ({ default: m.Sections })));
const Footer = lazy(() => belowFold().then((m) => ({ default: m.Footer })));

/** About 2 seconds of frames, which comfortably covers fetching the chunk. */
const ANCHOR_RETRIES = 120;

const Index = () => {
  useLenis();
  useSeo(ROUTES.home);
  const { state } = useLocation();
  const anchor = (state as { anchor?: string } | null)?.anchor;

  // Coming back from the gallery via a nav link: the section only exists once
  // its lazy chunk has mounted, so the jump waits for the target to appear.
  useEffect(() => {
    if (!anchor) return;
    let tries = 0;
    let id = 0;
    const attempt = () => {
      if (document.querySelector(anchor)) scrollToAnchor(anchor);
      else if (tries++ < ANCHOR_RETRIES) id = requestAnimationFrame(attempt);
    };
    id = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(id);
  }, [anchor]);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <Sections />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      {/* Over everything, so the grain sits on the photos too. */}
      <div className="grain" aria-hidden="true" />
    </div>
  );
};

export default Index;
