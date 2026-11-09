import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Button from "@/components/Button";
import { useLenis } from "@/hooks/useLenis";
import { useSeo } from "@/hooks/useSeo";
import { track } from "@/lib/analytics";
import { BUSINESS, ROUTES } from "@/lib/seo";

const DESTINATIONS = [
  { label: "Início", to: ROUTES.home.path },
  { label: "Cortinas", to: ROUTES.cortinas.path },
  { label: "Persianas", to: ROUTES.persianas.path },
  { label: "Projetos", to: ROUTES.projetos.path },
];

const NotFound = () => {
  const { pathname } = useLocation();
  useLenis();
  // noindex: an unknown address must never compete with the real pages.
  useSeo(ROUTES.notFound);

  useEffect(() => {
    track("page_not_found", { missing_path: pathname });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <section className="shell flex min-h-screen flex-col justify-center pb-24 pt-40">
          <span style={{ width: "5rem" }} className="gold-rule block origin-left opacity-80" />
          <p className="mt-7 text-[0.6875rem] font-medium uppercase tracking-[0.3em] text-gold">
            Erro 404
          </p>
          <h1 className="display mt-6 font-light text-ivory">
            Página não <span className="gold-text italic">encontrada.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-ivory/70 sm:text-lg">
            O endereço que você abriu não existe ou mudou de lugar. Continue por uma das páginas
            abaixo ou fale com a gente pelo WhatsApp.
          </p>
          <nav aria-label="Páginas do site" className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className="link-line font-medium uppercase tracking-[0.14em] text-gold hover:text-gold-light"
              >
                {d.label}
              </Link>
            ))}
          </nav>
          <div className="mt-11">
            <Button href={BUSINESS.whatsappUrl} spark external arrow={false}>
              Falar no WhatsApp
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <div className="grain" aria-hidden="true" />
    </div>
  );
};

export default NotFound;
