/**
 * Configuración estática de marca y contenido editorial.
 * Teléfono, email y WhatsApp se consumen vía getSiteContact() (API).
 */
export const siteConfig = {
  name: "Promacson",
  brandLine: "Tienda",
  /** Título del sitio (pestaña del navegador, SEO) */
  siteTitle: "Promacson Tienda",
  tagline: "Insumos médicos y material de curación para instituciones de salud",
  description:
    "Distribución de insumos médicos, material de curación y soluciones para hospitales, clínicas y consultorios en México.",
  quoteCount: 2,
  brand: {
    primary: "#005F71",
    white: "#FFFFFF",
    logo: "/brand/logo.png",
  },
  stats: [
    { label: "Años en el mercado", value: "30+" },
    { label: "Cobertura", value: "Nacional" },
    { label: "Soluciones", value: "5,000+" },
  ],
  heroSlides: [
    {
      id: "principal",
      eyebrow: "Distribución médica en México",
      title: "Insumos médicos para hospitales, clínicas y consultorios",
      description:
        "Catálogo especializado, cotización personalizada y entrega a nivel nacional.",
      cta: { label: "Explorar catálogo", href: "/catalogo" },
      secondaryCta: { label: "Solicitar cotización", href: "/cotizacion" },
    },
    {
      id: "cotizacion",
      eyebrow: "Sin compra en línea",
      title: "Arma tu cotización en minutos",
      description: "Agrega productos, envía tu solicitud y un ejecutivo te contacta con propuesta.",
      cta: { label: "Ir a cotización", href: "/cotizacion" },
      secondaryCta: { label: "Ver catálogo", href: "/catalogo" },
    },
    {
      id: "mayoreo",
      eyebrow: "Compra por volumen",
      title: "Clínicas, hospitales y distribuidores",
      description:
        "Condiciones mayoreo, contratos y entregas programadas. Solicita atención comercial dedicada.",
      cta: { label: "Compra mayoreo", href: "/mayoreo" },
      secondaryCta: { label: "Cotización menor volumen", href: "/cotizacion" },
    },
  ],
  promotions: [
    {
      id: "curacion",
      tag: "Destacado",
      title: "Material de curación",
      subtitle: "Cotiza por volumen y recibe propuesta en 24 h",
      validUntil: "30 de junio de 2026",
      daysLeft: 32,
      href: "/catalogo/curacion",
    },
    {
      id: "guantes",
      tag: "Alta demanda",
      title: "Línea de guantes y protección",
      subtitle: "Presentaciones por caja o pieza según producto",
      validUntil: "31 de diciembre de 2026",
      href: "/catalogo/guantes",
    },
    {
      id: "mayoreo-promo",
      tag: "Mayoreo",
      title: "Abastecimiento institucional",
      subtitle: "Clínicas, hospitales y distribuidores",
      validUntil: "Vigente",
      href: "/mayoreo",
    },
    {
      id: "marcas",
      tag: "Nuevo",
      title: "Nuevas marcas en catálogo",
      subtitle: "Conoce el portafolio actualizado de fabricantes",
      validUntil: "15 de julio de 2026",
      daysLeft: 47,
      href: "/catalogo",
    },
  ],
} as const;
