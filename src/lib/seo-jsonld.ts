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

export function plainProductDescription(value: string | null | undefined): string | undefined {
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

/** Campos de precio/stock opcionales: la API actual no los expone (catálogo solo cotización). */
type ProductPriceFields = {
  price?: unknown;
  stock?: unknown;
  inStock?: unknown;
  priceValidUntil?: unknown;
  itemCondition?: unknown;
};

/** Precio válido (> 0) o null. Sin precio válido no se emite el nodo Product. */
export function validProductPrice(product: ProductRecord): number | null {
  const raw = (product as ProductRecord & ProductPriceFields).price;
  const value =
    typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() ? Number(raw) : Number.NaN;
  return Number.isFinite(value) && value > 0 ? value : null;
}

function productAvailability(product: ProductRecord): string {
  const extra = product as ProductRecord & ProductPriceFields;
  const outOfStock =
    extra.inStock === false ||
    (typeof extra.stock === "number" && Number.isFinite(extra.stock) && extra.stock <= 0);
  return outOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";
}

/**
 * JSON-LD Product solo cuando hay precio válido (Google exige offers/review/aggregateRating).
 * Sin precio (solo cotización) devuelve null y la página omite el nodo Product.
 */
export function buildProductJsonLd(product: ProductRecord): Record<string, unknown> | null {
  const price = validProductPrice(product);
  if (price === null) return null;

  const extra = product as ProductRecord & ProductPriceFields;
  const images = [...new Set([...product.imageUrls, product.coverImageUrl ?? ""].filter(Boolean))].map(
    absoluteMediaUrl,
  );
  const productUrl = absoluteUrl(routes.product(product.slug));
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.name,
    description: plainProductDescription(product.description),
    image: images,
    brand: deriveBrand(product.name)
      ? { "@type": "Brand", name: deriveBrand(product.name) }
      : undefined,
    category: product.categoryName || undefined,
    url: productUrl,
  };

  if (product.sku?.trim()) jsonLd.sku = product.sku.trim();

  const offer: Record<string, unknown> = {
    "@type": "Offer",
    price,
    priceCurrency: "MXN",
    availability: productAvailability(product),
    url: productUrl,
  };
  if (typeof extra.priceValidUntil === "string" && extra.priceValidUntil.trim()) {
    offer.priceValidUntil = extra.priceValidUntil.trim();
  }
  if (typeof extra.itemCondition === "string" && extra.itemCondition.trim()) {
    offer.itemCondition = extra.itemCondition.trim();
  }
  jsonLd.offers = offer;

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

export function buildCategoryCollectionJsonLd(
  category: { slug: string },
  products: ProductRecord[],
  name: string,
): Record<string, unknown> {
  const categoryUrl = absoluteUrl(routes.category(category.slug));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${categoryUrl}#page`,
    url: categoryUrl,
    name,
    inLanguage: "es-MX",
    isPartOf: { "@id": `${siteOrigin}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(routes.product(product.slug)),
      })),
    },
  };
}
