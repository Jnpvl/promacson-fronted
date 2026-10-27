import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CatalogSidebar, CatalogSidebarMobile } from "@/components/catalog/catalog-sidebar";
import { ProductCard } from "@/components/catalog/product-card";
import { VisibleFaq } from "@/components/seo/visible-faq";
import { categorySeoFallbacks } from "@/config/seo-category-content";
import { catalogLines } from "@/content/catalog-lines";
import { faqPlainItems } from "@/content/faq";
import { categorySeoGuidance } from "@/config/seo-category-guidance";
import { routes } from "@/lib/routes";
import { getCategories, getCategoryBySlug } from "@/lib/services/categories.service";
import { getProducts, mapProductToCard } from "@/lib/services/products.service";
import {
  buildBreadcrumbJsonLd,
  buildCategoryCollectionJsonLd,
  buildFaqJsonLd,
  catalogBreadcrumb,
  homeBreadcrumb,
} from "@/lib/seo-jsonld";
import { sanitizeSeoHtml } from "@/lib/seo-html";
import { withCanonical } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return withCanonical(routes.catalog, { title: "Categoría" });

  const fallback = categorySeoFallbacks[slug];
  const title = category.metaTitle?.trim() || fallback?.metaTitle || category.seoTitle || category.name;
  const description =
    category.metaDescription?.trim() ||
    fallback?.metaDescription ||
    category.seoDescription ||
    category.description;

  return withCanonical(
    routes.category(slug),
    { title, description },
    { image: category.imageUrl },
  );
}

export default async function CatalogoCategoriaPage({ params }: Props) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);
  if (!category) notFound();

  const products = await getProducts(slug);
  const fallback = categorySeoFallbacks[slug];
  const guidance = categorySeoGuidance[slug] ?? [];
  const h2s = fallback?.h2 ?? [];
  const displayName = fallback?.h1 && !category.name.trim() ? fallback.h1 : category.name;
  const h1Text = fallback?.h1Override?.trim() || displayName;
  const faq = fallback?.faq ?? [];
  const faqJsonLd = buildFaqJsonLd(faqPlainItems(faq));
  const lead = catalogLines[slug]?.text?.trim() || category.description?.trim() || "";
  const hasReading = Boolean(fallback?.introHtml) || h2s.length > 0 || faq.length > 0;
  // La frase corta va bajo el H1. La intro larga y la FAQ viven en código, debajo de la cuadrícula:
  // el campo description del admin es un texto breve (Parte A lo alinea con la meta).
  const breadcrumbItems = [
    homeBreadcrumb(),
    catalogBreadcrumb(),
    { name: displayName, item: routes.category(category.slug) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildCategoryCollectionJsonLd(category, products, h1Text)),
        }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <SiteShell>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <nav aria-label="Migas de pan" className="mb-4 text-sm text-text-muted">
            <Link href={routes.home} className="hover:text-brand-700">
              Inicio
            </Link>
            <span className="mx-2" aria-hidden="true">
              ›
            </span>
            <Link href={routes.catalog} className="hover:text-brand-700">
              Catálogo
            </Link>
            <span className="mx-2" aria-hidden="true">
              ›
            </span>
            <span className="text-text" aria-current="page">
              {displayName}
            </span>
          </nav>

          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">{h1Text}</h1>
            {lead ? (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">{lead}</p>
            ) : null}
            {products.length > 0 ? (
              <p className="mt-2 text-xs text-text-muted">
                {products.length} producto{products.length === 1 ? "" : "s"}
              </p>
            ) : null}
          </header>

          <CatalogSidebarMobile categories={categories} active={{ categorySlug: slug }} />

          <div className="mt-4 grid gap-6 lg:mt-6 lg:grid-cols-[220px_1fr]">
            <aside className="hidden lg:block">
              <CatalogSidebar categories={categories} active={{ categorySlug: slug }} />
            </aside>
            <div>
              {products.length === 0 ? (
                <p className="rounded-xl border border-border bg-surface-muted p-8 text-center text-sm text-text-muted">
                  No hay productos en esta categoría por el momento.{" "}
                  <Link href={routes.catalogAllProducts} className="font-medium text-brand-700 underline">
                    Ver todos los productos
                  </Link>
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((p) => (
                    <ProductCard key={p.id} product={mapProductToCard(p)} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {hasReading ? (
            <section className="mt-14 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-8 sm:px-8 sm:py-10">
              <div className="mx-auto max-w-3xl">
                {h2s[0] ? (
                  <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">{h2s[0]}</h2>
                ) : null}
                {fallback?.introHtml ? (
                  <div
                    className={`${h2s[0] ? "mt-4" : ""} space-y-3 text-sm leading-relaxed text-text-muted sm:text-base [&_a]:font-medium [&_a]:text-brand-700 [&_a]:hover:underline [&_li]:rounded-xl [&_li]:border [&_li]:border-brand-200 [&_li]:bg-white [&_li]:px-3 [&_li]:py-2.5 [&_ul]:mt-4 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:pl-0 sm:[&_ul]:grid-cols-2`}
                    dangerouslySetInnerHTML={{ __html: sanitizeSeoHtml(fallback.introHtml) }}
                  />
                ) : null}
                {h2s.slice(1).map((heading, index) => (
                  <div key={heading} className="mt-8">
                    <h2 className="text-lg font-bold text-text sm:text-xl">{heading}</h2>
                    {guidance[index] ? (
                      <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
                        {guidance[index]}
                      </p>
                    ) : null}
                  </div>
                ))}
                <VisibleFaq items={faq} className="mt-8" />
              </div>
            </section>
          ) : null}
        </div>
      </SiteShell>
    </>
  );
}
