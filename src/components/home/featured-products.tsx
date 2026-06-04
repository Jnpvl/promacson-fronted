import Link from "next/link";
import { ProductCard } from "@/components/catalog/product-card";
import { routes } from "@/lib/routes";
import { mapProductToCard } from "@/lib/services/products.service";
import type { ProductRecord } from "@/types/product";

export function FeaturedProducts({ products }: { products: ProductRecord[] }) {
  return (
    <section className="bg-surface py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text">Productos destacados</h2>
            <p className="mt-1 text-sm text-text-muted">
              Solicita cotización para conocer disponibilidad y precio
            </p>
          </div>
          <Link
            href={routes.catalog}
            className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
          >
            Ver catálogo completo
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="mt-8 rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-text-muted">
            No hay productos destacados por el momento.
          </p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={mapProductToCard(p)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
