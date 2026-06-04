const DEV_API_DEFAULT = "http://localhost:4000";

/** Base URL del backend (servidor: API_URL; cliente: NEXT_PUBLIC_API_URL). */
export function getApiBase(): string | undefined {
  const base = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  const trimmed = base?.trim();
  if (trimmed) return trimmed;

  // Desarrollo local: backend en :4000 sin obligar .env.local
  if (process.env.NODE_ENV === "development") {
    return DEV_API_DEFAULT;
  }

  return undefined;
}

export function isApiConfigured(): boolean {
  return Boolean(getApiBase());
}

export function buildApiUrl(path: string, base?: string): string {
  const root = (base ?? getApiBase())?.replace(/\/$/, "");
  if (!root) {
    throw new Error("API no configurada (API_URL / NEXT_PUBLIC_API_URL)");
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${root}${normalizedPath}`;
}
