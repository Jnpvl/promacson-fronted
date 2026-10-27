import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { guides } from "@/content/guides";
import { routes } from "@/lib/routes";
import { buildBreadcrumbJsonLd, homeBreadcrumb } from "@/lib/seo-jsonld";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.guides, {
  title: "Guías de insumos médicos",
  description:
    "Guías de Promacson Tienda para elegir medias de compresión, talla y mmHg. Visítanos en Hermosillo o cotiza por WhatsApp.",
});

export default function GuiasPage() {
  const breadcrumbItems = [homeBreadcrumb(), { name: "Guías", item: routes.guides }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)) }}
      />
      <SiteShell>
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          <nav aria-label="Migas de pan" className="mb-4 text-sm text-text-muted">
            <Link href={routes.home} className="hover:text-brand-700">
              Inicio
            </Link>
            <span className="mx-2" aria-hidden="true">
              ›
            </span>
            <span className="text-text" aria-current="page">
              Guías
            </span>
          </nav>

          <h1 className="text-2xl font-bold text-text sm:text-3xl">Guías</h1>
          <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
            Guías prácticas para elegir la medida y la presentación correctas. La primera es cómo
            elegir medias de compresión.
          </p>

          <ul className="mt-8 space-y-4">
            {guides.map((guide) => (
              <li key={guide.slug} className="rounded-xl border border-border bg-surface p-5">
                <h2 className="text-lg font-bold text-text">
                  <Link href={routes.guide(guide.slug)} className="hover:text-brand-700">
                    {guide.h1}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{guide.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </SiteShell>
    </>
  );
}
