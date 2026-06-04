import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import type { PaginatedResult } from "@/types/admin-list";
import type { CategoryRecord } from "@/types/category";

/** Todas las categorías para selects en formularios (sin paginación en UI). */
export async function fetchAdminCategoriesAll(): Promise<CategoryRecord[]> {
  try {
    const result = await adminApiRequest<PaginatedResult<CategoryRecord>>(
      `${apiEndpoints.categories.admin}?page=1&pageSize=100`,
    );
    return result.items;
  } catch {
    return [];
  }
}
