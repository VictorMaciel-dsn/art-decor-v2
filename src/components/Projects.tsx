import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import Img from "./Img";
import p1 from "@/assets/img/cortina_gesso.jpg?hq";
import p1Url from "@/assets/img/cortina_gesso.jpg?hq&as=url";
import p1Meta from "@/assets/img/cortina_gesso.jpg?meta";
import p2 from "@/assets/img/persiana_rolo.jpg?hq";
import p2Url from "@/assets/img/persiana_rolo.jpg?hq&as=url";
import p2Meta from "@/assets/img/persiana_rolo.jpg?meta";
import p3 from "@/assets/img/cortina_bandoReto.jpg?hq";
import p3Url from "@/assets/img/cortina_bandoReto.jpg?hq&as=url";
import p3Meta from "@/assets/img/cortina_bandoReto.jpg?meta";
import p4 from "@/assets/img/persiana_painel.jpg?hq";
import p4Url from "@/assets/img/persiana_painel.jpg?hq&as=url";
import p4Meta from "@/assets/img/persiana_painel.jpg?meta";
import p5 from "@/assets/img/capa_telaInicial3.png?hq";
import p5Url from "@/assets/img/capa_telaInicial3.png?hq&as=url";
import p5Meta from "@/assets/img/capa_telaInicial3.png?meta";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className="h-3.5 w-3.5">
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const projects = [
  { image: p1, imageUrl: p1Url, meta: p1Meta, room: "Sala de estar", solution: "Cortina com trilho embutido em gesso", span: "lg:col-span-7", sizes: "(min-width: 1024px) 52vw, (min-width: 640px) calc(50vw - 56px), calc(100vw - 48px)" },
  { image: p2, imageUrl: p2Url, meta: p2Meta, room: "Home office", solution: "Persiana rolô com tela solar", span: "lg:col-span-5", sizes: "(min-width: 1024px) 37vw, (min-width: 640px) calc(50vw - 56px), calc(100vw - 48px)" },
  { image: p3, imageUrl: p3Url, meta: p3Meta, room: "Quarto de casal", solution: "Cortina com bandô reto e blackout", span: "lg:col-span-5", sizes: "(min-width: 1024px) 37vw, (min-width: 640px) calc(50vw - 56px), calc(100vw - 48px)" },
  { image: p4, imageUrl: p4Url, meta: p4Meta, room: "Sala de jantar", solution: "Persiana painel em tecido translúcido", span: "lg:col-span-7", sizes: "(min-width: 1024px) 52vw, (min-width: 640px) calc(50vw - 56px), calc(100vw - 48px)" },
  { image: p5, imageUrl: p5Url, meta: p5Meta, room: "Living integrado", solution: "Cortina wave em linho natural", span: "lg:col-span-12", sizes: "(min-width: 1024px) 90vw, (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)" },
];

const Projects = () => (
  <section id="projetos" className="section-y scroll-mt-28 bg-ink">
    <div className="shell">
      <Reveal>
        <div className="max-w-2xl">
          <p className="eyebrow">Projetos</p>
          <h2 className="headline mt-7 font-light text-foreground">
            Projetos que <span className="gold-text">falam por si.</span>
          </h2>
          <p className="lede mt-6">
            Cada ambiente é pensado para valorizar a arquitetura, a luz e a
            personalidade de quem vive nele.
          </p>
        </div>
      </Reveal>

      {/* Photos keep their own proportions, so pair them up by their captions
          rather than by a shared height. */}
      <div className="mt-20 grid grid-cols-1 items-end gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-24">
        {projects.map((p, i) => (
          <Reveal
            key={p.solution}
            className={`${p.span} ${i === 4 ? "sm:col-span-2" : ""}`}
            delay={(i % 2) * 0.1}
            y={32}
          >
            <figure className="group">
              <div className="zoom-frame">
                <Img
                  src={p.image}
                  fallback={p.imageUrl}
                  meta={p.meta}
                  sizes={p.sizes}
                  alt={`${p.room} — ${p.solution}`}
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-serif text-xl font-light text-ivory">
                  {p.room}
                </span>
                <span className="text-sm font-light text-muted-foreground">
                  {p.solution}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Goes to the full gallery, not to WhatsApp: the long tail of photos
          lives on its own page so the home page stays light. */}
      <Reveal delay={0.1}>
        <Link
          to="/projetos"
          className="link-line mt-20 font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
        >
          Ver todos os projetos
          <Arrow />
        </Link>
      </Reveal>
    </div>
  </section>
);

export default Projects;
