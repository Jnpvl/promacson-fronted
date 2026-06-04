import Link from "next/link";
import { CategoryCard } from "@/components/catalog/category-card";
import { routes } from "@/lib/routes";
import type { Category } from "@/types/catalog";

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text">Categorías</h2>
          <p className="mt-1 text-sm text-text-muted">Encuentra insumos por especialidad y uso clínico</p>
        </div>
        <Link
          href={routes.catalog}
          className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
        >
          Ver catálogo completo
        </Link>
      </div>
      {categories.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border bg-surface-muted/50 px-4 py-8 text-center text-sm text-text-muted">
          No hay categorías publicadas. Configúralas en el panel de administración.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} variant="compact" />
          ))}
        </div>
      )}
    </section>
  );
}
