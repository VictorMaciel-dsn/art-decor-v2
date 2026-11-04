/**
 * Everything search engines and link previews read about the site, in one
 * place. The same module feeds two consumers:
 *
 *  - useSeo(), which keeps <head> in step as the visitor moves between
 *    routes in the browser;
 *  - scripts/prerender.mjs, which writes each route's tags straight into its
 *    static HTML at build time, so crawlers that never run JavaScript (and
 *    link previews in WhatsApp, Instagram, Facebook…) still get them.
 *
 * Contact details here must match the footer and the Google Business
 * Profile exactly — consistent name/address/phone is a local-ranking signal.
 */

export const SITE_URL = "https://artdecordeteresopolis.com";

export const BUSINESS = {
  name: "Art Decor de Teresópolis",
  shortName: "Art Decor",
  slogan: "O toque final da sua casa.",
  foundingYear: "1981",
  phone: "+55 21 2642-1389",
  phoneHref: "tel:+552126421389",
  whatsapp: "+55 21 98321-6443",
  whatsappUrl: "https://wa.me/5521983216443",
  instagramHandle: "@artdecorteresopolis",
  instagramUrl: "https://www.instagram.com/artdecorteresopolis/",
  street: "Av. Lúcio Meira, 551",
  district: "Várzea",
  city: "Teresópolis",
  region: "RJ",
  country: "BR",
  mapsUrl:
    "https://maps.google.com/?q=Av.+Lúcio+Meira,+551+-+Várzea,+Teresópolis+-+RJ",
} as const;

export const OG_IMAGE = {
  url: `${SITE_URL}/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: "Art Decor de Teresópolis — cortinas e persianas sob medida",
};

export type RouteSeo = {
  path: string;
  title: string;
  description: string;
  /** Kept out of the index (and the sitemap) — the 404 page. */
  noindex?: boolean;
  /** Breadcrumb label; the home page has none. */
  crumb?: string;
  /** schema.org type of the page itself. */
  pageType?: "WebPage" | "CollectionPage";
  /** The service a landing page sells, as a schema.org Service. */
  service?: string;
};

export const ROUTES: Record<"home" | "cortinas" | "persianas" | "projetos" | "notFound", RouteSeo> = {
  home: {
    path: "/",
    title: "Cortinas e Persianas em Teresópolis sob Medida | Art Decor",
    description:
      "Cortinas, persianas e automação sob medida em Teresópolis e região há 45 anos. Visita técnica, curadoria de tecidos e instalação profissional. Peça seu orçamento.",
    pageType: "WebPage",
  },
  cortinas: {
    path: "/cortinas-em-teresopolis",
    title: "Cortinas em Teresópolis sob Medida | Art Decor",
    description:
      "Cortinas sob medida em Teresópolis há 45 anos: prega macho, wave, blackout, voil e linho. Visita técnica, confecção e instalação pela nossa equipe. Peça seu orçamento.",
    crumb: "Cortinas em Teresópolis",
    service: "Cortinas sob medida",
  },
  persianas: {
    path: "/persianas-em-teresopolis",
    title: "Persianas em Teresópolis sob Medida | Art Decor",
    description:
      "Persianas sob medida em Teresópolis há 45 anos: rolô, double vision, romana, vertical e painel. Visita técnica, produção e instalação pela nossa equipe. Peça seu orçamento.",
    crumb: "Persianas em Teresópolis",
    service: "Persianas sob medida",
  },
  projetos: {
    path: "/projetos",
    title: "Projetos de Cortinas e Persianas em Teresópolis | Art Decor",
    description:
      "Galeria de projetos da Art Decor em Teresópolis e região: cortinas de voil e linho, persianas rolô, double vision, verticais e automação para casas e empresas.",
    crumb: "Projetos",
    pageType: "CollectionPage",
  },
  notFound: {
    path: "/404",
    title: "Página não encontrada | Art Decor de Teresópolis",
    description:
      "A página que você procurou não existe. Conheça as cortinas e persianas sob medida da Art Decor de Teresópolis.",
    noindex: true,
  },
};

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** The business itself. Present on every page so each one ties back to it. */
const businessNode = {
  "@type": "HomeGoodsStore",
  "@id": BUSINESS_ID,
  name: BUSINESS.name,
  alternateName: ["Art Decor", "Art Decor Teresópolis", "Art Decor por Luiz"],
  slogan: BUSINESS.slogan,
  description:
    "Loja de cortinas, persianas e automação sob medida em Teresópolis (RJ), desde 1981. Visita técnica, curadoria de tecidos e mecanismos, confecção sob medida e instalação.",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: [OG_IMAGE.url, `${SITE_URL}/icon-512.png`],
  telephone: BUSINESS.phone,
  foundingDate: BUSINESS.foundingYear,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${BUSINESS.street} - ${BUSINESS.district}`,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  hasMap: BUSINESS.mapsUrl,
  areaServed: [
    { "@type": "City", name: "Teresópolis" },
    { "@type": "City", name: "Rio de Janeiro" },
    { "@type": "AdministrativeArea", name: "Região Serrana do Rio de Janeiro" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: BUSINESS.whatsapp,
      url: BUSINESS.whatsappUrl,
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: BUSINESS.phone,
      availableLanguage: "Portuguese",
      areaServed: "BR",
    },
  ],
  sameAs: [BUSINESS.instagramUrl],
  knowsAbout: [
    "Cortinas sob medida",
    "Persianas sob medida",
    "Cortina de voil",
    "Cortina de linho",
    "Cortina blackout",
    "Cortina prega macho",
    "Cortina wave",
    "Persiana rolô",
    "Persiana double vision",
    "Persiana romana",
    "Persiana vertical",
    "Persiana painel",
    "Bandô",
    "Cortinas motorizadas",
    "Automação de cortinas e persianas",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Cortinas, persianas e automação sob medida",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Cortinas sob medida",
        itemListElement: [
          "Cortina prega macho",
          "Cortina wave",
          "Cortina com ilhós",
          "Cortina blackout",
          "Cortina de voil",
          "Cortina com bandô",
        ].map(service),
      },
      {
        "@type": "OfferCatalog",
        name: "Persianas sob medida",
        itemListElement: [
          "Persiana romana",
          "Persiana rolô",
          "Persiana double vision",
          "Persiana vertical",
          "Persiana painel",
        ].map(service),
      },
      {
        "@type": "OfferCatalog",
        name: "Automação",
        itemListElement: [
          "Cortinas e persianas motorizadas",
          "Controle remoto e integração smart home",
        ].map(service),
      },
    ],
  },
};

// Provider and area are the business's own, inherited from the catalog.
function service(name: string) {
  return { "@type": "Offer", itemOffered: { "@type": "Service", name } };
}

const websiteNode = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: BUSINESS.name,
  alternateName: "Art Decor",
  inLanguage: "pt-BR",
  publisher: { "@id": BUSINESS_ID },
};

/** The full JSON-LD graph for one route. */
export const structuredData = (route: RouteSeo) => {
  const url = absoluteUrl(route.path);
  const graph: object[] = [businessNode, websiteNode];

  if (!route.noindex) {
    const page: Record<string, unknown> = {
      "@type": route.pageType ?? "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      inLanguage: "pt-BR",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID },
      primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE.url },
    };

    if (route.crumb) {
      const crumbs = {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: route.crumb, item: url },
        ],
      };
      page.breadcrumb = { "@id": crumbs["@id"] };
      graph.push(crumbs);
    }

    if (route.service) {
      graph.push({
        "@type": "Service",
        "@id": `${url}#service`,
        name: route.service,
        serviceType: route.service,
        url,
        description: route.description,
        provider: { "@id": BUSINESS_ID },
        areaServed: businessNode.areaServed,
      });
    }
    graph.push(page);
  }

  return { "@context": "https://schema.org", "@graph": graph };
};

const escapeAttr = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/**
 * The per-route block of <head>, as HTML. Written into the static page by
 * the prerender step, between the `seo:start` / `seo:end` markers in
 * index.html. Everything shared by all routes lives in index.html itself.
 */
export const headTags = (route: RouteSeo) => {
  const url = absoluteUrl(route.path);
  const t = escapeAttr(route.title);
  const d = escapeAttr(route.description);
  // `<` is escaped so a string in the graph can never close the script tag.
  const json = JSON.stringify(structuredData(route)).replace(/</g, "\\u003c");

  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    route.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    route.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<script type="application/ld+json">${json}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
};
