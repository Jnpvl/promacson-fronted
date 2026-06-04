"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminListToolbar } from "@/components/admin/admin-list-toolbar";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { MediaImage } from "@/components/ui/media-image";
import { useAdminList } from "@/hooks/use-admin-list";
import { categoryCardFrameClass, categoryCardImageClass } from "@/lib/category-image-layout";
import { routes } from "@/lib/routes";
import type { CategoryRecord } from "@/types/category";

function CategoryListInner() {
  const router = useRouter();
  const { filters, data, loading, setFilters, refetch } = useAdminList<CategoryRecord>(
    "/api/admin/categories",
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  const categories = data?.items ?? [];

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar esta categoría?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      await refetch();
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleMove(id: string, direction: "up" | "down") {
    setMovingId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      if (!res.ok) return;
      await refetch();
      router.refresh();
    } finally {
      setMovingId(null);
    }
  }

  return (
    <>
      <AdminListToolbar
        filters={filters}
        onApply={setFilters}
        searchPlaceholder="Nombre o slug de categoría…"
      />

      {loading ? (
        <p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>
      ) : categories.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
          <p className="text-sm text-text-muted">
            {filters.q || filters.active !== "all"
              ? "No hay categorías con esos filtros."
              : "Aún no hay categorías. Crea la primera para el catálogo e inicio."}
          </p>
          {!filters.q && filters.active === "all" ? (
            <Link
              href={routes.admin.categoryNew}
              className="mt-4 inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
            >
              Nueva categoría
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
          <p className="border-b border-border px-4 py-3 text-xs text-text-muted">
            Orden global en catálogo e inicio. Las inactivas no se muestran en el sitio.
          </p>
          <ul className="divide-y divide-border">
            {categories.map((category) => {
              const isMoving = movingId === category.id;

              return (
                <li key={category.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                  <div className="flex shrink-0 flex-col gap-1">
                    <button
                      type="button"
                      aria-label="Subir"
                      disabled={isMoving}
                      onClick={() => handleMove(category.id, "up")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition hover:bg-brand-50 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Bajar"
                      disabled={isMoving}
                      onClick={() => handleMove(category.id, "down")}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition hover:bg-brand-50 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>

                  <div className={`${categoryCardFrameClass.compact} w-full shrink-0 sm:h-16 sm:w-24`}>
                    {category.imageUrl ? (
                      <MediaImage src={category.imageUrl} fill className={categoryCardImageClass} alt="" />
                    ) : (
                      <div className="flex h-full items-center justify-center rounded-lg bg-brand-50 text-xs text-text-muted">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-text-muted">
                        #{category.sortOrder + 1}
                      </span>
                      <p className="font-medium text-text">{category.name}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          category.isActive ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category.isActive ? "Activa" : "Inactiva"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-text-muted">
                      /{category.slug} · {category.productCount} producto
                      {category.productCount === 1 ? "" : "s"}
                    </p>
                    {category.description ? (
                      <p className="mt-1 line-clamp-2 text-sm text-text-muted">{category.description}</p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={routes.admin.categoryEdit(category.id)}
                      className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
                      disabled={deletingId === category.id}
                      className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === category.id ? "…" : "Eliminar"}
                    </button>
                  </div>
                </li>
              );
            })}
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

export function CategoryList() {
  return (
    <Suspense fallback={<p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>}>
      <CategoryListInner />
    </Suspense>
  );
}
