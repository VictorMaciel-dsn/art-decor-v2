import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Instagram } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/gsap";
import Logo from "./Logo";
import Button from "./Button";
import { getLenis, scrollToAnchor } from "@/hooks/useLenis";

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
  const menu = useRef<HTMLElement>(null);

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

  // The overlay owns the scroll lock, and it takes three layers: Lenis scrolls
  // programmatically, so overflow:hidden does not stop it; iOS Safari can still
  // pan the page through overflow:hidden, so touch has to be cancelled as well.
  // position:fixed on the body is avoided because it zeroes window.scrollY,
  // which would rewind every ScrollTrigger under the overlay.
  useEffect(() => {
    if (!open) return;

    const { documentElement: html, body } = document;
    const lenis = getLenis();
    lenis?.stop();
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) return; // leave pinch-zoom alone
      const y = e.touches[0].clientY;
      const delta = lastY - y;
      lastY = y;

      // Only a menu too tall for the screen may pan, and only while it has
      // room left in that direction, or the gesture chains to the page.
      const nav = menu.current;
      const pansMenu =
        nav?.contains(e.target as Node) &&
        (delta > 0 ? nav.scrollTop + nav.clientHeight < nav.scrollHeight - 1 : nav.scrollTop > 0);
      if (!pansMenu && e.cancelable) e.preventDefault();
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    // The toggle is hidden from lg up, so a menu left open across that
    // breakpoint would hold the lock with no way to release it.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      desktop.removeEventListener("change", onBreakpoint);
      html.style.overflow = "";
      body.style.overflow = "";
      lenis?.start();
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
    // A stopped Lenis ignores scrollTo, and the lock only lifts after this
    // render commits, so it has to be released here first.
    getLenis()?.start();
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
            scrolled && !open ? "opacity-100" : "opacity-0"
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
              scrolled || open ? "h-14 md:h-16" : "h-20 md:h-24"
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
                  scrolled || open ? "text-xl" : "text-2xl md:text-[1.75rem]"
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
        {/* data-lenis-prevent: a stopped Lenis cancels every wheel event it
            sees, which would also block the menu's own scrolling fallback. */}
        <nav ref={menu} data-lenis-prevent className="menu-scroll shell">
          <div className="menu-body">
            <div className="menu-links">
              {links.map((l) => (
                <a
                  key={l.href}
                  data-mobile-item
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="menu-link"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <div className="menu-actions">
              <div data-mobile-item>
                <Button href={WHATSAPP} spark external magnetic={false}>
                  Solicitar orçamento
                </Button>
              </div>
              <a
                data-mobile-item
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-gold transition-colors duration-300 hover:text-gold-light"
              >
                <Instagram strokeWidth={1.25} className="h-5 w-5 shrink-0" />
                @artdecorteresopolis
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
