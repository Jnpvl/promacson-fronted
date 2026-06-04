import type { Metadata } from "next";
import Link from "next/link";
import { ProductList } from "@/components/admin/product-list";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Productos",
};

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text">Productos</h1>
          <p className="mt-2 text-sm text-text-muted">
            Catálogo por categoría. Varias imágenes; la primera es portada. Sin precios en web.
          </p>
        </div>
        <Link
          href={routes.admin.productNew}
          className="inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          Nuevo producto
        </Link>
      </div>

      <ProductList />
    </div>
  );
}
