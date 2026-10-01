import { routes } from "@/lib/routes";
import { storeNap } from "@/config/store-nap";
import { resolveMediaUrl } from "@/lib/media-url";
import type { ProductRecord } from "@/types/product";

const siteOrigin = storeNap.url.replace(/\/$/, "");
const knownBrands = ["Protec", "Daonsa", "Jobst", "Cutimed", "Hypafix", "Dermodine"] as const;

type BreadcrumbItem = { name: string; item: string };

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

function absoluteMediaUrl(path: string): string {
  const resolved = resolveMediaUrl(path);
  if (/^https?:\/\//i.test(resolved)) {
    try {
      const url = new URL(resolved);
      if (url.pathname.startsWith("/uploads/")) return `${siteOrigin}${url.pathname}`;
    } catch {
      return resolved;
    }
    return resolved;
  }
  return absoluteUrl(resolved);
}

function plainText(value: string | null | undefined): string | undefined {
  const cleaned = value
    ?.replace(/<[^>]*>/g, " ")
    .replace(/\bCotiza disponibilidad\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || undefined;
}

function deriveBrand(name: string): string | undefined {
  const match = knownBrands.find((brand) => new RegExp(`\\b${brand}\\b`, "i").test(name));
  return match;
}

export function buildProductJsonLd(product: ProductRecord): Record<string, unknown> {
  const images = [...new Set([...product.imageUrls, product.coverImageUrl ?? ""].filter(Boolean))].map(
    absoluteMediaUrl,
  );
  const productUrl = absoluteUrl(routes.product(product.slug));
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: plainText(product.description),
    image: images,
    brand: deriveBrand(product.name)
      ? { "@type": "Brand", name: deriveBrand(product.name) }
      : undefined,
    category: product.categoryName || undefined,
    url: productUrl,
  };

  if (product.sku?.trim()) jsonLd.sku = product.sku.trim();
  return Object.fromEntries(Object.entries(jsonLd).filter(([, value]) => value !== undefined));
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.item),
    })),
  };
}

export function homeBreadcrumb(): BreadcrumbItem {
  return { name: "Inicio", item: routes.home };
}

export function catalogBreadcrumb(): BreadcrumbItem {
  return { name: "Catálogo", item: routes.catalog };
}
