import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CategoryCard } from "@/components/catalog/category-card";
import { routes } from "@/lib/routes";
import { getCategories } from "@/lib/services/categories.service";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.catalog, {
  title: "Catálogo",
  description:
    "Explora categorías de insumos médicos, apósitos y material clínico para instituciones de salud.",
});

export default async function CatalogoPage() {
  const categories = await getCategories();

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-xl font-bold text-text sm:text-2xl">Catálogo</h1>
          <p className="mt-1 text-sm text-text-muted">
            Elige una categoría o{" "}
            <Link href={routes.catalogAllProducts} className="font-medium text-brand-700 hover:underline">
              ver todos los productos
            </Link>
            .
          </p>
        </header>

        {categories.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface-muted/50 px-4 py-12 text-center text-sm text-text-muted">
            No hay categorías disponibles por el momento.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
