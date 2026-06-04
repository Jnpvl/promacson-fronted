import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { Service } from "@/types/service";
import type { ServiceRecord } from "@/types/service";

export function mapServiceRecord(row: ServiceRecord): Service {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    body: row.body,
    imageUrl: row.imageUrl,
    href: row.href,
    contactType: row.contactType,
    contactValue: row.contactValue,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
  };
}

export async function getServices(): Promise<Service[]> {
  if (!hasApiClient()) {
    console.warn("[services] API no configurada");
    return [];
  }

  try {
    const rows = await apiClient.get<ServiceRecord[]>(apiEndpoints.services.public, {
      next: { revalidate: 60, tags: ["services"] },
    });
    return rows.map(mapServiceRecord);
  } catch (err) {
    console.warn("[services] fetch failed", err);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!hasApiClient()) {
    console.warn("[services] API no configurada");
    return null;
  }

  try {
    const row = await apiClient.get<ServiceRecord>(
      `${apiEndpoints.services.public}/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60, tags: ["services", `service-${slug}`] } },
    );
    return mapServiceRecord(row);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    console.warn(`[services] fetch ${slug} failed`, err);
    return null;
  }
}
