import Reveal from "./Reveal";

const quotes = [
  {
    text: "O bandô e a cortina mudaram completamente o visual da minha sala. Ficou muito mais aconchegante e bonito do que eu esperava.",
    name: "Nicole Lima",
    project: "Cortina com bandô — Sala de estar",
  },
  {
    text: "Atendimento próximo do início ao fim. Mediram, sugeriram e instalaram com um cuidado raro.",
    name: "Roberto Nunes",
    project: "Persianas rolô — Escritório",
  },
  {
    text: "A automação mudou nossa rotina. Simples, silenciosa e perfeitamente integrada à casa.",
    name: "Cláudia Menezes",
    project: "Automação — Residência completa",
  },
];

const Testimonials = () => (
  <section className="section-y section-glow">
    <div className="shell">
      <Reveal>
        <p className="eyebrow">Depoimentos</p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-y-14 md:grid-cols-3 md:gap-x-12 lg:gap-x-20">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 0.1}>
            <figure className="relative pt-8">
              <span className="gold-rule absolute inset-x-0 top-0 opacity-60" />
              <blockquote className="font-serif text-2xl font-light italic leading-snug text-ivory lg:text-[1.75rem]">
                “{q.text}”
              </blockquote>
              <figcaption className="mt-8">
                <div className="text-sm font-medium text-gold">{q.name}</div>
                <div className="mt-1 text-xs font-light uppercase tracking-[0.14em] text-muted-foreground">
                  {q.project}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
