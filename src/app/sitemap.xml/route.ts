import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { routes } from "@/lib/routes";
import { getSiteUrl } from "@/lib/site-url";
import type { CategoryRecord } from "@/types/category";
import type { ProductRecord } from "@/types/product";
import type { ServiceRecord } from "@/types/service";

/** Evitar bake estático vacío en build; CDN usa Cache-Control abajo. */
export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 8000;

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
};

function absoluteUrl(path: string): string {
  const base = getSiteUrl().origin;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function validLastmod(value: unknown): string | undefined {
  if (typeof value !== "string" && !(value instanceof Date)) return undefined;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

function staticUrls(): SitemapUrl[] {
  return [
    { loc: absoluteUrl(routes.home), changefreq: "weekly", priority: "1" },
    { loc: absoluteUrl(routes.catalog), changefreq: "weekly", priority: "0.9" },
    {
      loc: absoluteUrl(routes.catalogAllProducts),
      changefreq: "weekly",
      priority: "0.85",
    },
    { loc: absoluteUrl(routes.services), changefreq: "weekly", priority: "0.85" },
    { loc: absoluteUrl(routes.about), changefreq: "monthly", priority: "0.7" },
    { loc: absoluteUrl(routes.location), changefreq: "monthly", priority: "0.7" },
    { loc: absoluteUrl(routes.wholesale), changefreq: "monthly", priority: "0.6" },
    { loc: absoluteUrl(routes.quote), changefreq: "monthly", priority: "0.5" },
  ];
}

async function fetchCatalogUrls(): Promise<SitemapUrl[]> {
  if (!hasApiClient()) return [];

  try {
    const fetchOpts = {
      cache: "no-store" as const,
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    };

    const [categories, products, services] = await Promise.all([
      apiClient.get<CategoryRecord[]>(apiEndpoints.categories.public, fetchOpts),
      apiClient.get<ProductRecord[]>(apiEndpoints.products.public, fetchOpts),
      apiClient.get<ServiceRecord[]>(apiEndpoints.services.public, fetchOpts),
    ]);

    const categoryUrls: SitemapUrl[] = categories
      .filter((c) => c.isActive)
      .map((c) => ({
        loc: absoluteUrl(routes.category(c.slug)),
        changefreq: "weekly",
        priority: "0.8",
        lastmod: validLastmod(c.updatedAt),
      }));

    const productUrls: SitemapUrl[] = products
      .filter((p) => p.isActive)
      .map((p) => ({
        loc: absoluteUrl(routes.product(p.slug)),
        changefreq: "weekly",
        priority: "0.7",
        lastmod: validLastmod(p.updatedAt),
      }));

    const serviceUrls: SitemapUrl[] = services
      .filter((s) => s.isActive)
      .map((s) => ({
        loc: absoluteUrl(routes.serviceDetail(s.slug)),
        changefreq: "monthly",
        priority: "0.7",
        lastmod: validLastmod(s.updatedAt),
      }));

    return [...categoryUrls, ...productUrls, ...serviceUrls];
  } catch (err) {
    console.warn("[sitemap] fetch catalog failed", err);
    return [];
  }
}

function toXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) => {
      const lines = [`<url>`, `<loc>${escapeXml(u.loc)}</loc>`];
      if (u.lastmod) lines.push(`<lastmod>${escapeXml(u.lastmod)}</lastmod>`);
      if (u.changefreq) {
        lines.push(`<changefreq>${escapeXml(u.changefreq)}</changefreq>`);
      }
      if (u.priority) lines.push(`<priority>${escapeXml(u.priority)}</priority>`);
      lines.push(`</url>`);
      return lines.join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export async function GET() {
  try {
    const urls = [...staticUrls(), ...(await fetchCatalogUrls())];
    const xml = toXml(urls);

    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    // Nunca 500: al menos páginas estáticas.
    console.warn("[sitemap] unexpected failure, returning static urls", err);
    const xml = toXml(staticUrls());
    return new Response(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }
}
