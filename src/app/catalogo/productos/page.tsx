import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CatalogSidebar, CatalogSidebarMobile } from "@/components/catalog/catalog-sidebar";
import { ProductCard } from "@/components/catalog/product-card";
import { routes } from "@/lib/routes";
import { getCategories } from "@/lib/services/categories.service";
import { getProducts, mapProductToCard } from "@/lib/services/products.service";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.catalogAllProducts, {
  title: "Todos los productos",
  description: "Explora todo el catálogo de insumos médicos Promacson por categoría.",
});

export default async function CatalogoTodosProductosPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <nav className="mb-4 text-sm text-text-muted">
          <Link href={routes.catalog} className="hover:text-brand-700">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">Todos los productos</span>
        </nav>

        <header className="mb-6">
          <h1 className="text-xl font-bold text-text sm:text-2xl">Todos los productos</h1>
          <p className="mt-1 text-sm text-text-muted">
            {products.length > 0
              ? `${products.length} producto${products.length === 1 ? "" : "s"} en el catálogo`
              : "Explora el catálogo completo o elige una categoría."}
          </p>
        </header>

        <CatalogSidebarMobile categories={categories} active="all-products" />

        <div className="mt-4 grid gap-6 lg:mt-6 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <CatalogSidebar categories={categories} active="all-products" />
          </aside>
          <div>
            {products.length === 0 ? (
              <p className="rounded-xl border border-border bg-surface-muted p-8 text-center text-sm text-text-muted">
                No hay productos publicados por el momento.{" "}
                <Link href={routes.catalog} className="font-medium text-brand-700 underline">
                  Ver categorías
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
