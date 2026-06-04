"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminListToolbar } from "@/components/admin/admin-list-toolbar";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { MediaImage } from "@/components/ui/media-image";
import { useAdminList } from "@/hooks/use-admin-list";
import { productCardFrameClass, productCardImageClass } from "@/lib/product-image-layout";
import { routes } from "@/lib/routes";
import type { ProductRecord } from "@/types/product";

function ProductListInner() {
  const router = useRouter();
  const { filters, data, loading, setFilters, refetch } = useAdminList<ProductRecord>(
    "/api/admin/products",
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const products = data?.items ?? [];

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar este producto?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      await refetch();
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <AdminListToolbar
        filters={filters}
        onApply={setFilters}
        searchPlaceholder="Nombre, SKU o categoría…"
      />

      {loading ? (
        <p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>
      ) : products.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-sm text-text-muted">
            {filters.q || filters.active !== "all"
              ? "No hay productos con esos filtros."
              : "Aún no hay productos en el catálogo."}
          </p>
          {!filters.q && filters.active === "all" ? (
            <Link
              href={routes.admin.productNew}
              className="mt-4 inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
            >
              Nuevo producto
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
          <ul className="divide-y divide-border">
            {products.map((product) => (
              <li key={product.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <div className={`${productCardFrameClass} w-20 shrink-0 sm:w-24`}>
                  {product.coverImageUrl ? (
                    <MediaImage
                      src={product.coverImageUrl}
                      fill
                      className={productCardImageClass}
                      alt=""
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-lg bg-brand-50 text-xs text-text-muted">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-text">{product.name}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        product.isActive ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.isActive ? "Activo" : "Inactivo"}
                    </span>
                    {product.isFeatured ? (
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-800">
                        Destacado
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs text-text-muted">
                    /{product.slug} · {product.categoryName} · {product.badge}
                    {product.sku ? ` · SKU ${product.sku}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {product.imageUrls.length} imagen{product.imageUrls.length === 1 ? "" : "es"}
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Link
                    href={routes.admin.productEdit(product.id)}
                    className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === product.id ? "…" : "Eliminar"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {data ? (
            <AdminPagination
              page={data.page}
              pageSize={data.pageSize}
              total={data.total}
              totalPages={data.totalPages}
              onPageChange={(page) => setFilters({ page })}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export function ProductList() {
  return (
    <Suspense fallback={<p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>}>
      <ProductListInner />
    </Suspense>
  );
}
