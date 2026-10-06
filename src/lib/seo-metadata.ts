import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export type PageSeoOptions = {
  /** Imagen para Open Graph / Twitter (URL absoluta o ruta `/…`). */
  image?: string | null;
  /** Product is not in Next's Open Graph union; emit it through `other`. */
  openGraphType?: "product";
};

function resolveOgImage(image?: string | null): string {
  const src = image?.trim() || siteConfig.brand.ogImage || siteConfig.brand.logo;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

/** Títulos que ya traen la marca al final (" | Promacson Tienda" o " | Promacson") no llevan sufijo extra. */
function hasBrandSuffix(title: string): boolean {
  return title.endsWith(` | ${siteConfig.siteTitle}`) || title.endsWith(` | ${siteConfig.name}`);
}

function resolveShareTitle(title: Metadata["title"]): string {
  if (typeof title === "string" && title.trim()) {
    const trimmed = title.trim();
    return hasBrandSuffix(trimmed) ? trimmed : `${trimmed} | ${siteConfig.siteTitle}`;
  }
  if (title && typeof title === "object") {
    if ("absolute" in title && typeof title.absolute === "string") return title.absolute;
    if ("default" in title && typeof title.default === "string") return title.default;
  }
  return siteConfig.siteTitle;
}

function resolveDescription(description: Metadata["description"]): string | undefined {
  if (typeof description === "string" && description.trim()) return description.trim();
  return siteConfig.description;
}

/**
 * Metadata de página con canónica, Open Graph y Twitter Card.
 * `path` es relativo a `metadataBase` (ej. `/catalogo/gasas`).
 */
export function withCanonical(
  path: string,
  metadata: Metadata = {},
  options?: PageSeoOptions,
): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const alternates =
    metadata.alternates && typeof metadata.alternates === "object"
      ? metadata.alternates
      : {};

  const ogImage = resolveOgImage(options?.image);
  const shareTitle = resolveShareTitle(metadata.title);
  const shareDescription = resolveDescription(metadata.description);

  const openGraph =
    metadata.openGraph && typeof metadata.openGraph === "object"
      ? metadata.openGraph
      : {};
  const twitter =
    metadata.twitter && typeof metadata.twitter === "object" ? metadata.twitter : {};
  const isProduct = options?.openGraphType === "product";
  const pageTitle =
    typeof metadata.title === "string" && hasBrandSuffix(metadata.title.trim())
      ? { absolute: metadata.title.trim() }
      : metadata.title;

  return {
    ...metadata,
    ...(pageTitle !== metadata.title ? { title: pageTitle } : {}),
    ...(isProduct ? { other: { ...metadata.other, "og:type": "product" } } : {}),
    alternates: {
      ...alternates,
      canonical,
    },
    openGraph: {
      ...(isProduct ? {} : { type: "website" as const }),
      locale: "es_MX",
      url: canonical,
      siteName: siteConfig.siteTitle,
      title: shareTitle,
      description: shareDescription,
      images: [{ url: ogImage, alt: shareTitle, width: 1200, height: 630 }],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [ogImage],
      ...twitter,
    },
  };
}

/** Open Graph por defecto del sitio (layout raíz). */
export function defaultSiteOpenGraph(): Pick<Metadata, "openGraph" | "twitter"> {
  const image = resolveOgImage(null);
  const title = siteConfig.siteTitle;
  const description = siteConfig.description;

  return {
    openGraph: {
      type: "website",
      locale: "es_MX",
      siteName: siteConfig.siteTitle,
      title,
      description,
      images: [{ url: image, alt: title, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
