import { useEffect, useRef, useState } from "react";
import { reduceMotion } from "@/lib/gsap";
import Reveal from "./Reveal";
import Img from "./Img";
import curtains from "@/assets/img/cortina_pregaMacho.jpg?hq";
import curtainsUrl from "@/assets/img/cortina_pregaMacho.jpg?hq&as=url";
import curtainsMeta from "@/assets/img/cortina_pregaMacho.jpg?meta";
import blinds from "@/assets/img/persiana_romana.png?hq";
import blindsUrl from "@/assets/img/persiana_romana.png?hq&as=url";
import blindsMeta from "@/assets/img/persiana_romana.png?meta";
import motorized from "@/assets/img/persiana_teto.jpg?hq";
import motorizedUrl from "@/assets/img/persiana_teto.jpg?hq&as=url";
import motorizedMeta from "@/assets/img/persiana_teto.jpg?meta";
import motorizedVideo from "@/assets/img/motorizada.mp4";
import motorizedPoster from "@/assets/img/motorizada_poster.jpg?w=1280&format=webp&quality=88&as=url";

const WHATSAPP = "https://wa.me/5521983216443";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className="h-3.5 w-3.5">
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const blocks = [
  {
    id: "cortinas",
    number: "01",
    title: "Cortinas",
    text: "Tecidos selecionados para vestir seus ambientes com leveza, conforto e personalidade.",
    cta: "Conhecer coleção",
    image: curtains,
    imageUrl: curtainsUrl,
    meta: curtainsMeta,
    alt: "Cortina de prega macho em sala de estar",
    detail: "Prega macho · Wave · Ilhós · Blackout",
  },
  {
    id: "persianas",
    number: "02",
    title: "Persianas",
    text: "Controle preciso da luz com soluções que unem funcionalidade e estética.",
    cta: "Conhecer coleção",
    image: blinds,
    imageUrl: blindsUrl,
    meta: blindsMeta,
    alt: "Persiana romana em ambiente iluminado",
    detail: "Romana · Rolô · Vertical · Painel",
  },
  {
    id: "automacao",
    number: "03",
    title: "Automação",
    text: "Tecnologia integrada para transformar conforto em experiência.",
    cta: "Conhecer soluções",
    image: motorized,
    imageUrl: motorizedUrl,
    meta: motorizedMeta,
    alt: "Persiana motorizada instalada no teto",
    detail: "Motorização · Controle remoto · Integração smart home",
    // Automation is movement, so this block shows the real thing running
    // instead of a still. Falls back to the photo if video cannot play.
    video: motorizedVideo,
    poster: motorizedPoster,
  },
];

/**
 * The clip is several megabytes, so the source is only attached once the
 * block is near the viewport — until then the poster stands in and nothing
 * is downloaded. Playback pauses while the video is off screen, and reduced
 * motion gets the poster alone, with controls to play it deliberately.
 */
const LazyVideo = ({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion never preloads: the poster stays until the visitor
    // presses play, and the controls are there for exactly that.
    if (reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        // Once loaded, keep it in step with visibility rather than letting
        // it loop unseen behind the rest of the page.
        if (!reduceMotion && el.src) {
          if (entry.isIntersecting) el.play().catch(() => {});
          else el.pause();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      // Attaching src is what starts the download, so it waits for `near`.
      // Under reduced motion it is attached up front but never preloaded,
      // so the controls work without fetching anything until pressed.
      src={near || reduceMotion ? src : undefined}
      poster={poster}
      width={1280}
      height={720}
      autoPlay={!reduceMotion}
      muted
      loop
      playsInline
      controls={reduceMotion}
      preload="none"
      aria-label={label}
      className="photo-warm h-auto w-full"
    />
  );
};

const Products = () => (
  <section className="section-y section-glow section-glow-left">
    <div className="shell">
      <Reveal>
        <div className="max-w-2xl">
          <p className="eyebrow">Coleções</p>
          <h2 className="headline mt-7 font-light text-foreground">
            Elegância em <span className="gold-text">cada detalhe.</span>
          </h2>
          <p className="lede mt-6">
            Soluções pensadas para transformar luz, conforto e atmosfera.
          </p>
        </div>
      </Reveal>

      <div className="mt-24 space-y-24 md:mt-32 md:space-y-32 lg:space-y-40">
        {blocks.map((b, i) => {
          const flipped = i % 2 === 1;
          return (
            <article
              id={b.id}
              key={b.id}
              className="grid scroll-mt-32 grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-20"
            >
              <Reveal
                className={`lg:col-span-7 ${flipped ? "lg:order-2" : ""}`}
                y={36}
              >
                <div className="zoom-frame">
                  {b.video ? (
                    <LazyVideo
                      src={b.video}
                      poster={b.poster}
                      label={b.alt}
                    />
                  ) : (
                    <Img
                      src={b.image}
                      fallback={b.imageUrl}
                      meta={b.meta}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      alt={b.alt}
                      className="h-auto w-full"
                    />
                  )}
                </div>
              </Reveal>

              <Reveal
                className={`lg:col-span-5 ${flipped ? "lg:order-1" : ""}`}
                delay={0.12}
              >
                <span className="gold-text-sm font-serif text-sm tracking-[0.2em]">
                  {b.number}
                </span>
                <h3 className="mt-5 font-serif text-4xl font-light tracking-tight text-ivory lg:text-5xl">
                  {b.title}
                </h3>
                <p className="lede mt-6 max-w-md">{b.text}</p>
                <p className="mt-6 text-xs font-light uppercase tracking-[0.14em] text-gold/70">
                  {b.detail}
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line mt-10 font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
                >
                  {b.cta}
                  <Arrow />
                </a>
              </Reveal>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Products;
