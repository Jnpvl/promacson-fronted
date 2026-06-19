import type { MetadataRoute } from "next";
import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";
import type { CategoryRecord } from "@/types/category";
import type { ProductRecord } from "@/types/product";
import type { ServiceRecord } from "@/types/service";

/** Regenerar el sitemap como máximo cada hora (nuevos productos/categorías). */
export const revalidate = 3600;

function absoluteUrl(path: string): string {
  const base = getSiteUrl().origin;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function entry(
  path: string,
  options: Pick<MetadataRoute.Sitemap[number], "changeFrequency" | "priority" | "lastModified">,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    ...options,
  };
}

function staticEntries(): MetadataRoute.Sitemap {
  return [
    entry(routes.home, { changeFrequency: "weekly", priority: 1 }),
    entry(routes.catalog, { changeFrequency: "weekly", priority: 0.9 }),
    entry(routes.catalogAllProducts, { changeFrequency: "weekly", priority: 0.85 }),
    entry(routes.services, { changeFrequency: "weekly", priority: 0.85 }),
    entry(routes.about, { changeFrequency: "monthly", priority: 0.7 }),
    entry(routes.wholesale, { changeFrequency: "monthly", priority: 0.6 }),
    entry(routes.quote, { changeFrequency: "monthly", priority: 0.5 }),
  ];
}

async function fetchCatalogEntries(): Promise<MetadataRoute.Sitemap> {
  if (!hasApiClient()) return [];

  try {
    const [categories, products, services] = await Promise.all([
      apiClient.get<CategoryRecord[]>(apiEndpoints.categories.public, {
        next: { revalidate: 3600, tags: ["categories"] },
      }),
      apiClient.get<ProductRecord[]>(apiEndpoints.products.public, {
        next: { revalidate: 3600, tags: ["products"] },
      }),
      apiClient.get<ServiceRecord[]>(apiEndpoints.services.public, {
        next: { revalidate: 3600, tags: ["services"] },
      }),
    ]);

    const categoryEntries = categories
      .filter((c) => c.isActive)
      .map((c) =>
        entry(routes.category(c.slug), {
          changeFrequency: "weekly",
          priority: 0.8,
          lastModified: new Date(c.updatedAt),
        }),
      );

    const productEntries = products
      .filter((p) => p.isActive)
      .map((p) =>
        entry(routes.product(p.slug), {
          changeFrequency: "weekly",
          priority: 0.7,
          lastModified: new Date(p.updatedAt),
        }),
      );

    const serviceEntries = services
      .filter((s) => s.isActive)
      .map((s) =>
        entry(routes.serviceDetail(s.slug), {
          changeFrequency: "monthly",
          priority: 0.7,
          lastModified: new Date(s.updatedAt),
        }),
      );

    return [...categoryEntries, ...productEntries, ...serviceEntries];
  } catch (err) {
    console.warn("[sitemap] fetch catalog failed", err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalog = await fetchCatalogEntries();
  return [...staticEntries(), ...catalog];
}
