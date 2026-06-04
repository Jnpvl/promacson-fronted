import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { ProductCardData } from "@/components/catalog/product-card";
import type { ProductRecord } from "@/types/product";

export function mapProductToCard(product: ProductRecord): ProductCardData {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    badge: product.badge,
    saleMode: product.saleMode,
    sku: product.sku ?? undefined,
    coverImageUrl: product.coverImageUrl,
  };
}

export async function getProducts(categorySlug?: string): Promise<ProductRecord[]> {
  if (!hasApiClient()) {
    console.warn("[products] API no configurada");
    return [];
  }

  try {
    const path = categorySlug
      ? `${apiEndpoints.products.public}?category=${encodeURIComponent(categorySlug)}`
      : apiEndpoints.products.public;
    return await apiClient.get<ProductRecord[]>(path, {
      next: { revalidate: 60, tags: ["products", categorySlug ? `products-${categorySlug}` : "products-all"] },
    });
  } catch (err) {
    console.warn("[products] fetch failed", err);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<ProductRecord[]> {
  if (!hasApiClient()) {
    console.warn("[products] API no configurada");
    return [];
  }

  try {
    return await apiClient.get<ProductRecord[]>(apiEndpoints.products.featured, {
      next: { revalidate: 60, tags: ["products", "products-featured"] },
    });
  } catch (err) {
    console.warn("[products] featured fetch failed", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductRecord | null> {
  if (!hasApiClient()) {
    console.warn("[products] API no configurada");
    return null;
  }

  try {
    return await apiClient.get<ProductRecord>(
      `${apiEndpoints.products.public}/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60, tags: ["products", `product-${slug}`] } },
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    console.warn(`[products] fetch ${slug} failed`, err);
    return null;
  }
}
