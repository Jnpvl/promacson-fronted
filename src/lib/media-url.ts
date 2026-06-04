import { getApiBase } from "@/lib/api/config";

/**
 * URL usable en `<img />` o `<Image />`.
 * Prefiere ruta relativa `/uploads/...` (proxy en Next) para evitar CORS y remotePatterns.
 */
export function resolveMediaUrl(path: string): string {
  if (!path) return path;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const url = new URL(path);
      if (url.pathname.startsWith("/uploads/")) return url.pathname;
    } catch {
      return path;
    }
    return path;
  }

  if (path.startsWith("/uploads/")) return path;

  const base = getApiBase()?.replace(/\/$/, "");
  if (base && path.startsWith("/")) return `${base}${path}`;

  return path.startsWith("/") ? path : `/${path}`;
}
