import { storeNap } from "@/config/store-nap";

const siteOrigin = storeNap.url.replace(/\/$/, "");

/**
 * priceRange histórico del LocalBusiness ($$). No es un precio de producto:
 * el catálogo no publica precios.
 */
export const STORE_PRICE_RANGE = "$$";

/** Misma entidad de tienda en la home y en /nosotros (mismo @id, sin duplicarla en cada página). */
export function buildStoreNode(): Record<string, unknown> {
  return {
    // MedicalSupplyStore no está en schema.org (el validador lo rechaza).
    // Store y MedicalBusiness ya son LocalBusiness: tienda de insumos médicos.
    "@type": ["LocalBusiness", "Store", "MedicalBusiness"],
    "@id": `${siteOrigin}/#store`,
    name: storeNap.name,
    description:
      "Insumos médicos en Hermosillo: material de curación, medias de compresión, cuidado avanzado de heridas y ortopedia.",
    url: `${siteOrigin}/`,
    image: `${siteOrigin}/og/og-default.png`,
    logo: `${siteOrigin}/brand/logo.png`,
    telephone: "+52 662 450 1230",
    email: storeNap.email,
    priceRange: STORE_PRICE_RANGE,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeNap.address.streetAddress,
      addressLocality: storeNap.address.addressLocality,
      addressRegion: storeNap.address.addressRegion,
      postalCode: storeNap.address.postalCode,
      addressCountry: storeNap.address.addressCountry,
    },
    hasMap: storeNap.googleMapsUrl,
    sameAs: [storeNap.facebookUrl],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.103129,
      longitude: -110.952874,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de insumos médicos",
      url: `${siteOrigin}/catalogo`,
    },
    knowsAbout: [
      "insumos médicos",
      "material de curación",
      "equipo médico",
      "ortopedia",
      "medias de compresión",
      "medias antiembólicas",
      "cuidado avanzado de heridas",
    ],
    areaServed: { "@type": "State", name: "Sonora" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...storeNap.openingHoursSpecification.dayOfWeek],
        opens: storeNap.openingHoursSpecification.opens,
        closes: storeNap.openingHoursSpecification.closes,
      },
    ],
  };
}

/** Nodo suelto para /nosotros. La home lo incluye dentro de @graph. */
export function buildStoreJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    ...buildStoreNode(),
  };
}

/** Home-only graph: the store entity must not be emitted site-wide. */
export function buildHomeJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteOrigin}/#organization`,
        name: storeNap.name,
        url: `${siteOrigin}/`,
        logo: {
          "@type": "ImageObject",
          url: `${siteOrigin}/brand/logo.png`,
          width: 500,
          height: 500,
        },
        sameAs: [storeNap.facebookUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${siteOrigin}/#website`,
        url: `${siteOrigin}/`,
        name: storeNap.name,
        inLanguage: "es-MX",
        publisher: { "@id": `${siteOrigin}/#organization` },
      },
      buildStoreNode(),
    ],
  };
}
