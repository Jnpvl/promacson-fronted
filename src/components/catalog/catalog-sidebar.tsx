import Link from "next/link";
import { routes } from "@/lib/routes";
import type { Category } from "@/types/catalog";

export type CatalogSidebarActive = "all-products" | { categorySlug: string };

type CatalogSidebarProps = {
  categories: Category[];
  active: CatalogSidebarActive;
};

function navLinkClass(isActive: boolean): string {
  return `block rounded-lg px-3 py-2 text-sm transition ${
    isActive
      ? "bg-brand-50 font-semibold text-brand-800"
      : "text-text-muted hover:bg-brand-50/60 hover:text-brand-800"
  }`;
}

export function CatalogSidebar({ categories, active }: CatalogSidebarProps) {
  const isAllProducts = active === "all-products";

  return (
    <nav className="rounded-xl border border-border bg-surface p-4" aria-label="Filtrar por categoría">
      <p className="text-sm font-semibold text-text">Categorías</p>

      <ul className="mt-3 space-y-1">
        <li>
          <Link href={routes.catalogAllProducts} className={navLinkClass(isAllProducts)}>
            Todos los productos
          </Link>
        </li>
        {categories.map((category) => {
          const isActive =
            active !== "all-products" && active.categorySlug === category.slug;
          return (
            <li key={category.slug}>
              <Link
                href={routes.category(category.slug)}
                className={navLinkClass(isActive)}
              >
                {category.name}
                {category.productCount != null && category.productCount > 0 ? (
                  <span className="ml-1 font-normal text-text-muted">({category.productCount})</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Versión compacta horizontal para móvil */
export function CatalogSidebarMobile({ categories, active }: CatalogSidebarProps) {
  const isAllProducts = active === "all-products";

  return (
    <div className="lg:hidden">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-muted">
        Categoría
      </p>
      <div className="gallery-thumb-scroll flex gap-2 pb-1">
        <Link
          href={routes.catalogAllProducts}
          className={`shrink-0 snap-start rounded-full border px-3 py-1.5 text-sm font-medium transition ${
            isAllProducts
              ? "border-brand-600 bg-brand-50 text-brand-800"
              : "border-border bg-surface text-text-muted"
          }`}
        >
          Todos
        </Link>
        {categories.map((category) => {
          const isActive =
            active !== "all-products" && active.categorySlug === category.slug;
          return (
            <Link
              key={category.slug}
              href={routes.category(category.slug)}
              className={`shrink-0 snap-start rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                isActive
                  ? "border-brand-600 bg-brand-50 text-brand-800"
                  : "border-border bg-surface text-text-muted"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
