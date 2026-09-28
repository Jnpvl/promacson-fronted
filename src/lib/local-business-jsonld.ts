import { storeNap } from "@/config/store-nap";
import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

/** JSON-LD Store / LocalBusiness (solo dirección de tienda). */
export function buildLocalBusinessJsonLd(): Record<string, unknown> {
  const origin = getSiteUrl().origin;
  const logoPath = siteConfig.brand.logo.startsWith("/")
    ? siteConfig.brand.logo
    : `/${siteConfig.brand.logo}`;
  const logoUrl = `${origin}${logoPath}`;
  const ogPath = siteConfig.brand.ogImage ?? "/og/og-default.png";
  const imageUrl = `${origin}${ogPath.startsWith("/") ? ogPath : `/${ogPath}`}`;

  return {
    "@context": "https://schema.org",
    "@type": ["Store", "LocalBusiness"],
    name: storeNap.name,
    url: storeNap.url,
    logo: logoUrl,
    image: imageUrl,
    telephone: storeNap.telephoneE164,
    email: storeNap.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeNap.address.streetAddress,
      addressLocality: storeNap.address.addressLocality,
      addressRegion: storeNap.address.addressRegion,
      postalCode: storeNap.address.postalCode,
      addressCountry: storeNap.address.addressCountry,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...storeNap.openingHoursSpecification.dayOfWeek],
      opens: storeNap.openingHoursSpecification.opens,
      closes: storeNap.openingHoursSpecification.closes,
    },
  };
}
