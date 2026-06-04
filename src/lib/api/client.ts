import { buildApiUrl, getApiBase } from "@/lib/api/config";
import type { ApiRequestInit } from "@/lib/api/types";
import { ApiError } from "@/lib/api/types";

export type ApiClientOptions = {
  baseUrl?: string;
  token?: string;
};

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

async function request<T>(
  method: string,
  path: string,
  options: ApiClientOptions & ApiRequestInit = {},
): Promise<T> {
  const { baseUrl, token: defaultToken, json, token, headers, ...init } = options;
  const authToken = token ?? defaultToken;

  const url = buildApiUrl(path, baseUrl);

  const res = await fetch(url, {
    ...init,
    method,
    headers: {
      Accept: "application/json",
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });

  const body = await parseJsonSafe(res);

  if (!res.ok) {
    throw new ApiError(
      errorMessage(body, `Error ${res.status}`),
      res.status,
      body,
    );
  }

  return body as T;
}

export type ApiClient = {
  get: <T>(path: string, options?: ApiClientOptions & ApiRequestInit) => Promise<T>;
  post: <T>(
    path: string,
    json?: unknown,
    options?: ApiClientOptions & ApiRequestInit,
  ) => Promise<T>;
  put: <T>(
    path: string,
    json?: unknown,
    options?: ApiClientOptions & ApiRequestInit,
  ) => Promise<T>;
  patch: <T>(
    path: string,
    json?: unknown,
    options?: ApiClientOptions & ApiRequestInit,
  ) => Promise<T>;
  delete: <T>(path: string, options?: ApiClientOptions & ApiRequestInit) => Promise<T>;
};

export function createApiClient(options: ApiClientOptions = {}): ApiClient {
  return {
    get: <T>(path: string, opts?: ApiClientOptions & ApiRequestInit) =>
      request<T>("GET", path, { ...options, ...opts }),
    post: <T>(path: string, json?: unknown, opts?: ApiClientOptions & ApiRequestInit) =>
      request<T>("POST", path, { ...options, ...opts, json }),
    put: <T>(path: string, json?: unknown, opts?: ApiClientOptions & ApiRequestInit) =>
      request<T>("PUT", path, { ...options, ...opts, json }),
    patch: <T>(path: string, json?: unknown, opts?: ApiClientOptions & ApiRequestInit) =>
      request<T>("PATCH", path, { ...options, ...opts, json }),
    delete: <T>(path: string, opts?: ApiClientOptions & ApiRequestInit) =>
      request<T>("DELETE", path, { ...options, ...opts }),
  };
}

/** Cliente por defecto usando `API_URL` / `NEXT_PUBLIC_API_URL`. */
export const apiClient = createApiClient();

export function hasApiClient(): boolean {
  return Boolean(getApiBase());
}
