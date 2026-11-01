import { useRef } from "react";
import { gsap, useGSAP, EASE, reduceMotion, MOBILE_BREAKPOINT } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import Button from "./Button";
import ctaImage from "@/assets/img/cortina_pregaMacho2.png?hq";
import ctaImageUrl from "@/assets/img/cortina_pregaMacho2.png?hq&as=url";
// Portrait composition for phones, where the 2.18:1 wide shot would be
// cropped to a sliver of its centre.
import ctaMobile from "@/assets/img/cortina_pregaMacho2-mobile.png?hq";

const WHATSAPP = "https://wa.me/5521983216443";

const CTA = () => {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (reduceMotion) return;

      // Drifts behind the copy rather than zooming on entry — the section is
      // passed through on the way to the footer, so it reads better in motion.
      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${MOBILE_BREAKPOINT}px)`, () => {
        gsap.fromTo(
          image.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.from("[data-cta-fade]", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: EASE,
        stagger: 0.14,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
  <section ref={root} className="relative overflow-hidden">
    {/* Oversized so the drift never exposes an edge. */}
    <div className="absolute inset-0 -top-[8%] h-[116%]">
      <picture className="block h-full w-full">
        <source
          media="(max-width: 767px)"
          srcSet={ctaMobile}
          sizes="100vw"
        />
        <img
          ref={image}
          src={ctaImageUrl}
          srcSet={ctaImage}
          sizes="100vw"
          loading="lazy"
          decoding="async"
          width={1850}
          height={850}
          alt="Cortina de voil do piso ao teto em sala com vista para o mar"
          className="photo-warm h-full w-full object-cover"
        />
      </picture>
    </div>
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,hsl(var(--ink)/0.97)_0%,hsl(var(--ink)/0.93)_34%,hsl(var(--ink)/0.78)_64%,hsl(var(--ink)/0.62)_100%)]" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_62%_45%,transparent_10%,hsl(var(--ink)/0.55)_66%,hsl(var(--ink)/0.9)_100%)]" />
    {/* Drains the colour out of the room so the frame stays black-and-gold. */}
    <div className="pointer-events-none absolute inset-0 bg-ink/55 mix-blend-color" />
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_60%,hsl(var(--gold)/0.1),transparent_58%)]" />
    {/* Seams into the footer instead of stopping at a hard edge. */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_bottom,transparent,hsl(var(--ink)))]" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-[linear-gradient(to_top,transparent,hsl(var(--ink)))]" />

    <div className="shell relative flex min-h-[72vh] flex-col justify-center py-28 md:min-h-[80vh]">
      <SplitReveal
        as="h2"
        className="headline max-w-[18ch] font-light text-ivory"
      >
        Seu ambiente merece{" "}
        <span className="gold-text whitespace-nowrap">um novo olhar.</span>
      </SplitReveal>

      <p
        data-cta-fade
        className="mt-7 text-lg font-light text-ivory/70"
      >
        Vamos conversar sobre o seu projeto?
      </p>

      <div data-cta-fade className="mt-11">
        <Button href={WHATSAPP} spark external>
          Solicitar orçamento
        </Button>
      </div>
    </div>
  </section>
  );
};

export default CTA;
