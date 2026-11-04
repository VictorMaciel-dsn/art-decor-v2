import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import Img from "@/components/Img";
import Button from "@/components/Button";
import CTA from "@/components/CTA";
import { useLenis, getLenis } from "@/hooks/useLenis";
import { useSeo } from "@/hooks/useSeo";
import { BUSINESS } from "@/lib/seo";
import { SERVICES } from "@/data/services";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className={`h-3.5 w-3.5 ${className}`}>
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * The page for one service, written for the search that leads to it. It is
 * built from the home page's own pieces: the hero's frame and the alternating
 * blocks of Products.tsx. The copy lives in src/data/services.ts.
 */
const Servico = ({ id }: { id: keyof typeof SERVICES }) => {
  const service = SERVICES[id];
  useLenis();
  useSeo(service.route);

  // Lenis owns scrolling here, so it is told directly — see Projetos.tsx.
  useEffect(() => {
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden lg:h-screen">
          <img
            src={service.hero.imageUrl}
            srcSet={service.hero.image}
            // On a phone the wide photo is cropped to cover a tall box, so it
            // draws far wider than the screen and 100vw would leave it soft.
            sizes="(max-width: 767px) 640px, 100vw"
            // This React version passes through only the lowercase spelling.
            {...{ fetchpriority: "high" }}
            loading="eager"
            decoding="async"
            width={service.hero.meta.width}
            height={service.hero.meta.height}
            alt={service.hero.alt}
            className="hero-photo absolute inset-0 h-full w-full object-cover"
          />

          {/* The same three washes as Hero.tsx, plus one for phones: the copy
              spans the full width there, past where the side wash fades. */}
          <div className="pointer-events-none absolute inset-0 bg-ink/45 md:hidden" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,hsl(var(--ink)/0.94)_0%,hsl(var(--ink)/0.82)_28%,hsl(var(--ink)/0.45)_58%,hsl(var(--ink)/0.15)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_58%_42%,transparent_18%,hsl(var(--ink)/0.5)_72%,hsl(var(--ink)/0.88)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-[linear-gradient(to_bottom,transparent,hsl(var(--ink)))]" />

          <div className="shell relative flex h-full flex-col justify-end pb-24 md:pb-28 lg:pb-32">
            <span
              style={{ width: "5rem" }}
              className="gold-rule block origin-left opacity-80"
            />
            <p className="mt-7 text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-gold">
              45 anos de tradição
            </p>
            <h1 className="display mt-6 font-light text-ivory">
              {service.heading}
              <br />{" "}
              <span
                data-sheen="Teresópolis."
                className="gold-text gold-text-sheen whitespace-nowrap italic"
              >
                Teresópolis.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/70 sm:text-lg">
              {service.lede}
            </p>
            {/* Beside the button rather than above the title: the copy already
                fills the hero up to the header on a laptop screen. */}
            <div className="mt-11 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
              <Button href={BUSINESS.whatsappUrl} spark external arrow={false}>
                Solicitar orçamento
              </Button>
              <Link to="/" className="link-line text-gold hover:text-gold-light">
                <Arrow className="rotate-180" />
                Voltar ao início
              </Link>
            </div>
          </div>
        </section>

        <section className="section-y section-glow section-glow-left">
          <div className="shell">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Modelos</p>
                <h2 className="headline mt-7 font-light text-foreground">
                  {service.modelsTitle}{" "}
                  <span className="gold-text">sob medida.</span>
                </h2>
                <p className="lede mt-6">{service.intro}</p>
              </div>
            </Reveal>

            <div className="mt-24 space-y-24 md:mt-32 md:space-y-32 lg:space-y-40">
              {service.blocks.map((b, i) => {
                const flipped = i % 2 === 1;
                return (
                  <article
                    key={b.title}
                    className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-20"
                  >
                    <Reveal
                      className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
                      y={36}
                    >
                      <div className="zoom-frame">
                        <Img
                          src={b.image}
                          fallback={b.imageUrl}
                          meta={b.meta}
                          sizes="(min-width: 1024px) 52vw, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)"
                          alt={b.alt}
                          className="h-auto w-full"
                        />
                      </div>
                    </Reveal>

                    <Reveal
                      className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}
                      delay={0.12}
                    >
                      <span className="gold-text-sm font-serif text-sm tracking-[0.2em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 font-serif text-4xl font-light tracking-tight text-ivory lg:text-5xl">
                        {b.title}
                      </h3>
                      <p className="lede mt-6 max-w-md">{b.text}</p>
                      <p className="mt-6 text-xs font-light uppercase tracking-[0.14em] text-gold/70">
                        {b.detail}
                      </p>
                    </Reveal>
                  </article>
                );
              })}
            </div>

            <Link
              to={`/projetos#${service.category}`}
              className="link-line mt-24 font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
            >
              Ver todos os projetos
              <Arrow />
            </Link>
          </div>
        </section>

        <section className="section-y bg-ink">
          <div className="shell">
            <Reveal>
              <div className="max-w-2xl">
                <p className="eyebrow">Dúvidas</p>
                <h2 className="headline mt-7 font-light text-foreground">
                  Perguntas <span className="gold-text">frequentes.</span>
                </h2>
              </div>
            </Reveal>
            <div className="mt-14 max-w-3xl space-y-10">
              {service.faq.map((f) => (
                <div key={f.q} className="border-t border-gold/15 pt-6">
                  <h3 className="font-serif text-2xl font-light text-ivory">{f.q}</h3>
                  <p className="mt-3 font-light leading-relaxed text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
            <Link
              to={service.sibling.to}
              className="link-line mt-14 font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
            >
              {service.sibling.label}
              <Arrow />
            </Link>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <div className="grain" aria-hidden="true" />
    </div>
  );
};

export default Servico;
