import { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Reveal from "@/components/Reveal";
import Img from "@/components/Img";
import LazyVideo from "@/components/LazyVideo";
import SplitReveal from "@/components/SplitReveal";
import CTA from "@/components/CTA";
import { useLenis, getLenis, scrollToAnchor } from "@/hooks/useLenis";
import { gallery, CATEGORIES } from "@/data/gallery";

/**
 * The full gallery, split into one section per collection so a "Conhecer
 * coleção" button on the home page can land straight on its own group.
 * Each section carries the same id as its block in Products.tsx.
 *
 * The home page shows a short selection and sends people here, so this page
 * carries the long tail of photos without adding weight to the first load.
 * Every photo is lazy by default (Img), and the grid lets each one keep its
 * own proportions rather than cropping to a fixed ratio.
 */
const Projetos = () => {
  useLenis();
  const { hash, state } = useLocation();

  // Two ways in: a #hash in the URL, or router state from a Link that did
  // not want to put the anchor in the address bar. Either lands on a
  // section; with neither, the page opens at the top.
  //
  // Lenis owns scrolling here, so it is told directly — a bare
  // window.scrollTo would be undone on its next frame.
  const target = hash || (state as { anchor?: string } | null)?.anchor;

  useEffect(() => {
    if (!target) {
      getLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      return;
    }
    // A frame of delay: the sections have to be laid out before their
    // offset means anything, and Lenis has to have taken over the scroll.
    const id = requestAnimationFrame(() => scrollToAnchor(target));
    return () => cancelAnimationFrame(id);
  }, [target]);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        {/* No hero photo: the page's own grid is the imagery. A tall header
            block gives the fixed bar something to sit over on arrival. */}
        <section className="section-glow relative pb-14 pt-40 md:pb-16 md:pt-48">
          <div className="shell">
            <Reveal>
              <Link to="/" className="link-line text-gold hover:text-gold-light">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  className="h-3.5 w-3.5 rotate-180"
                >
                  <path
                    d="M4 12h15M13 6l6 6-6 6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Voltar ao início
              </Link>
            </Reveal>

            <p className="eyebrow mt-10">Galeria</p>
            <SplitReveal
              as="h1"
              immediate
              className="display mt-7 max-w-4xl font-light text-ivory"
            >
              Projetos{" "}
              <span className="gold-text gold-text-sheen italic">
                entregues.
              </span>
            </SplitReveal>

            <Reveal delay={0.1}>
              <p className="lede mt-8 max-w-2xl">
                Residências, salões e espaços comerciais em Teresópolis e
                região. Cada ambiente com o tecido, o mecanismo e o acabamento
                escolhidos para a luz e a arquitetura do lugar.
              </p>
            </Reveal>

            {/* Jump links between the collections — the page is long and
                arriving at one section should not hide the others. Only
                collections that actually have photos are offered. */}
            <Reveal delay={0.15}>
              <nav className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-gold/15 pt-8">
                {CATEGORIES.filter((c) =>
                  gallery.some((g) => g.category === c.id),
                ).map((c, i) => (
                  <Fragment key={c.id}>
                    {/* A gold dot between the links. aria-hidden so it is
                        decoration, not a word, to a screen reader. On a
                        narrow screen the row wraps and a dot can end up
                        leading a line — acceptable next to losing the
                        separation entirely. */}
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 shrink-0 rounded-full bg-gold/45"
                      />
                    )}
                    <a
                      href={`#${c.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToAnchor(`#${c.id}`);
                      }}
                      className="link-line text-sm font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
                    >
                      {c.label}
                    </a>
                  </Fragment>
                ))}
              </nav>
            </Reveal>
          </div>
        </section>

        {CATEGORIES.map((cat) => {
          const items = gallery.filter((g) => g.category === cat.id);
          // A collection with no photos yet is skipped rather than shown
          // as an empty heading.
          if (!items.length) return null;

          return (
            <section
              key={cat.id}
              id={cat.id}
              className="scroll-mt-28 pb-24 pt-10 md:pb-32"
            >
              <div className="shell">
                <Reveal>
                  <div className="max-w-2xl border-t border-gold/15 pt-10">
                    <h2 className="font-serif text-4xl font-light text-ivory lg:text-5xl">
                      {cat.label}
                    </h2>
                    <p className="lede mt-5">{cat.blurb}</p>
                  </div>
                </Reveal>

                {/* Photos keep their own proportions, so they are paired by
                    caption rather than forced to a shared height. */}
                <div className="mt-14 grid grid-cols-1 items-end gap-x-8 gap-y-16 lg:grid-cols-12 lg:gap-y-24">
                  {items.map((p, i) => (
                    <Reveal
                      key={`${p.room}-${p.solution}`}
                      className={
                        p.width === "wide" ? "lg:col-span-12" : "lg:col-span-6"
                      }
                      delay={p.width === "wide" ? 0 : (i % 2) * 0.1}
                      y={32}
                    >
                      <figure className="group">
                        <div className="zoom-frame">
                          {p.video ? (
                            <LazyVideo
                              src={p.video}
                              label={`${p.room} — ${p.solution}`}
                              width={p.meta.width}
                              height={p.meta.height}
                            />
                          ) : (
                            <Img
                              src={p.image!}
                              fallback={p.imageUrl!}
                              meta={p.meta}
                              sizes={
                                p.width === "wide"
                                  ? "(min-width: 1024px) 1200px, 100vw"
                                  : "(min-width: 1024px) 48vw, 100vw"
                              }
                              alt={`${p.room} — ${p.solution}`}
                              className="h-auto w-full"
                            />
                          )}
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
              </div>
            </section>
          );
        })}

        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <div className="grain" aria-hidden="true" />
    </div>
  );
};

export default Projetos;
