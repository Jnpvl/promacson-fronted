import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { CatalogSidebar, CatalogSidebarMobile } from "@/components/catalog/catalog-sidebar";
import { ProductCard } from "@/components/catalog/product-card";
import { routes } from "@/lib/routes";
import { getCategories, getCategoryBySlug } from "@/lib/services/categories.service";
import { getProducts, mapProductToCard } from "@/lib/services/products.service";
import { withCanonical } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return withCanonical(routes.catalog, { title: "Categoría" });

  return withCanonical(routes.category(slug), {
    title: category.seoTitle ?? category.name,
    description: category.seoDescription ?? category.description,
  });
}

export default async function CatalogoCategoriaPage({ params }: Props) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <nav className="mb-4 text-sm text-text-muted">
          <Link href={routes.catalog} className="hover:text-brand-700">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{category.name}</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-text sm:text-2xl">{category.name}</h1>
          {category.description ? (
            <p className="mt-1 text-sm text-text-muted">{category.description}</p>
          ) : null}
          {products.length > 0 ? (
            <p className="mt-2 text-xs text-text-muted">
              {products.length} producto{products.length === 1 ? "" : "s"}
            </p>
          ) : null}
        </header>

        <CatalogSidebarMobile
          categories={categories}
          active={{ categorySlug: slug }}
        />

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
      </div>
    </SiteShell>
  );
}
