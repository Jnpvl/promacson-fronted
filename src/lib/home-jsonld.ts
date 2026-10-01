import { storeNap } from "@/config/store-nap";

const siteOrigin = storeNap.url.replace(/\/$/, "");

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
      {
        "@type": "Store",
        "@id": `${siteOrigin}/#store`,
        name: storeNap.name,
        description:
          "Tienda de insumos médicos, material de curación, ortopedia y equipo médico en Hermosillo, Sonora.",
        url: `${siteOrigin}/`,
        image: `${siteOrigin}/og/og-default.png`,
        logo: `${siteOrigin}/brand/logo.png`,
        telephone: "+52 662 450 1230",
        email: storeNap.email,
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
        areaServed: { "@type": "State", name: "Sonora" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [...storeNap.openingHoursSpecification.dayOfWeek],
            opens: storeNap.openingHoursSpecification.opens,
            closes: storeNap.openingHoursSpecification.closes,
          },
        ],
      },
    ],
  };
}
