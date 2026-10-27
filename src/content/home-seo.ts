import type { FaqItem } from "@/content/faq";
import { routes } from "@/lib/routes";

/** Meta description de la home (el title absoluto vive en siteConfig.homeSeoTitle). */
export const homeMetaDescription =
  "Insumos médicos en Hermosillo: material de curación, medias de compresión Jobst, apósitos Cutimed y ortopedia Daonsa. Visítanos o cotiza por WhatsApp.";

/** Una o dos líneas bajo el H1. El párrafo completo (homeIntro) sigue más abajo. */
export const homeLead =
  "Insumos médicos en Hermosillo para consultorio, hospital y casa: material de curación, medias Jobst, apósitos Cutimed y ortopedia Daonsa.";

/** Párrafo completo de la home. El número es el NAP canónico (WhatsApp de la tienda). */
export const homeIntro =
  "En Promacson Tienda encuentras insumos médicos en Hermosillo para consultorio, hospital y casa: material de curación, medias de compresión Jobst y antiembólicas Protec, apósitos Cutimed para cuidado avanzado de heridas, antisépticos Dermodine y ortopedia Daonsa. Te asesoramos para que te lleves la medida y la presentación correctas. Escríbenos al WhatsApp 662 450 1230 o visítanos en nuestra tienda, C. Benito Juárez 177, Col. Constitución.";

export const homeFaq: FaqItem[] = [
  {
    question: "¿Dónde comprar insumos médicos en Hermosillo?",
    answer: ["En C. Benito Juárez 177, Col. Constitución, o por WhatsApp 662 450 1230."],
  },
  {
    question: "¿Qué marcas manejan?",
    answer: ["Jobst, Cutimed, Protec, Dermodine y Daonsa, entre otras."],
  },
  {
    question: "¿Venden por pieza o por caja?",
    answer: ["Depende del producto; cada ficha lo indica."],
  },
  {
    question: "¿Tienen medias de compresión?",
    answer: [
      "Sí: Jobst Relief y Sport en 15-20 y 20-30 mmHg (caja con un par) y antiembólicas Protec (bolsa con un par).",
    ],
  },
  {
    question: "¿Cómo cotizo?",
    answer: ["Arma tu lista en el sitio y mándala por WhatsApp, o visítanos."],
  },
];

/** Anclas exactas hacia el H1 de cada categoría, Nosotros y la guía de medias. */
export const homeExactLinks: { label: string; href: string }[] = [
  {
    label: "Medias de compresión Jobst en Hermosillo",
    href: routes.category("medias-de-compresion"),
  },
  {
    label: "Medias antiembólicas en Hermosillo",
    href: routes.category("medias-antiembolicas"),
  },
  {
    label: "Cuidado avanzado de heridas en Hermosillo",
    href: routes.category("cuidado-avanzado-de-heridas"),
  },
  {
    label: "Tienda de ortopedia en Hermosillo",
    href: routes.category("ortopedia-y-soportes"),
  },
  {
    label: "Material de curación en Hermosillo",
    href: routes.category("material-de-curacion"),
  },
  {
    label: "Antisépticos y desinfectantes en Hermosillo",
    href: routes.category("antisepticos-y-desinfectantes"),
  },
  {
    label: "Equipo médico en Hermosillo",
    href: routes.category("equipo-medico"),
  },
  { label: "Nosotros", href: routes.about },
  {
    label: "Cómo elegir medias de compresión",
    href: routes.guide("como-elegir-medias-de-compresion"),
  },
];
