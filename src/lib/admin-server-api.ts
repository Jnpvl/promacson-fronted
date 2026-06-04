import { cookies } from "next/headers";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { buildApiUrl } from "@/lib/api/config";
import { ApiError } from "@/lib/api/types";

async function parseJsonSafe(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function errorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object" && "error" in body) {
    const err = (body as { error?: unknown }).error;
    if (typeof err === "string" && err.trim()) return err;
  }
  return fallback;
}

export async function getAdminToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_TOKEN_COOKIE)?.value ?? null;
}

export async function adminApiRequest<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const token = await getAdminToken();
  if (!token) {
    throw new ApiError("No autorizado", 401);
  }

  const { json, headers, ...rest } = init;
  const url = buildApiUrl(path);

  const res = await fetch(url, {
    ...rest,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : rest.body,
    cache: "no-store",
  });

  const body = await parseJsonSafe(res);

  if (!res.ok) {
    throw new ApiError(errorMessage(body, `Error ${res.status}`), res.status, body);
  }

  return body as T;
}

export async function adminApiUploadImage(file: File): Promise<{ url: string }> {
  const token = await getAdminToken();
  if (!token) {
    throw new ApiError("No autorizado", 401);
  }

  const form = new FormData();
  form.append("image", file);

  const url = buildApiUrl("/api/v1/admin/sliders/upload/image");
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
    cache: "no-store",
  });

  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new ApiError(errorMessage(body, "Error al subir imagen"), res.status, body);
  }

  return body as { url: string };
}
