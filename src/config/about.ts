/** Contenido estático de /nosotros (mapa, ubicación). */
export const aboutConfig = {
  locationLabel: "Promacson Tienda",
  address: {
    street: "C. Benito Juárez 177",
    neighborhood: "Constitución",
    postalCode: "83150",
    city: "Hermosillo",
    state: "Son.",
    /** Una línea para mapas y SEO. */
    full: "C. Benito Juárez 177, Constitución, 83150 Hermosillo, Son.",
  },
  /** Enlace al lugar en Google Maps. */
  googleMapsUrl:
    "https://www.google.com/maps/place/Promacson+Tienda/data=!4m2!3m1!1s0x0:0x4e69af9c013e8113",
  /** Embed apuntando a la dirección (visible en /nosotros). */
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=C.+Benito+Ju%C3%A1rez+177,+Constituci%C3%B3n,+83150+Hermosillo,+Son.&hl=es&z=16&output=embed",
} as const;

export const aboutHighlights = [
  {
    title: "Distribución especializada",
    description:
      "Insumos médicos, material de curación y soluciones para hospitales, clínicas y consultorios.",
  },
  {
    title: "Cotización a tu medida",
    description:
      "Sin precios en línea: revisamos tu lista, volumen y modalidad de entrega antes de proponerte.",
  },
  {
    title: "Presencia en Sonora",
    description:
      "Atención comercial y entregas en Hermosillo y principalmente en el estado de Sonora.",
  },
  {
    title: "Marcas del sector salud",
    description: "Portafolio de fabricantes reconocidos con respaldo comercial y de abastecimiento.",
  },
] as const;
