/**
 * The copy and photos of the landing pages for each service, one per search
 * people actually make ("cortinas em Teresópolis"). Rendered by
 * pages/Servico.tsx, the only importer, so none of this reaches the home page.
 *
 * Only what the business has confirmed goes here. No prices, deadlines or
 * neighbouring towns until they are known to be true: a page that promises
 * something the shop does not do costs more than a shorter page.
 */

import { BUSINESS, ROUTES, type RouteSeo } from "@/lib/seo";
import type { Category } from "@/data/gallery";

import corredor from "@/assets/img/galeria-corredor-voil-luz.png?hq";
import corredorUrl from "@/assets/img/galeria-corredor-voil-luz.png?hq&as=url";
import corredorMeta from "@/assets/img/galeria-corredor-voil-luz.png?meta";
import pregaMacho from "@/assets/img/cortina_pregaMacho.jpg?hq";
import pregaMachoUrl from "@/assets/img/cortina_pregaMacho.jpg?hq&as=url";
import pregaMachoMeta from "@/assets/img/cortina_pregaMacho.jpg?meta";
import voilCurvo from "@/assets/img/galeria-salao-voil-curvo.png?hq";
import voilCurvoUrl from "@/assets/img/galeria-salao-voil-curvo.png?hq&as=url";
import voilCurvoMeta from "@/assets/img/galeria-salao-voil-curvo.png?meta";
import bandoReto from "@/assets/img/cortina_bandoReto.jpg?hq";
import bandoRetoUrl from "@/assets/img/cortina_bandoReto.jpg?hq&as=url";
import bandoRetoMeta from "@/assets/img/cortina_bandoReto.jpg?meta";
import gesso from "@/assets/img/cortina_gesso.jpg?hq";
import gessoUrl from "@/assets/img/cortina_gesso.jpg?hq&as=url";
import gessoMeta from "@/assets/img/cortina_gesso.jpg?meta";

import cozinha from "@/assets/img/persiana_rolo2.png?hq";
import cozinhaUrl from "@/assets/img/persiana_rolo2.png?hq&as=url";
import cozinhaMeta from "@/assets/img/persiana_rolo2.png?meta";
import rolo from "@/assets/img/persiana_rolo.jpg?hq";
import roloUrl from "@/assets/img/persiana_rolo.jpg?hq&as=url";
import roloMeta from "@/assets/img/persiana_rolo.jpg?meta";
import doubleVision from "@/assets/img/galeria-rolo-double-vision-trio-crop.png?hq";
import doubleVisionUrl from "@/assets/img/galeria-rolo-double-vision-trio-crop.png?hq&as=url";
import doubleVisionMeta from "@/assets/img/galeria-rolo-double-vision-trio-crop.png?meta";
import romana from "@/assets/img/persiana_romana.png?hq";
import romanaUrl from "@/assets/img/persiana_romana.png?hq&as=url";
import romanaMeta from "@/assets/img/persiana_romana.png?meta";
import vertical from "@/assets/img/galeria-vertical-salao.png?hq";
import verticalUrl from "@/assets/img/galeria-vertical-salao.png?hq&as=url";
import verticalMeta from "@/assets/img/galeria-vertical-salao.png?meta";
import painel from "@/assets/img/persiana_painel.jpg?hq";
import painelUrl from "@/assets/img/persiana_painel.jpg?hq&as=url";
import painelMeta from "@/assets/img/persiana_painel.jpg?meta";

type Photo = {
  image: string;
  imageUrl: string;
  meta: { width: number; height: number };
  alt: string;
};

export type Service = {
  route: RouteSeo;
  /** Which part of the project gallery the page links on to. */
  category: Category;
  /** The H1's plain half; "Teresópolis." follows it in gold. */
  heading: string;
  lede: string;
  hero: Photo;
  /** The models heading's plain half; "sob medida." follows it in gold. */
  modelsTitle: string;
  intro: string;
  blocks: (Photo & { title: string; text: string; detail: string })[];
  faq: { q: string; a: string }[];
  /** The other service, linked at the foot of the page. */
  sibling: { label: string; to: string };
};

const local = (phone: string) => phone.replace("+55 21 ", "(21) ");

/** Answers that hold for every service. */
const sharedFaq = (noun: string) => [
  {
    q: `A Art Decor mede e instala ${noun}?`,
    a: "Sim. Fazemos a visita técnica para medir e observar a luz do ambiente, produzimos cada peça sob medida e nossa própria equipe faz a instalação e a revisão final.",
  },
  {
    q: "Quais regiões vocês atendem?",
    a: "Teresópolis, a Região Serrana e a cidade do Rio de Janeiro. Se o seu endereço fica em outra cidade, chame no WhatsApp para confirmarmos a visita.",
  },
  {
    q: "Como peço um orçamento?",
    a: `Pelo WhatsApp ${local(BUSINESS.whatsapp)} ou pelo telefone ${local(BUSINESS.phone)}. Nossa loja fica na ${BUSINESS.street}, ${BUSINESS.district}, em Teresópolis.`,
  },
];

export const SERVICES: Record<"cortinas" | "persianas", Service> = {
  cortinas: {
    route: ROUTES.cortinas,
    category: "cortinas",
    heading: "Cortinas em",
    lede: "Cortinas sob medida em Teresópolis, na Região Serrana e no Rio de Janeiro, com todo o serviço: visita técnica, escolha do tecido, confecção e instalação.",
    hero: {
      image: corredor,
      imageUrl: corredorUrl,
      meta: corredorMeta,
      alt: "Living panorâmico com cortina de voil e barra em linho em trilho contínuo",
    },
    modelsTitle: "Modelos de cortinas",
    intro: "Para residências, salões e espaços comerciais, cada peça é desenhada para a janela, o pé-direito e a luz do ambiente.",
    blocks: [
      {
        title: "Prega macho, wave e ilhós",
        text: "A prega macho tem pregas largas e caimento estruturado. A wave forma ondas contínuas, com visual leve e contemporâneo. O ilhós desliza pelo varão, com abertura simples.",
        detail: "Prega macho · Wave · Ilhós",
        image: pregaMacho,
        imageUrl: pregaMachoUrl,
        meta: pregaMachoMeta,
        alt: "Cortina de prega macho em sala de estar",
      },
      {
        title: "Voil e linho",
        text: "O voil é leve e translúcido, e suaviza a claridade do dia. O linho é uma fibra natural de textura marcante, que deixa o ambiente mais aconchegante.",
        detail: "Voil · Linho · Tecido forrado",
        image: voilCurvo,
        imageUrl: voilCurvoUrl,
        meta: voilCurvoMeta,
        alt: "Salão de eventos com cortina de voil e bandô em curva acompanhando a fachada",
      },
      {
        title: "Blackout e bandô",
        text: "O blackout barra a luz externa e é muito usado em quartos. O bandô, reto ou em curva, esconde o trilho e arremata o vão.",
        detail: "Blackout · Bandô reto · Bandô em curva",
        image: bandoReto,
        imageUrl: bandoRetoUrl,
        meta: bandoRetoMeta,
        alt: "Cortina com bandô reto e blackout",
      },
      {
        title: "Trilho embutido e trilho duplo",
        text: "O trilho embutido no gesso deixa o visual limpo, sem nada aparente no teto. O trilho duplo permite combinar voil e tecido forrado no mesmo vão.",
        detail: "Trilho embutido · Trilho duplo",
        image: gesso,
        imageUrl: gessoUrl,
        meta: gessoMeta,
        alt: "Sala de estar com cortina em trilho embutido no gesso",
      },
    ],
    faq: [
      ...sharedFaq("as cortinas"),
      {
        q: "Qual cortina escolher para o quarto?",
        a: "Quem quer escurecer o ambiente costuma preferir o blackout, que pode ser combinado com voil em trilho duplo para ter luz suave durante o dia. Na visita técnica ajudamos a definir o conjunto certo para o seu quarto.",
      },
      {
        q: "As cortinas podem ser motorizadas?",
        a: "Sim. Instalamos e configuramos a motorização, com controle remoto, cenários e horários, além de controle por aplicativo ou voz e integração com a casa inteligente.",
      },
    ],
    sibling: { label: "Persianas em Teresópolis", to: ROUTES.persianas.path },
  },
  persianas: {
    route: ROUTES.persianas,
    category: "persianas",
    heading: "Persianas em",
    lede: "Persianas sob medida em Teresópolis, na Região Serrana e no Rio de Janeiro, com todo o serviço: visita técnica, escolha do modelo, produção e instalação.",
    hero: {
      image: cozinha,
      imageUrl: cozinhaUrl,
      meta: cozinhaMeta,
      alt: "Cozinha com persiana rolô blackout e bandô em vãos de canto",
    },
    modelsTitle: "Modelos de persianas",
    intro: "Para residências, escritórios e espaços comerciais, com a persiana certa para o tamanho do vão e a luz que cada ambiente pede.",
    blocks: [
      {
        title: "Persiana rolô",
        text: "O tecido enrola em um tubo superior, em uma linha discreta quando recolhido. Vai bem de home offices a quartos, conforme o tecido escolhido.",
        detail: "Tela solar · Translúcida · Blackout",
        image: rolo,
        imageUrl: roloUrl,
        meta: roloMeta,
        alt: "Home office com persiana rolô com tela solar",
      },
      {
        title: "Persiana double vision",
        text: "Faixas alternadas de tecido e tela regulam a luz sem precisar recolher a persiana.",
        detail: "Faixas de tecido e tela · Com bandô",
        image: doubleVision,
        imageUrl: doubleVisionUrl,
        meta: doubleVisionMeta,
        alt: "Sala de jantar com persiana rolô double vision e bandô",
      },
      {
        title: "Persiana romana",
        text: "O tecido sobe em dobras horizontais, com aparência próxima à de uma cortina.",
        detail: "Dobras horizontais · Tecido",
        image: romana,
        imageUrl: romanaUrl,
        meta: romanaMeta,
        alt: "Persiana romana em ambiente iluminado",
      },
      {
        title: "Persiana vertical",
        text: "As lâminas giram e recolhem para a lateral, o que é prático em vãos largos e salas comerciais.",
        detail: "Lâminas · Vãos largos",
        image: vertical,
        imageUrl: verticalUrl,
        meta: verticalMeta,
        alt: "Salão comercial com persiana vertical em tecido blackout",
      },
      {
        title: "Persiana painel",
        text: "Painéis de tecido deslizam em trilho, indicados para vãos grandes e portas de correr.",
        detail: "Painéis de tecido · Trilho",
        image: painel,
        imageUrl: painelUrl,
        meta: painelMeta,
        alt: "Sala de jantar com persiana painel em tecido translúcido",
      },
    ],
    faq: [
      ...sharedFaq("as persianas"),
      {
        q: "Qual persiana escolher para o escritório?",
        a: "A persiana rolô com tela solar é uma boa opção para quem trabalha com tela, porque filtra a claridade sem fechar a vista. Na visita técnica avaliamos a luz do ambiente e indicamos o modelo mais adequado.",
      },
      {
        q: "As persianas podem ser motorizadas?",
        a: "Sim. Instalamos e configuramos a motorização, com controle remoto, cenários e horários, além de controle por aplicativo ou voz e integração com a casa inteligente.",
      },
    ],
    sibling: { label: "Cortinas em Teresópolis", to: ROUTES.cortinas.path },
  },
};
