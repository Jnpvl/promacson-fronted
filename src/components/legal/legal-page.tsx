import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import type { LegalDoc } from "@/content/legal";
import { routes } from "@/lib/routes";
import { buildBreadcrumbJsonLd, homeBreadcrumb } from "@/lib/seo-jsonld";

type Props = {
  doc: LegalDoc;
  /** Texto corto de la miga final (p. ej. "Aviso de privacidad"). */
  crumbName: string;
  path: string;
};

export function LegalPage({ doc, crumbName, path }: Props) {
  const breadcrumbItems = [homeBreadcrumb(), { name: crumbName, item: path }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)),
        }}
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
              {crumbName}
            </span>
          </nav>

          <article>
            <h1 className="text-2xl font-bold text-text sm:text-3xl">{doc.title}</h1>
            <div className="mt-6 space-y-4 leading-relaxed text-text-muted">
              {doc.blocks.map((block, i) =>
                block.t === "h2" ? (
                  <h2 key={i} className="pt-4 text-xl font-bold text-text">
                    {block.x}
                  </h2>
                ) : (
                  <p key={i}>
                    {block.x.map((part, j) =>
                      typeof part === "string" ? (
                        part
                      ) : (
                        <strong key={j} className="font-semibold text-text">
                          {part.b}
                        </strong>
                      ),
                    )}
                  </p>
                ),
              )}
            </div>
          </article>
        </div>
      </SiteShell>
    </>
  );
}
