/**
 * The full project gallery, shown on /projetos. The home page keeps its own
 * short selection (Projects.tsx) and links here — the point of this page is
 * to hold the long tail without weighing the home page down.
 *
 * Four of the photos arrived with the phone's own watermark burned into the
 * bottom strip; those import the `-crop` renditions, which are the same
 * frame with that band removed. The untouched originals are kept beside them.
 */

import g1 from "@/assets/img/galeria-corredor-voil-luz.png?hq";
import g1Url from "@/assets/img/galeria-corredor-voil-luz.png?hq&as=url";
import g1Meta from "@/assets/img/galeria-corredor-voil-luz.png?meta";

import g2 from "@/assets/img/galeria-salao-voil-curvo.png?hq";
import g2Url from "@/assets/img/galeria-salao-voil-curvo.png?hq&as=url";
import g2Meta from "@/assets/img/galeria-salao-voil-curvo.png?meta";


import g4 from "@/assets/img/galeria-fachada-noite.png?hq";
import g4Url from "@/assets/img/galeria-fachada-noite.png?hq&as=url";
import g4Meta from "@/assets/img/galeria-fachada-noite.png?meta";

import g5 from "@/assets/img/galeria-suite-voil-bando.png?hq";
import g5Url from "@/assets/img/galeria-suite-voil-bando.png?hq&as=url";
import g5Meta from "@/assets/img/galeria-suite-voil-bando.png?meta";

import g6 from "@/assets/img/galeria-sala-voil-duplo.png?hq";
import g6Url from "@/assets/img/galeria-sala-voil-duplo.png?hq&as=url";
import g6Meta from "@/assets/img/galeria-sala-voil-duplo.png?meta";

import g7 from "@/assets/img/galeria-rolo-double-vision-trio-crop.png?hq";
import g7Url from "@/assets/img/galeria-rolo-double-vision-trio-crop.png?hq&as=url";
import g7Meta from "@/assets/img/galeria-rolo-double-vision-trio-crop.png?meta";



import g10 from "@/assets/img/galeria-vertical-salao.png?hq";
import g10Url from "@/assets/img/galeria-vertical-salao.png?hq&as=url";
import g10Meta from "@/assets/img/galeria-vertical-salao.png?meta";

import g13 from "@/assets/img/persiana_rolo2.png?hq";
import g13Url from "@/assets/img/persiana_rolo2.png?hq&as=url";
import g13Meta from "@/assets/img/persiana_rolo2.png?meta";

import galleryVideo from "@/assets/img/galeria-video.mp4";

// Also used as the Automação block's still on the home page.
import g12 from "@/assets/img/persiana_teto.jpg?hq";
import g12Url from "@/assets/img/persiana_teto.jpg?hq&as=url";
import g12Meta from "@/assets/img/persiana_teto.jpg?meta";


/** Matches the three blocks in Products.tsx, so a collection's CTA can
    land on the matching group of the gallery. */
export type Category = "cortinas" | "persianas" | "automacao";

export type GalleryItem = {
  /** A still. Absent on a video entry. */
  image?: string;
  imageUrl?: string;
  meta: { width: number; height: number };
  /** An mp4 shown in place of the still. Lazy, muted and looping. */
  video?: string;
  room: string;
  solution: string;
  category: Category;
  /** "wide" takes the full row; the rest pair up two to a row on desktop. */
  width?: "wide";
};

/** Section headings and anchors for the gallery, in display order. */
export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  {
    id: "cortinas",
    label: "Cortinas",
    blurb:
      "Voil, linho e tecidos forrados em trilhos embutidos, bandôs e vãos do piso ao teto.",
  },
  {
    id: "persianas",
    label: "Persianas",
    blurb:
      "Rolô, double vision e vertical — controle preciso da luz em cada ambiente.",
  },
  {
    id: "automacao",
    label: "Automação",
    blurb:
      "Motorização e integração smart home, instaladas e configuradas pela nossa equipe.",
  },
];

/**
 * Ordered so the page opens on its strongest frames and the two commercial
 * halls do not land side by side.
 */
export const gallery: GalleryItem[] = [
  {
    image: g1,
    imageUrl: g1Url,
    meta: g1Meta,
    room: "Living panorâmico",
    solution: "Voil com barra em linho em trilho contínuo",
    category: "cortinas",
    width: "wide",
  },
  {
    image: g2,
    imageUrl: g2Url,
    meta: g2Meta,
    room: "Salão de eventos",
    solution: "Voil com bandô em curva acompanhando a fachada",
    category: "cortinas",
    width: "wide",
  },
  {
    image: g4,
    imageUrl: g4Url,
    meta: g4Meta,
    room: "Fachada residencial",
    solution: "Voil em dois pavimentos, vista noturna",
    category: "cortinas",
  },
  {
    image: g5,
    imageUrl: g5Url,
    meta: g5Meta,
    room: "Suíte",
    solution: "Voil com bandô reto e trilho embutido",
    category: "cortinas",
  },
  {
    image: g6,
    imageUrl: g6Url,
    meta: g6Meta,
    room: "Sala de estar",
    solution: "Trilho duplo com voil e tecido forrado",
    category: "cortinas",
  },
  {
    image: g7,
    imageUrl: g7Url,
    meta: g7Meta,
    room: "Sala de jantar",
    solution: "Persiana rolô double vision com bandô",
    category: "persianas",
  },
  {
    image: g10,
    imageUrl: g10Url,
    meta: g10Meta,
    room: "Salão comercial",
    solution: "Persiana vertical em tecido blackout",
    category: "persianas",
  },
  {
    image: g13,
    imageUrl: g13Url,
    meta: g13Meta,
    room: "Cozinha",
    solution: "Rolô blackout com bandô em vãos de canto",
    category: "persianas",
    width: "wide",
  },
  {
    image: g12,
    imageUrl: g12Url,
    meta: g12Meta,
    room: "Sala comercial",
    solution: "Cortina de teto sob estrutura de vidro",
    category: "automacao",
  },
  {
    // Automation is movement, so the other piece in this collection is a
    // clip rather than a still. Its size is the mp4's own 1024x576, which
    // reserves the right box before anything is downloaded.
    video: galleryVideo,
    meta: { width: 1024, height: 576 },
    room: "Cortina motorizada",
    solution: "Abertura e fechamento por controle, em funcionamento",
    category: "automacao",
    width: "wide",
  },
];
