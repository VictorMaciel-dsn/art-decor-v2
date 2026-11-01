import { Link, useLocation } from "react-router-dom";
import Reveal from "./Reveal";
// The seal's small lettering only stays sharp if the browser never resamples
// it: these are lossless renditions at exactly 1x–4x of the 208/240 CSS px
// slots, downscaled with Lanczos and lightly unsharp-masked from
// art-decor-seal.png. Regenerate them if the source changes.
import seal208 from "@/assets/logos/seal/seal-208.webp";
import seal240 from "@/assets/logos/seal/seal-240.webp";
import seal416 from "@/assets/logos/seal/seal-416.webp";
import seal480 from "@/assets/logos/seal/seal-480.webp";
import seal624 from "@/assets/logos/seal/seal-624.webp";
import seal720 from "@/assets/logos/seal/seal-720.webp";
import seal832 from "@/assets/logos/seal/seal-832.webp";
import seal960 from "@/assets/logos/seal/seal-960.webp";
import sealUrl from "@/assets/logos/seal/seal-480.png";

const sealSet = [
  [seal208, 208],
  [seal240, 240],
  [seal416, 416],
  [seal480, 480],
  [seal624, 624],
  [seal720, 720],
  [seal832, 832],
  [seal960, 960],
]
  .map(([src, w]) => `${src} ${w}w`)
  .join(", ");

const WHATSAPP = "https://wa.me/5521983216443";
const INSTAGRAM = "https://instagram.com/artdecorteresopolis";
const MAPS = "https://maps.google.com/?q=Av.+Lúcio+Meira,+551+-+Várzea,+Teresópolis+-+RJ";

const nav = [
  { label: "Cortinas", href: "#cortinas" },
  { label: "Persianas", href: "#persianas" },
  { label: "Automação", href: "#automacao" },
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Footer = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  return (
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
              sizes="(min-width: 768px) 240px, 208px"
              alt="Art Decor de Teresópolis — cortinas e persianas"
              width={240}
              height={240}
              loading="lazy"
              decoding="async"
              className="h-52 w-52 object-contain md:h-60 md:w-60"
            />
            <p className="mt-7 max-w-xs text-sm font-light leading-relaxed text-ivory/60">
              Cortinas, persianas e automação sob medida. 45 anos vestindo
              ambientes em Teresópolis e região.
            </p>
          </div>

          <nav className="md:col-span-3">
            <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-gold/70">
              Navegação
            </p>
            <ul className="mt-6 space-y-3">
              {/* Off the home page these sections are not mounted, so the
                  bare hash would do nothing — route home carrying the
                  anchor instead and let Index make the jump. */}
              {nav.map((n) => (
                <li key={n.href}>
                  {onHome ? (
                    <a
                      href={n.href}
                      className="text-sm font-light text-ivory/75 transition-colors duration-300 hover:text-gold"
                    >
                      {n.label}
                    </a>
                  ) : (
                    <Link
                      to="/"
                      state={{ anchor: n.href }}
                      className="text-sm font-light text-ivory/75 transition-colors duration-300 hover:text-gold"
                    >
                      {n.label}
                    </Link>
                  )}
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
                  href="tel:+552126421389"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Telefone · (21) 2642-1389
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-gold"
                >
                  Instagram · @artdecorteresopolis
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
};

export default Footer;
