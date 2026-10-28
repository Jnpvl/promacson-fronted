import type { FaqItem } from "@/content/faq";
import { routes } from "@/lib/routes";

export type CategorySeoFallback = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** H1 visible que reemplaza al nombre de la categoría (el nombre sigue en migas y tarjetas). */
  h1Override?: string;
  h2: string[];
  introHtml: string;
  /** FAQ visible. El title y la meta siguen saliendo del admin (Parte A). */
  faq?: FaqItem[];
};

function a(href: string, label: string): string {
  return `<a href="${href}">${label}</a>`;
}

const guideMedias = routes.guide("como-elegir-medias-de-compresion");
const cat = routes.category;
const product = routes.product;

const vendas = [
  ["venda-elastica-protec-5-cm-5-m", "venda elástica Protec 5 cm × 5 m"],
  ["venda-elastica-protec-7-cm-5-m", "venda elástica Protec 7 cm × 5 m"],
  ["venda-elastica-protec-10-cm-5-m", "venda elástica Protec 10 cm × 5 m"],
  ["venda-elastica-protec-15-cm-5-m", "venda elástica Protec 15 cm × 5 m"],
] as const;

const telas = [
  ["tela-adhesiva-de-seda-protec-1-25-cm-x-5-m", "tela de seda Protec 1.25 cm × 5 m"],
  ["tela-adhesiva-de-seda-protec-2-5-cm-x-5-m", "tela de seda Protec 2.5 cm × 5 m"],
  ["protec-tela-adhesiva-seda-5cm-10m", "tela de seda Protec 5 cm × 10 m"],
] as const;

const cutimed = [
  ["cutimed-alginate-10x10-cm", "Cutimed Alginate 10 × 10 cm"],
  ["cutimed-alginate-10x20", "Cutimed Alginate 10 × 20 cm"],
  ["cutimed-siltec-10x10", "Cutimed Siltec 10 × 10 cm"],
  ["cutimed-sorbact-10x10", "Cutimed Sorbact 10 × 10 cm"],
  ["cutimed-sorbact", "Cutimed Sorbact 7 × 9 cm"],
] as const;

const dermodine = [
  ["dermodine-solucion-yodopovidona-120ml", "Dermodine solución antiséptica 120 ml"],
  ["dermodine-espuma-yodopovidona-8-120-ml", "Dermodine Espuma yodopovidona 8%, 120 ml"],
] as const;

const chg = [
  ["aposito-transparente-chg-2-protec-8-5-11-5-cm", "apósito transparente CHG 2% 8.5 × 11.5 cm"],
  ["aposito-transparente-chg-2-protec-10-12-cm", "apósito transparente CHG 2% 10 × 12 cm"],
] as const;

function linkedList(items: readonly (readonly [string, string])[]): string {
  return `<ul>${items.map(([slug, label]) => `<li>${a(product(slug), label)}</li>`).join("")}</ul>`;
}

function faqLinks(items: readonly (readonly [string, string])[], prefix: string, suffix = "."): FaqItem["answer"] {
  const answer: FaqItem["answer"] = [prefix];
  items.forEach(([slug, label], index) => {
    if (index > 0) answer.push(index === items.length - 1 ? " y " : ", ");
    answer.push({ href: product(slug), label });
  });
  answer.push(suffix);
  return answer;
}

export const categorySeoFallbacks: Record<string, CategorySeoFallback> = {
  "material-de-curacion": {
    metaTitle: "Material de curación y gasas estériles Hermosillo",
    metaDescription:
      "Gasas estériles, vendas elásticas y enyesadas, algodón, cintas adhesivas y apósitos para consultorio y botiquín. Material de curación en Hermosillo.",
    h1: "Material de curación",
    h1Override: "Material de curación",
    h2: ["Gasas estériles, vendas y material de curación"],
    introHtml: `<p>Tenemos gasas, rollos de gasa, vendas elásticas Protec, compresas y tela adhesiva de seda, por pieza o por caja. Cotiza por WhatsApp 662 450 1230 o visítanos en C. Benito Juárez 179, Col. Constitución.</p><p>Estas fichas detallan medida y presentación:</p>${linkedList([
      ...vendas,
      ...telas,
      ["compresa-no-esteril-protec-45-45-cm", "compresa de vientre Protec 45 × 45 cm"],
      ["rollo-de-gasa-absorbente-protec-91-cm-91-m", "rollo de gasa Protec 91 cm × 91 m"],
    ])}`,
    faq: [
      {
        question: "¿Qué medidas de venda manejan?",
        answer: faqLinks(vendas, "Estas vendas elásticas Protec miden 5 m de largo: "),
      },
      {
        question: "¿La gasa es estéril?",
        answer: [
          "Hay gasa estéril y no estéril; cada ficha lo indica. El ",
          {
            href: product("rollo-de-gasa-absorbente-protec-91-cm-91-m"),
            label: "rollo de gasa absorbente de 91 cm × 91 m",
          },
          " es no estéril. También está la ",
          {
            href: product("gasa-seca-cortada-esteril-protec-10-10-cm"),
            label: "gasa seca cortada estéril 10 × 10 cm",
          },
          " y la ",
          {
            href: product("gasa-seca-cortada-no-esteril-protec-10-10-cm"),
            label: "gasa seca cortada no estéril 10 × 10 cm",
          },
          ".",
        ],
      },
      {
        question: "¿Venden por caja?",
        answer: ["Por pieza o por caja, según el producto. Cada ficha indica la presentación."],
      },
      {
        question: "¿Dónde están?",
        answer: [
          "C. Benito Juárez 179, Col. Constitución, Hermosillo. También por WhatsApp 662 450 1230.",
        ],
      },
    ],
  },
  "ortopedia-y-soportes": {
    metaTitle: "Tienda de ortopedia en Hermosillo: soportes Daonsa | Promacson",
    metaDescription:
      "Tienda de ortopedia en Hermosillo: cabestrillo, collar cervical, férula de muñeca, inmovilizador de hombro y más soportes Daonsa. C. Benito Juárez 179, Col. Constitución.",
    h1: "Ortopedia y soportes",
    h1Override: "Tienda de ortopedia",
    h2: ["Soportes ortopédicos Daonsa"],
    introHtml: `<p>Tenemos soportes ortopédicos Daonsa en varias tallas: férula de muñeca cock-up, collar cervical, cabestrillo y más. Ven a la tienda para revisar la talla, o escríbenos al WhatsApp 662 450 1230.</p>${linkedList([
      ["ferula-para-muneca-cock-up-daonsa", "férula para muñeca cock-up Daonsa"],
      ["collar-cervical-blanco-daonsa", "collar cervical Daonsa"],
      ["cabestrillo-daonsa", "cabestrillo Daonsa"],
      ["inmovilizador-de-hombro-daonsa", "inmovilizador de hombro Daonsa"],
      ["correa-para-clavicula-daonsa", "correa para clavícula Daonsa"],
    ])}`,
    faq: [
      {
        question: "¿Qué marca manejan?",
        answer: ["Soportes ortopédicos Daonsa."],
      },
      {
        question: "¿Cómo elijo la talla?",
        answer: [
          "Hay varias tallas. Ven a la tienda para revisarla, o escríbenos al WhatsApp 662 450 1230.",
        ],
      },
      {
        question: "¿Puedo probármelo en tienda?",
        answer: ["Sí. Visítanos en C. Benito Juárez 179, Col. Constitución, Hermosillo."],
      },
      {
        question: "¿Dónde están?",
        answer: ["C. Benito Juárez 179, Col. Constitución, Hermosillo."],
      },
    ],
  },
  "antisepticos-y-desinfectantes": {
    metaTitle: "Antisépticos y desinfectantes en Hermosillo",
    metaDescription:
      "Alcohol desnaturalizado y etílico, agua oxigenada, yodopovidona y gel antiséptico en varias presentaciones para botiquín y consultorio en Hermosillo.",
    h1: "Antisépticos y desinfectantes",
    h1Override: "Antisépticos y desinfectantes",
    h2: ["Antisépticos y desinfectantes disponibles"],
    introHtml: `<p>Yodopovidona Dermodine en solución y espuma, alcohol etílico, agua oxigenada y gel antiséptico, de 60 ml a 1 litro. Cotiza por WhatsApp 662 450 1230 o visítanos en la tienda.</p>`,
    faq: [
      {
        question: "¿Qué presentaciones de Dermodine hay?",
        answer: faqLinks(dermodine, "Dermodine está en solución y en espuma: "),
      },
      {
        question: "¿Venden alcohol etílico?",
        answer: [
          "Sí. Está el ",
          { href: product("alcohol-etilico-protec-1000-ml"), label: "alcohol etílico Protec 1000 ml" },
          ".",
        ],
      },
      {
        question: "¿En qué tamaños?",
        answer: ["De 60 ml a 1 litro, según el producto. Cada ficha indica la presentación."],
      },
      {
        question: "¿Dónde están?",
        answer: [
          "C. Benito Juárez 179, Col. Constitución, Hermosillo. También por WhatsApp 662 450 1230.",
        ],
      },
    ],
  },
  "medias-de-compresion": {
    metaTitle: "Medias de compresión Jobst en Hermosillo",
    metaDescription:
      "Medias de compresión Jobst de 15-20 y 20-30 mmHg: línea Relief a la rodilla o al muslo, con o sin punta, y línea Sport. Tallas S a XL. Hermosillo.",
    h1: "Medias de compresión",
    h1Override: "Medias de compresión Jobst",
    h2: ["Medias de compresión Jobst"],
    introHtml: `<p>Las medias de compresión Jobst tienen compresión graduada, más firme en el tobillo y menor hacia arriba. Tenemos la línea Relief para el uso diario y la línea Sport, con un tejido pensado para la actividad física, en 15-20 y 20-30 mmHg, a la rodilla o al muslo, con punta abierta o cerrada y en tallas S a XL. Cada caja trae un par. Te ayudamos a elegir tu talla y compresión: escríbenos al WhatsApp 662 450 1230 o ven a la tienda.</p><ul><li>${a(cat("medias-antiembolicas"), "Medias antiembólicas")}</li><li>${a(guideMedias, "Cómo elegir medias de compresión")}</li><li>${a(product("media-jobst-relief-rodilla-con-punta-15-20"), "Media Jobst Relief rodilla con punta 15-20 mmHg")}</li><li>${a(product("media-jobst-relief-muslo-con-punta-15-20"), "Media Jobst Relief muslo con punta 15-20 mmHg")}</li><li>${a(product("media-jobst-sport-15-20"), "Media Jobst Sport 15-20 mmHg")}</li></ul>`,
    faq: [
      {
        question: "¿Qué compresión elijo, 15-20 o 20-30 mmHg?",
        answer: ["15-20 es compresión ligera y 20-30 es moderada."],
      },
      {
        question: "¿Cómo sé mi talla?",
        answer: [
          "Con la medida del tobillo y la pantorrilla (y del muslo, en las largas), comparada con la tabla de Jobst. Te ayudamos a medir en tienda.",
        ],
      },
      {
        question: "¿Se venden por par?",
        answer: ["Sí, cada caja trae un par."],
      },
      {
        question: "¿Qué diferencia hay entre Relief y Sport?",
        answer: [
          "Las dos tienen la misma compresión graduada; Sport tiene tejido y diseño deportivo.",
        ],
      },
      {
        question: "¿Son lo mismo que las antiembólicas?",
        answer: [
          "No. Las antiembólicas son para pacientes en reposo; mira ",
          { href: cat("medias-antiembolicas"), label: "medias antiembólicas" },
          ".",
        ],
      },
    ],
  },
  "medias-antiembolicas": {
    metaTitle: "Medias antiembólicas Protec en Hermosillo",
    metaDescription:
      "Medias antiembólicas Protec con compresión graduada y libres de látex, a la rodilla o al muslo, para uso hospitalario y postquirúrgico. Hermosillo.",
    h1: "Medias antiembólicas",
    h1Override: "Medias antiembólicas",
    h2: ["Medias antiembólicas Protec"],
    introHtml: `<p>Las medias antiembólicas Protec tienen compresión graduada y son libres de látex. Las hay a la rodilla o al muslo, en tallas CH, M y G, y cada bolsa trae un par. Son las que más se piden para el posquirúrgico y la estancia hospitalaria. Te ayudamos con la talla por WhatsApp (662 450 1230) o en la tienda.</p><ul><li>${a(cat("medias-de-compresion"), "Medias de compresión Jobst")}</li><li>${a(guideMedias, "Cómo elegir medias de compresión")}</li></ul>`,
    faq: [
      {
        question: "¿Cuál es la diferencia con las medias de compresión?",
        answer: [
          "Las antiembólicas son para pacientes en reposo, sobre todo en el posquirúrgico y la estancia hospitalaria. Las ",
          { href: cat("medias-de-compresion"), label: "medias de compresión" },
          " Jobst Relief y Sport son para el uso diario, en 15-20 y 20-30 mmHg.",
        ],
      },
      {
        question: "¿Cómo elijo la talla?",
        answer: [
          "Están en tallas CH, M y G. Te ayudamos a elegirla por WhatsApp (662 450 1230) o en la tienda.",
        ],
      },
      {
        question: "¿A la rodilla o al muslo?",
        answer: ["Las hay a la rodilla o al muslo."],
      },
      {
        question: "¿Vienen por par?",
        answer: ["Sí, cada bolsa trae un par."],
      },
    ],
  },
  "equipo-medico": {
    metaTitle: "Guantes, jeringas y cubrebocas en Hermosillo",
    metaDescription:
      "Guantes de nitrilo y de látex para exploración, cubrebocas KN95 y de 3 capas, jeringas con aguja de 1 a 10 ml y termómetro digital. Hermosillo.",
    h1: "Equipo médico: guantes, jeringas y cubrebocas",
    h1Override: "Equipo médico",
    h2: ["Guantes de nitrilo y de látex para exploración", "Jeringas con aguja y cubrebocas"],
    introHtml: `<p>Equipo médico para consultorio y casa con marcas reconocidas: guantes de exploración de nitrilo y de látex, cubrebocas, jeringas con aguja y termómetro digital. Cotiza por WhatsApp 662 450 1230 o visítanos en C. Benito Juárez 179.</p><p>Si además necesitas curación, revisa ${a(cat("material-de-curacion"), "material de curación")} y ${a(cat("antisepticos-y-desinfectantes"), "antisépticos y desinfectantes")}.</p>`,
    faq: [
      {
        question: "¿Qué equipo médico tienen?",
        answer: [
          "Guantes de nitrilo y de látex, cubrebocas, jeringas con aguja y termómetro digital, entre otros artículos para consultorio y casa.",
        ],
      },
      {
        question: "¿Venden por caja?",
        answer: ["Varios productos se venden por caja; cada ficha indica la presentación."],
      },
      {
        question: "¿Dónde están?",
        answer: [
          "C. Benito Juárez 179, Col. Constitución, Hermosillo. Escríbenos al WhatsApp 662 450 1230 o visítanos.",
        ],
      },
    ],
  },
  "cuidado-avanzado-de-heridas": {
    metaTitle: "Cuidado avanzado de heridas en Hermosillo",
    metaDescription:
      "Apósitos Cutimed Alginate, Siltec y Sorbact, apósitos transparentes con CHG y cinta Hypafix para el cuidado de heridas. Hermosillo, Sonora.",
    h1: "Cuidado avanzado de heridas",
    h1Override: "Cuidado avanzado de heridas",
    h2: ["Apósitos y fijación para heridas"],
    introHtml: `<p>Tenemos apósitos de alginato de calcio Cutimed Alginate, espuma con silicona Cutimed Siltec, apósitos Cutimed Sorbact, apósitos transparentes Protec con clorhexidina (CHG) al 2%, fijación Hypafix y antisépticos Dermodine. Hay varias medidas y se venden por pieza o por caja. Cotiza por WhatsApp 662 450 1230 o visítanos en la tienda.</p><p>También puedes ver ${a(cat("antisepticos-y-desinfectantes"), "antisépticos y desinfectantes")}.</p><p>Apósitos transparentes CHG:</p>${linkedList(chg)}`,
    faq: [
      {
        question: "¿Qué es un apósito de alginato?",
        answer: [
          "Un apósito de fibras de alginato de calcio que forma un gel al entrar en contacto con el exudado (dato del fabricante).",
        ],
      },
      {
        question: "¿Qué medidas de Cutimed manejan?",
        answer: faqLinks(cutimed, "Estas son las fichas Cutimed: "),
      },
      {
        question: "¿Venden por pieza o por caja?",
        answer: ["Los dos, según el producto."],
      },
      {
        question: "¿Tienen Dermodine?",
        answer: faqLinks(dermodine, "Sí, en solución y en espuma: "),
      },
      {
        question: "¿Dónde están?",
        answer: ["C. Benito Juárez 179, Col. Constitución, Hermosillo."],
      },
    ],
  },
};
