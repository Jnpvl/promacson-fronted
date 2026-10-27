import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { CategoryCard } from "@/components/catalog/category-card";
import { catalogLines } from "@/content/catalog-lines";
import { routes } from "@/lib/routes";
import { getCategories } from "@/lib/services/categories.service";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.catalog, {
  title: "Catálogo de productos médicos",
  description:
    "Explora el catálogo de Promacson: material de curación, apósitos, medias de compresión, antisépticos, ortopedia y equipo médico. Cotiza o visítanos.",
});

export default async function CatalogoPage() {
  const categories = await getCategories();

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-xl font-bold text-text sm:text-2xl">Catálogo de productos médicos</h1>
          <ul className="mt-4 max-w-3xl space-y-2 text-sm leading-relaxed text-text-muted sm:text-base">
            {categories.map((category) => {
              const line = catalogLines[category.slug];
              return (
                <li key={category.slug}>
                  <Link
                    href={routes.category(category.slug)}
                    className="font-medium text-brand-700 hover:underline"
                  >
                    {line?.anchor ?? category.name}
                  </Link>
                  {line?.text ? ` — ${line.text}` : category.description ? ` — ${category.description}` : null}
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-sm text-text-muted">
            <Link href={routes.catalogAllProducts} className="font-medium text-brand-700 hover:underline">
              Ver todos los productos
            </Link>
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
