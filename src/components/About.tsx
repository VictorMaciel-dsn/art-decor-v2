import Reveal from "./Reveal";
import Img from "./Img";
import primary from "@/assets/img/cortina.jpg?hq";
import primaryUrl from "@/assets/img/cortina.jpg?hq&as=url";
import primaryMeta from "@/assets/img/cortina.jpg?meta";
import secondary from "@/assets/img/capa_telaInicial2.png?hq";
import secondaryUrl from "@/assets/img/capa_telaInicial2.png?hq&as=url";
import secondaryMeta from "@/assets/img/capa_telaInicial2.png?meta";

const About = () => (
  <section id="sobre" className="section-y scroll-mt-28 bg-ink">
    <div className="shell">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Nossa história</p>
            <h2 className="headline mt-7 font-light text-foreground">
              40 anos criando ambientes que{" "}
              <span className="gold-text">permanecem.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 space-y-5 lede max-w-md">
              <p>
                Desde 1986, a Art Decor veste ambientes em Teresópolis e região.
                Quatro décadas de ofício nos ensinaram que o essencial não está
                no que se vê de imediato, mas na precisão de cada medida e no
                caimento de cada tecido.
              </p>
              <p>
                Trabalhamos com atendimento próximo, do primeiro desenho à
                instalação. Cada projeto recebe curadoria de materiais, ajuste
                sob medida e o cuidado artesanal de quem acompanha o resultado
                até o último detalhe.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 flex items-center gap-5">
              <span className="gold-text font-serif text-2xl font-light tracking-wide">
                1986 — 2026
              </span>
              <span className="gold-rule flex-1 opacity-50" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          {/* Both photos are landscape, so they stack: the main one full width,
              the smaller one inset below it. */}
          <div className="grid grid-cols-12 gap-y-8">
            <Reveal className="col-span-12" y={32}>
              <div className="zoom-frame">
                <Img
                  src={primary}
                  fallback={primaryUrl}
                  meta={primaryMeta}
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  alt="Persianas painel sob medida em sala de estar"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>

            <Reveal className="col-span-9 sm:col-span-7" delay={0.15} y={32}>
              <div className="zoom-frame">
                <Img
                  src={secondary}
                  fallback={secondaryUrl}
                  meta={secondaryMeta}
                  sizes="(min-width: 1024px) 33vw, 58vw"
                  alt="Sala de estar com cortinas sob medida em janela panorâmica"
                  className="h-auto w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default About;
