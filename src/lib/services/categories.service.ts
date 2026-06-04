import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { Category } from "@/types/catalog";
import type { CategoryRecord } from "@/types/category";

export function mapCategoryRecord(row: CategoryRecord): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    imageUrl: row.imageUrl,
    productCount: row.productCount,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!hasApiClient()) {
    console.warn("[categories] API no configurada");
    return [];
  }

  try {
    const rows = await apiClient.get<CategoryRecord[]>(apiEndpoints.categories.public, {
      next: { revalidate: 60, tags: ["categories"] },
    });
    return rows.map(mapCategoryRecord);
  } catch (err) {
    console.warn("[categories] fetch failed", err);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!hasApiClient()) {
    console.warn("[categories] API no configurada");
    return null;
  }

  try {
    const row = await apiClient.get<CategoryRecord>(
      `${apiEndpoints.categories.public}/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60, tags: ["categories", `category-${slug}`] } },
    );
    return mapCategoryRecord(row);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    console.warn(`[categories] fetch ${slug} failed`, err);
    return null;
  }
}
