import { useRef } from "react";
import { reduceMotion, MOBILE_BREAKPOINT } from "@/lib/motion";
import { useDeferredGsap } from "@/lib/loadGsap";
import Button from "./Button";
import CurtainIntro from "./CurtainIntro";
import { scrollToAnchor } from "@/hooks/useLenis";
import heroImage from "@/assets/img/tela_capa.png?hq";
import heroImageUrl from "@/assets/img/tela_capa.png?hq&as=url";
// A portrait crop for phones. The wide shot is 2.16:1, so filling a tall
// phone screen with it meant cropping away most of the frame; this one is
// composed for the format. <picture> picks one or the other, so only the
// matching file is ever downloaded.
import heroMobile from "@/assets/img/tela_mobile.png?w=480;768;1024&format=webp&quality=72&as=srcset";

const WHATSAPP = "https://wa.me/5521983216443";

// This photo is the page's LCP and the copy is what it is read with, so none of
// it may wait on JavaScript or start hidden. The only entrance motion left is
// the photo settling (.hero-photo), and that is transform-only CSS.
const Hero = () => {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLImageElement>(null);

  useDeferredGsap(({ gsap }) => {
    if (reduceMotion) return;

    // Parallax: the photo lags the scroll while the copy lifts and fades out.
    const mm = gsap.matchMedia();
    mm.add(`(min-width: ${MOBILE_BREAKPOINT}px)`, () => {
      const scrub = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(image.current, { yPercent: 18, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-hero-copy]", {
        yPercent: -14,
        opacity: 0,
        ease: "none",
        scrollTrigger: { ...scrub, end: "bottom 30%" },
      });
    });
    return () => mm.revert();
  }, root);

  return (
    <>
      <CurtainIntro />

      <section
        ref={root}
        id="top"
        className="relative h-[92vh] min-h-[620px] w-full overflow-hidden lg:h-screen"
      >
        {/* Oversized so the parallax drift never exposes an edge. */}
        <div className="absolute inset-0 -top-[10%] h-[120%]">
          {/* <picture> is an inline box by default; it has to fill the
              sized wrapper or the img's h-full resolves against nothing. */}
          <picture className="hero-photo block h-full w-full">
            {/* Phones get the portrait crop. The breakpoint matches the
                layout's own: above it the wide shot has room to read. */}
            <source
              media="(max-width: 767px)"
              srcSet={heroMobile}
              sizes="100vw"
              width={1024}
              height={1536}
            />
            <img
              ref={image}
              src={heroImageUrl}
              srcSet={heroImage}
              sizes="100vw"
              // This React version passes through only the lowercase spelling.
              {...{ fetchpriority: "high" }}
              loading="eager"
              decoding="async"
              width={1844}
              height={853}
              alt="Fachada iluminada à noite com cortinas do piso ao teto"
              className="h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* Light falls on the fabric and the rest goes to black: a hard wash
            from the left where the copy sits, a vignette to close the corners,
            then a fade into the next section so the seam disappears. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,hsl(var(--ink)/0.94)_0%,hsl(var(--ink)/0.82)_28%,hsl(var(--ink)/0.45)_58%,hsl(var(--ink)/0.15)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_58%_42%,transparent_18%,hsl(var(--ink)/0.5)_72%,hsl(var(--ink)/0.88)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(to_bottom,transparent,hsl(var(--ink)))]" />

        <div className="shell relative flex h-full flex-col justify-end pb-24 md:pb-28 lg:pb-32">
          <div data-hero-copy>
            {/* .gold-rule carries w-full, so the width is set inline to keep
                it from depending on which utility Tailwind emits last. */}
            <span
              data-hero-rule
              style={{ width: "5rem" }}
              className="gold-rule block origin-left opacity-80"
            />

            <p
              data-hero-eyebrow
              className="mt-7 text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-gold"
            >
              45 anos de tradição
            </p>

            <h1 className="display mt-6 font-light text-ivory">
              {/* An explicit break keeps the gold phrase whole on every width;
                  the nowrap stops it splitting if a narrow screen disagrees. */}
              O toque final
              <br />
              <span className="gold-text gold-text-sheen whitespace-nowrap italic">
                da sua casa.
              </span>
            </h1>

            <p
              data-hero-fade
              className="mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/70 sm:text-lg"
            >
              Cortinas e persianas sob medida, com tecidos selecionados,
              acabamento impecável e soluções inteligentes para transformar
              seus ambientes.
            </p>

            <div
              data-hero-fade
              className="mt-11 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6"
            >
              <Button
                href="#projetos"
                spark
                onClick={(e) => {
                  e.preventDefault();
                  scrollToAnchor("#projetos");
                }}
              >
                Conheça nossos projetos
              </Button>
              <Button href={WHATSAPP} variant="outline" spark external arrow={false}>
                Solicitar orçamento
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll cue — a gold line travelling down its own track. */}
        <div
          data-hero-scroll
          className="pointer-events-none absolute inset-x-0 bottom-7 hidden flex-col items-center gap-3 lg:flex"
        >
          <span className="text-[0.625rem] font-medium uppercase tracking-[0.3em] text-ivory/50">
            Role
          </span>
          <span className="scroll-track relative h-12 w-px overflow-hidden bg-ivory/15" />
        </div>
      </section>
    </>
  );
};

export default Hero;
