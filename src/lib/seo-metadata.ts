import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export type PageSeoOptions = {
  /** Imagen para Open Graph / Twitter (URL absoluta o ruta `/…`). */
  image?: string | null;
};

function resolveOgImage(image?: string | null): string {
  const src = image?.trim() || siteConfig.brand.logo;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return src.startsWith("/") ? src : `/${src}`;
}

function resolveShareTitle(title: Metadata["title"]): string {
  if (typeof title === "string" && title.trim()) {
    return `${title.trim()} | ${siteConfig.siteTitle}`;
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

  return {
    ...metadata,
    alternates: {
      ...alternates,
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "es_MX",
      url: canonical,
      siteName: siteConfig.siteTitle,
      title: shareTitle,
      description: shareDescription,
      images: [{ url: ogImage, alt: shareTitle }],
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
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
