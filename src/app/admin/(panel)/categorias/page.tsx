import type { Metadata } from "next";
import Link from "next/link";
import { CategoryList } from "@/components/admin/category-list";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Categorías",
};

export default function AdminCategoriesPage() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text">Categorías</h1>
          <p className="mt-2 text-sm text-text-muted">
            Catálogo plano (sin categoría padre). Imagen 4:3 en inicio y 16:10 en listado.
          </p>
        </div>
        <Link
          href={routes.admin.categoryNew}
          className="inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          Nueva categoría
        </Link>
      </div>

      <CategoryList />
    </div>
  );
}
