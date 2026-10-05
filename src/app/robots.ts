import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl().origin;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // "/admin" (sin barra) NO se bloquea aún: Google debe poder rastrearlo para ver el noindex
      // (meta robots + X-Robots-Tag). Agregar "Disallow: /admin" cuando Search Console confirme
      // que /admin salió del índice. La línea "/admin/" existente se mantiene igual.
      disallow: ["/admin/", "/buscar", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
