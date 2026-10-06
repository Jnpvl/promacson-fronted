import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CatalogSidebar, CatalogSidebarMobile } from "@/components/catalog/catalog-sidebar";
import { ProductCard } from "@/components/catalog/product-card";
import { categorySeoFallbacks } from "@/config/seo-category-content";
import { categorySeoGuidance } from "@/config/seo-category-guidance";
import { routes } from "@/lib/routes";
import { getCategories, getCategoryBySlug } from "@/lib/services/categories.service";
import { getProducts, mapProductToCard } from "@/lib/services/products.service";
import {
  buildBreadcrumbJsonLd,
  buildCategoryCollectionJsonLd,
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
          __html: JSON.stringify(buildCategoryCollectionJsonLd(category, products, displayName)),
        }}
      />
      <SiteShell>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <nav className="mb-4 text-sm text-text-muted">
            <Link href={routes.home} className="hover:text-brand-700">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href={routes.catalog} className="hover:text-brand-700">
              Catálogo
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text">{displayName}</span>
          </nav>

          <header className="mb-6">
            <h1 className="text-xl font-bold text-text sm:text-2xl">{h1Text}</h1>
            {category.description ? (
              <p className="mt-1 text-sm text-text-muted">{category.description}</p>
            ) : null}
            {fallback?.introHtml ? (
              <div
                className="mt-4 max-w-4xl text-sm leading-relaxed text-text-muted"
                dangerouslySetInnerHTML={{ __html: sanitizeSeoHtml(fallback.introHtml) }}
              />
            ) : null}
            {products.length > 0 ? (
              <p className="mt-2 text-xs text-text-muted">
                {products.length} producto{products.length === 1 ? "" : "s"}
              </p>
            ) : null}
          </header>

          <CatalogSidebarMobile categories={categories} active={{ categorySlug: slug }} />

          {h2s[0] ? (
            <h2 className="mb-4 text-lg font-bold text-text sm:text-xl">{h2s[0]}</h2>
          ) : null}

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

          {h2s.slice(1).map((heading, index) => (
            <section key={heading} className="mt-10 max-w-4xl">
              <h2 className="text-lg font-bold text-text sm:text-xl">{heading}</h2>
              {guidance[index] ? (
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{guidance[index]}</p>
              ) : null}
            </section>
          ))}
        </div>
      </SiteShell>
    </>
  );
}
