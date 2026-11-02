import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Instagram } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";
import Logo from "./Logo";
import Button from "./Button";
import { scrollToAnchor } from "@/hooks/useLenis";

const WHATSAPP = "https://wa.me/5521983216443";
const INSTAGRAM = "https://www.instagram.com/artdecorteresopolis/";

const links = [
  { label: "Projetos", href: "#projetos" },
  { label: "Cortinas", href: "#cortinas" },
  { label: "Persianas", href: "#persianas" },
  { label: "Automação", href: "#automacao" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.25} className={`h-3.5 w-3.5 ${className}`}>
    <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // The bar stays put at all times; the only thing scroll drives is whether
  // it is the transparent strip over the hero or the floating glass island.
  //
  // Read straight off the window rather than from a ScrollTrigger. A trigger
  // with end:"max" stops reporting once a pinned section further down the
  // page (Process) changes the document height between refreshes, which is
  // what used to drop the bar back to transparent at the bottom of the page
  // and let the CTA's gold button show through behind the logo.
  useEffect(() => {
    const read = () => setScrolled(window.scrollY > 40);
    read();
    window.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      window.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  // The overlay owns the scroll lock. Lenis keeps running underneath otherwise.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      el.dataset.open = String(open);

      if (reduceMotion) {
        gsap.set(el, { autoAlpha: open ? 1 : 0 });
        return;
      }

      if (open) {
        gsap.set(el, { autoAlpha: 1 });
        gsap.from(el, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
        gsap.from(el.querySelectorAll("[data-mobile-item]"), {
          opacity: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.05,
          delay: 0.08,
          ease: "power3.out",
        });
      } else {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      }
    },
    { dependencies: [open], scope: panel },
  );

  // Every nav target is a section of the home page. From another route
  // (the gallery) there is nothing to scroll to, so go home first and let
  // Index hand the anchor to Lenis once it has mounted.
  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    if (pathname !== "/") {
      navigate("/", { state: { anchor: href } });
      return;
    }
    scrollToAnchor(href);
  };

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-600 ease-lux ${
          scrolled || open ? "px-4 pt-3 sm:px-6 md:pt-4" : "px-0 pt-0"
        }`}
      >
        {/* The island is narrower than the bar, so the padding either side
            is a clear window onto whatever is scrolling past underneath —
            which is how the CTA's gold button used to appear beside the
            wordmark at the foot of the page. This scrim closes that gap
            while keeping the island reading as glass that floats. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+2.5rem)] bg-[linear-gradient(to_bottom,hsl(var(--ink))_0%,hsl(var(--ink))_62%,hsl(var(--ink)/0.75)_80%,transparent_100%)] transition-opacity duration-500 ${
            scrolled || open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Lifts off the top edge and contracts into a floating island.
            Depth comes from the shadow, never a border. */}
        <div
          className={`mx-auto transition-[max-width,background-color,border-radius,box-shadow,padding] duration-600 ease-lux ${
            scrolled || open
              ? "nav-float max-w-[1180px] px-5 sm:px-7"
              : "max-w-[1440px] bg-gradient-to-b from-ink/60 to-transparent px-6 sm:px-10 lg:px-16 xl:px-24"
          }`}
          style={{ borderRadius: scrolled || open ? "var(--radius-nav)" : "0px" }}
        >
          <div
            className={`flex items-center justify-between transition-[height] duration-600 ease-lux ${
              scrolled ? "h-14 md:h-16" : "h-20 md:h-24"
            }`}
          >
            <a
              href="#top"
              onClick={(e) => go(e, "#top")}
              aria-label="Art Decor — início"
              className="shrink-0"
            >
              <Logo
                sheen
                className={`transition-all duration-500 ${
                  scrolled ? "text-xl" : "text-2xl md:text-[1.75rem]"
                }`}
              />
            </a>

            {/* Tighter below xl: at 1024px the full gap-9 row does not fit
                beside the logo and the actions ("Sobre nós" used to wrap
                and the logo ran into the first link). */}
            <nav className="hidden items-center gap-4 lg:flex xl:gap-9">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="link-line whitespace-nowrap font-light text-ivory/70 hover:text-gold"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex xl:gap-4">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Art Decor (@artdecorteresopolis)"
                title="@artdecorteresopolis no Instagram"
                className="nav-icon"
              >
                <Instagram strokeWidth={1.25} className="h-[18px] w-[18px]" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                Solicitar orçamento
                {/* Dropped below xl for the same lack of room. */}
                <Arrow className="hidden xl:block" />
              </a>
            </div>

            {/* On phones the Instagram link sits beside the menu toggle, so
                it is one tap away without opening the overlay. */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Art Decor (@artdecorteresopolis)"
                className="flex h-10 w-10 items-center justify-center text-gold transition-colors duration-300 hover:text-gold-light"
              >
                <Instagram strokeWidth={1.25} className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-gold"
              >
                {/* Three bars that fold into an X: the outer two travel to
                    the middle and cross, while the middle one fades out
                    under them. The 6px offsets match the gap-[5px] plus the
                    1px rule, so the two arms meet exactly on centre. */}
                <span
                  className={`block h-px w-6 bg-current transition-transform duration-400 ${
                    open ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-6 bg-current transition-opacity duration-300 ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-px w-6 bg-current transition-transform duration-400 ${
                    open ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        ref={panel}
        // overflow-hidden: the sparked button's canvas is ~180px wider
        // than the button itself, and without a clip here it would add a
        // scrollbar inside the open menu.
        className="invisible fixed inset-0 z-40 overflow-hidden bg-ink opacity-0 lg:hidden"
      >
        {/* The bar floats over this panel, so the list reserves room for
            it at the top (pt-28).

            justify-start + an auto block margin on the list, rather than
            justify-center: a centred flex column whose content is taller
            than the box overflows BOTH ends, and the top overflow cannot
            be scrolled back to — which is what buried the first item
            under the logo. With auto margins the list is centred only
            while it fits, and otherwise sits against the top padding.

            overflow-x-hidden rides along with overflow-y-auto because a
            single `auto` axis makes the other compute to `auto` too, and
            the sparked button's oversized canvas would then add a
            sideways scrollbar. */}
        <nav className="shell flex h-full flex-col justify-start gap-1 overflow-y-auto overflow-x-hidden pb-16 pt-28">
          <div className="my-auto flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                data-mobile-item
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="border-b border-gold/20 py-4 font-serif text-[1.75rem] text-ivory transition-colors duration-300 hover:text-gold sm:py-5 sm:text-4xl"
              >
                {l.label}
              </a>
            ))}
            <div data-mobile-item className="mt-9 self-start">
              <Button href={WHATSAPP} spark external magnetic={false}>
                Solicitar orçamento
              </Button>
            </div>
            <a
              data-mobile-item
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 self-start text-sm font-medium uppercase tracking-[0.14em] text-gold transition-colors duration-300 hover:text-gold-light"
            >
              <Instagram strokeWidth={1.25} className="h-5 w-5" />
              @artdecorteresopolis
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
