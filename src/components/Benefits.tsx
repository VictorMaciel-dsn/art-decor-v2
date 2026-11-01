import { useRef, type MouseEvent } from "react";
import { gsap, useGSAP, EASE, reduceMotion } from "@/lib/gsap";
import { Gem, Ruler, Sparkles, Cpu } from "lucide-react";
import SplitReveal from "./SplitReveal";

const items = [
  {
    n: "01",
    title: "Curadoria",
    text: "Tecidos e mecanismos selecionados entre os melhores fornecedores do país, testados antes de entrarem em qualquer projeto.",
    Icon: Gem,
  },
  {
    n: "02",
    title: "Sob medida",
    text: "Nada sai de catálogo. Cada peça é desenhada para a janela, o pé-direito e a luz do ambiente em que vai viver.",
    Icon: Ruler,
  },
  {
    n: "03",
    title: "Acabamento",
    text: "Barra, caimento e trilho revisados peça por peça. O detalhe que ninguém nota é exatamente o que faz a diferença.",
    Icon: Sparkles,
  },
  {
    n: "04",
    title: "Tecnologia",
    text: "Automação integrada à rotina da casa — cenários, horários e controle por aplicativo ou voz, instalados e configurados.",
    Icon: Cpu,
  },
];

const Benefits = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduceMotion) return;

      gsap.from("[data-benefit]", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: EASE,
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      // The dividers draw downwards as the columns arrive, so the grid reads
      // as being ruled rather than as having always been there.
      gsap.from("[data-benefit-rule]", {
        scaleY: 0,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.1,
        delay: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });

      gsap.from("[data-benefit-rule-h]", {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  /** Feeds the cursor position to the column's radial highlight. */
  const track = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-ink py-24 md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_30%_40%,hsl(var(--gold)/0.06),transparent_65%)]" />

      <div className="shell">
        <p className="eyebrow">Diferenciais</p>
        <SplitReveal
          as="h2"
          className="headline mt-7 max-w-2xl font-light text-foreground"
        >
          O que nos torna
          <br />
          <span className="gold-text italic">únicos.</span>
        </SplitReveal>

        {/* Four editorial columns separated by hairlines — no cards, no
            boxes. On mobile the same hairline runs horizontally between
            stacked rows. */}
        <div className="mt-16 grid grid-cols-1 lg:mt-20 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              data-benefit
              onMouseMove={track}
              className="benefit-col relative isolate py-9 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0"
            >
              {/* Vertical divider on every column but the first (desktop). */}
              {i > 0 && (
                <span
                  data-benefit-rule
                  aria-hidden="true"
                  className="edge-rule hidden lg:block"
                />
              )}
              {/* Horizontal divider on every row but the first (mobile). */}
              {i > 0 && (
                <span
                  data-benefit-rule-h
                  aria-hidden="true"
                  className="edge-rule-h lg:hidden"
                />
              )}
              <span
                aria-hidden="true"
                className="col-topline hidden lg:block"
              />

              <span className="numeral" aria-hidden="true">
                {item.n}
              </span>

              <span
                aria-hidden="true"
                className="benefit-icon mt-7 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold"
              >
                <item.Icon strokeWidth={1.25} className="h-5 w-5" />
              </span>

              <h3 className="mt-6 font-serif text-[1.75rem] font-light leading-tight tracking-wide text-ivory">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-ivory/55">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
