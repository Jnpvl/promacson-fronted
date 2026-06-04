import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import { MOCK_SITE_CONTACT } from "@/lib/mock-site-contact";
import type { SiteContact } from "@/types/site-contact";

function isSiteContact(value: unknown): value is SiteContact {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.phone === "string" &&
    typeof o.phoneE164 === "string" &&
    typeof o.email === "string" &&
    typeof o.whatsapp === "string"
  );
}

/** Normaliza respuesta de API o mock al tipo del frontend. */
export function normalizeSiteContact(payload: unknown): SiteContact {
  if (!isSiteContact(payload)) {
    return MOCK_SITE_CONTACT;
  }
  return {
    phone: payload.phone,
    phoneE164: payload.phoneE164,
    email: payload.email,
    whatsapp: payload.whatsapp,
    address: payload.address ?? null,
    businessHours: payload.businessHours ?? null,
    facebookUrl: payload.facebookUrl ?? null,
  };
}

/**
 * Obtiene contacto desde el backend.
 * Sin API configurada o si falla la petición, devuelve el mock.
 */
export async function getSiteContactFromApi(): Promise<SiteContact> {
  if (!hasApiClient()) {
    return MOCK_SITE_CONTACT;
  }

  try {
    const data = await apiClient.get<unknown>(apiEndpoints.site.contact, {
      next: { revalidate: 300, tags: ["site-contact"] },
    });
    return normalizeSiteContact(data);
  } catch (err) {
    const detail = err instanceof ApiError ? `${err.status}` : "fetch failed";
    console.warn(`[site-contact] ${detail}, using mock`, err);
    return MOCK_SITE_CONTACT;
  }
}
