import { apiClient } from "@/lib/api/client";
import { isApiConfigured } from "@/lib/api/config";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { AdminUser } from "@/lib/admin-auth";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult =
  | { ok: true; token: string; user: AdminUser }
  | { ok: false; error: string };

type LoginResponse = {
  token: string;
  user: AdminUser;
};

export async function loginWithCredentials(payload: LoginPayload): Promise<LoginResult> {
  if (!isApiConfigured()) {
    return {
      ok: false,
      error:
        "API no configurada. Define NEXT_PUBLIC_API_URL o API_URL en .env.local (ej. http://localhost:4000).",
    };
  }

  try {
    const data = await apiClient.post<LoginResponse>(apiEndpoints.auth.login, payload, {
      cache: "no-store",
    });

    if (!data.token || !data.user) {
      return { ok: false, error: "Credenciales incorrectas" };
    }

    return { ok: true, token: data.token, user: data.user };
  } catch (err) {
    if (err instanceof ApiError) {
      return { ok: false, error: err.message };
    }
    return { ok: false, error: "No se pudo conectar con el servidor" };
  }
}

export async function getCurrentAdminUser(token: string): Promise<AdminUser | null> {
  if (!isApiConfigured()) return null;

  try {
    return await apiClient.get<AdminUser>(apiEndpoints.auth.me, {
      token,
      cache: "no-store",
    });
  } catch {
    return null;
  }
}
