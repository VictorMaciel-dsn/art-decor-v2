import { useRef } from "react";
import { gsap, useGSAP, reduceMotion, MOBILE_BREAKPOINT } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";

const steps = [
  { n: "01", title: "Visita técnica", text: "Vamos até você medir, entender a arquitetura e observar a luz do ambiente." },
  { n: "02", title: "Curadoria", text: "Selecionamos tecidos, mecanismos e acabamentos que conversam com o seu espaço." },
  { n: "03", title: "Projeto", text: "Cada peça é produzida sob medida, com ajuste fino de caimento e proporção." },
  { n: "04", title: "Instalação", text: "Nossa equipe instala e revisa cada detalhe até o resultado ficar impecável." },
];

/** Dim state every step starts in, and the lit state it scrubs to. */
const DIM = 0.25;

/** --gold is 37 48% 57%. Written out because GSAP tweens computed colour. */
const GOLD = "hsl(37, 48%, 57%)";
const GOLD_GLOW = "hsla(37, 48%, 57%, 0.16)";
const GOLD_CLEAR = "hsla(37, 48%, 57%, 0)";

const Process = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Reduced motion gets everything lit, no pin, no scrub. The dim start is
      // in the pre-rendered markup, so it is undone here rather than skipped.
      if (reduceMotion) {
        gsap.set("[data-head], [data-body]", { opacity: 1 });
        gsap.set("[data-thread]", { scale: 1 });
        gsap.set("[data-dot]", {
          backgroundColor: GOLD,
          boxShadow: `0 0 0 4px ${GOLD_GLOW}`,
        });
        return;
      }

      const mm = gsap.matchMedia();

      /**
       * Builds the shared timeline. The thread runs the whole length on its
       * own tween; each step's light-up is positioned at the fraction of the
       * timeline matching its position along the thread, so a step fires
       * exactly when the line reaches its dot. Everything is driven by
       * scrub, so scrolling back up puts it all out again.
       */
      const build = (tl: gsap.core.Timeline, axis: "x" | "y") => {
        const total = steps.length;
        const prop = axis === "x" ? "scaleX" : "scaleY";

        // The markup collapses the thread on both axes so it is invisible
        // before JS runs. This breakpoint only drives one of them, so the
        // other is opened back up here.
        gsap.set("[data-thread]", { [axis === "x" ? "scaleY" : "scaleX"]: 1 });

        // One unit of timeline time per step, so a step's label falls at
        // exactly the fraction of the thread its dot sits at. A trailing
        // unit gives the last step room to finish lighting before the end.
        tl.fromTo(
          "[data-thread]",
          { [prop]: 0 },
          { [prop]: 1, ease: "none", duration: total },
          0,
        );

        steps.forEach((s, i) => {
          // Dot i sits at i/total along the thread, so it lights at time i.
          const at = i;
          tl.addLabel(`step-${s.n}`, at);
          const dot = `[data-dot="${s.n}"]`;
          const head = `[data-head="${s.n}"]`;
          const body = `[data-body="${s.n}"]`;

          tl.to(
            dot,
            {
              // Literal colours, not hsl(var(--gold) / a): GSAP parses the
              // computed value and cannot resolve a custom property inside
              // the slash-alpha form.
              backgroundColor: GOLD,
              boxShadow: `0 0 0 4px ${GOLD_GLOW}`,
              scale: 1,
              duration: 0.45,
              ease: "power2.out",
            },
            at,
          )
            // A single soft pulse as it fills, folded into the scrub so it
            // runs backwards cleanly too.
            .to(dot, { scale: 1.35, duration: 0.18, ease: "power2.out" }, at + 0.12)
            .to(dot, { scale: 1, duration: 0.25, ease: "power2.inOut" }, at + 0.3)
            .to(head, { opacity: 1, duration: 0.45, ease: "power2.out" }, at + 0.05)
            .fromTo(
              body,
              { opacity: DIM, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              at + 0.12,
            );
        });
      };

      // Desktop: the section pins and the scroll drives the whole timeline.
      mm.add(`(min-width: ${MOBILE_BREAKPOINT}px)`, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: `+=${steps.length * 60}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        build(tl, "x");
      });

      // Mobile: no pin. The vertical thread fills as the list passes, and
      // each step lights when the line reaches it.
      mm.add(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 80%",
            end: "bottom 65%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        build(tl, "y");
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  /** Pre-scrub appearance. */
  const dim = { opacity: DIM };

  return (
    <section
      ref={root}
      className="flex min-h-[70vh] items-center bg-ink py-24 md:py-28 lg:min-h-screen lg:py-0"
    >
      <div className="shell w-full">
        <p className="eyebrow">Processo</p>
        <SplitReveal
          as="h2"
          className="headline mt-7 max-w-2xl font-light text-foreground"
        >
          Do primeiro contato ao{" "}
          <span className="gold-text whitespace-nowrap italic">
            último detalhe.
          </span>
        </SplitReveal>

        {/* Horizontal on desktop: the thread runs along the top of the row
            and each step hangs beneath its own marker. On mobile it turns
            vertical, with the thread down the left edge. */}
        <ol
          data-timeline
          className="relative mt-16 grid grid-cols-1 gap-y-11 pl-8 lg:mt-20 lg:grid-cols-4 lg:gap-x-12 lg:pl-0 lg:pt-10"
        >
          {/* The bed the thread is drawn into. */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-px bg-gold/12 lg:bottom-auto lg:right-0 lg:h-px lg:w-auto"
          />
          <span
            data-thread
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gradient-to-b from-gold-deep via-gold to-gold-light lg:bottom-auto lg:right-0 lg:h-px lg:w-auto lg:origin-left lg:bg-gradient-to-r"
            style={{
              // Collapsed on both axes up front; the timeline's fromTo takes
              // over whichever axis this breakpoint actually uses.
              transform: "scaleX(0) scaleY(0)",
            }}
          />

          {steps.map((s) => (
            <li key={s.n} className="relative lg:pt-0">
              <span
                data-dot={s.n}
                aria-hidden="true"
                // Centred ON the hairline it marks, by offset alone.
                //
                // The dot is 11px across (incl. its 1px border) and the
                // thread is 1px, so the offset is pulled back 5px to put
                // the dot's centre on the line.
                //
                // This cannot be done with a transform or the `translate`
                // property: GSAP scrubs `scale` here, and CSSPlugin folds
                // any independent translate into `transform` and then sets
                // `translate: none`, so the centring would be wiped on the
                // first tween.
                //
                // Mobile: thread at the list's left padding edge (pl-8),
                // i.e. -left-8 from this <li>, so the dot goes to -37px.
                // Desktop: thread along the top padding edge (lg:pt-10),
                // which is 40px above this <li>'s content, so -45px.
                className="absolute -left-[37px] top-[7px] h-[11px] w-[11px] rounded-full border border-gold/60 lg:-top-[45px] lg:left-0"
                // Both properties are declared at rest, transparent, so the
                // scrub has a parseable colour to interpolate from. GSAP
                // cannot tween out of `box-shadow: none`.
                style={{
                  backgroundColor: GOLD_CLEAR,
                  boxShadow: `0 0 0 4px ${GOLD_CLEAR}`,
                }}
              />
              <div data-head={s.n} style={dim}>
                <span className="gold-text-sm font-serif text-3xl tracking-[0.18em] md:text-4xl lg:mt-8 lg:inline-block">
                  {s.n}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-light text-ivory">
                  {s.title}
                </h3>
              </div>
              <p
                data-body={s.n}
                className="mt-3 text-sm font-light leading-relaxed text-ivory/50"
                style={dim}
              >
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
