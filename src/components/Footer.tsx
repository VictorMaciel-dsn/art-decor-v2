import Reveal from "./Reveal";
// art-decor-seal.png is the original JPEG cropped to its own gold circle with
// a transparent outside, so the seal sits straight on the footer's ink rather
// than on a black square that never quite matched it. Resized at build time to
// the 1x/2x/3x renditions it is actually displayed at.
import sealSet from "@/assets/logos/art-decor-seal.png?w=192;384;576&format=webp&quality=95&as=srcset";
import sealUrl from "@/assets/logos/art-decor-seal.png?w=384&format=png&as=url";

const WHATSAPP = "https://wa.me/5521983216443";
const MAPS = "https://maps.google.com/?q=Av.+Lúcio+Meira,+551+-+Várzea,+Teresópolis+-+RJ";

const nav = [
  { label: "Cortinas", href: "#cortinas" },
  { label: "Persianas", href: "#persianas" },
  { label: "Automação", href: "#automacao" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Footer = () => (
  <footer id="contato" className="relative scroll-mt-28 bg-ink text-ivory">
    <div className="gold-rule" />
    <div className="shell py-20 md:py-28">
      <Reveal>
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            {/* The source is already cropped to the circle with a transparent
                outside, so no rounded-full / object-cover is needed — those
                were shaving the gold stroke off its own artwork. */}
            <img
              src={sealUrl}
              srcSet={sealSet}
              sizes="(min-width: 768px) 192px, 160px"
              alt="Art Decor de Teresópolis — cortinas e persianas"
              width={192}
              height={192}
              loading="lazy"
              decoding="async"
              className="h-40 w-40 object-contain md:h-48 md:w-48"
            />
            <p className="mt-7 max-w-xs text-sm font-light leading-relaxed text-ivory/60">
              Cortinas, persianas e automação sob medida. 40 anos vestindo
              ambientes em Teresópolis e região.
            </p>
          </div>

          <nav className="md:col-span-3">
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-gold/70">
              Navegação
            </p>
            <ul className="mt-6 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm font-light text-ivory/75 transition-colors duration-300 hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-gold/70">
              Contato
            </p>
            <ul className="mt-6 space-y-3 text-sm font-light text-ivory/75">
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  WhatsApp · (21) 98321-6443
                </a>
              </li>
              <li>
                <a
                  href="mailto:cortinas@gmail.com.br"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  cortinas@gmail.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Instagram
                </a>
              </li>
              <li className="pt-3">
                <a
                  href={MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-relaxed transition-colors duration-300 hover:text-gold"
                >
                  Av. Lúcio Meira, 551 — Várzea
                  <br />
                  Teresópolis — RJ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>

      <div className="mt-20 flex flex-col justify-between gap-3 border-t border-gold/15 pt-8 text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/40 sm:flex-row">
        <p>© {new Date().getFullYear()} Art Decor</p>
        <p>Teresópolis — RJ, Brasil</p>
      </div>
    </div>
  </footer>
);

export default Footer;
