import type { FaqAnswerPart, FaqItem } from "@/content/faq";
import { routes } from "@/lib/routes";

export type GuideSection = {
  heading?: string;
  paragraphs: FaqAnswerPart[][];
};

export type GuideEntry = {
  slug: string;
  /** Title sin el sufijo de la plantilla. */
  title: string;
  description: string;
  h1: string;
  /** Fecha de la última edición visible. El sitemap la usa como lastmod. */
  updatedAt: string;
  sections: GuideSection[];
  faq: FaqItem[];
};

const compressionCategory = routes.category("medias-de-compresion");
const antiembolicCategory = routes.category("medias-antiembolicas");

export const guides: GuideEntry[] = [
  {
    slug: "como-elegir-medias-de-compresion",
    title: "Cómo elegir medias de compresión",
    description:
      "Cómo elegir medias de compresión Jobst: talla S a XL, 15-20 o 20-30 mmHg, a la rodilla o al muslo. Cada caja trae un par. Te ayudamos en Hermosillo.",
    h1: "Cómo elegir medias de compresión: talla y mmHg",
    updatedAt: "2026-10-26",
    sections: [
      {
        paragraphs: [
          [
            "En Promacson Tienda, en Hermosillo, las medias de compresión Jobst se venden por par: cada caja trae un par. Esta guía resume cómo elegir la compresión (15-20 o 20-30 mmHg), la talla y la longitud. La línea Relief es para el uso diario y la línea Sport tiene un tejido pensado para la actividad física.",
          ],
        ],
      },
      {
        heading: "15-20 o 20-30 mmHg",
        paragraphs: [
          [
            "15-20 es compresión ligera y 20-30 es moderada. Relief y Sport están en esos dos niveles. La compresión es graduada: más firme en el tobillo y menor hacia arriba.",
          ],
        ],
      },
      {
        heading: "Cómo saber tu talla",
        paragraphs: [
          [
            "La talla (S a XL) sale de la medida del tobillo y la pantorrilla. En las medias al muslo también se mide el muslo, y se compara con la tabla de Jobst. Te ayudamos a medir en la tienda, en C. Benito Juárez 177, Col. Constitución, o por WhatsApp 662 450 1230.",
          ],
        ],
      },
      {
        heading: "Relief o Sport",
        paragraphs: [
          [
            "Las dos tienen la misma compresión graduada. Sport tiene tejido y diseño deportivo. Relief es la línea para el uso diario, a la rodilla o al muslo, con punta abierta o cerrada.",
          ],
        ],
      },
      {
        heading: "Se venden por par",
        paragraphs: [
          [
            "Sí. Cada caja de medias de compresión Jobst trae un par. Las antiembólicas Protec vienen en bolsa con un par y no son lo mismo: son para pacientes en reposo. Mira ",
            { href: compressionCategory, label: "medias de compresión Jobst en Hermosillo" },
            " y ",
            { href: antiembolicCategory, label: "medias antiembólicas en Hermosillo" },
            ".",
          ],
        ],
      },
    ],
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
        question: "¿Son lo mismo que las antiembólicas?",
        answer: [
          "No. Las antiembólicas son para pacientes en reposo; mira ",
          { href: antiembolicCategory, label: "medias antiembólicas" },
          ".",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): GuideEntry | undefined {
  return guides.find((guide) => guide.slug === slug);
}
