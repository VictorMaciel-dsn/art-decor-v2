import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import LazyVideo from "./LazyVideo";
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
                      width={1280}
                      height={720}
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
                {/* Straight to this collection's own section of the
                    gallery. The block id doubles as the anchor there, so
                    the two stay in step by construction. */}
                <Link
                  to={`/projetos#${b.id}`}
                  className="link-line mt-10 font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
                >
                  {b.cta}
                  <Arrow />
                </Link>
              </Reveal>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default Products;
