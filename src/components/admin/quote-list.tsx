"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminListToolbar } from "@/components/admin/admin-list-toolbar";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { useAdminList } from "@/hooks/use-admin-list";
import type { QuoteRecord, QuoteStatus } from "@/types/quote";

const STATUS_OPTIONS: { value: QuoteStatus; label: string }[] = [
  { value: "NEW", label: "Solicitud nueva" },
  { value: "QUOTE_SENT", label: "Cotización enviada" },
  { value: "PURCHASED", label: "Compra realizada" },
];

function statusBadgeClass(status: QuoteStatus): string {
  if (status === "PURCHASED") return "bg-green-50 text-green-800";
  if (status === "QUOTE_SENT") return "bg-blue-50 text-blue-800";
  return "bg-amber-50 text-amber-900";
}

function QuoteListInner() {
  const router = useRouter();
  const { filters, data, loading, setFilters, refetch } = useAdminList<QuoteRecord>(
    "/api/admin/quotes",
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const quotes = data?.items ?? [];

  async function handleStatusChange(id: string, status: QuoteStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/quotes/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) return;
      await refetch();
      router.refresh();
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <>
      <AdminListToolbar
        filters={filters}
        onApply={setFilters}
        mode="quote"
        searchPlaceholder="Nombre, folio, correo o teléfono…"
      />

      {loading ? (
        <p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>
      ) : quotes.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-text-muted">
          {filters.q || filters.active !== "all" || (filters.status && filters.status !== "all")
            ? "No hay cotizaciones con esos filtros."
            : "Aún no hay solicitudes de cotización."}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {quotes.map((quote) => (
            <article
              key={quote.id}
              className="rounded-xl border border-border bg-surface p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-text">{quote.customerName}</p>
                    {quote.folio ? (
                      <span className="text-xs font-mono text-text-muted">{quote.folio}</span>
                    ) : null}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(quote.status)}`}
                    >
                      {quote.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text-muted">
                    {[quote.email, quote.phone].filter(Boolean).join(" · ") || "Sin contacto"}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {new Date(quote.submittedAt ?? quote.createdAt).toLocaleString("es-MX")}
                  </p>
                </div>

                <div className="shrink-0">
                  <label className="mb-1 block text-xs font-medium text-text-muted">Estatus</label>
                  <select
                    value={quote.status}
                    disabled={updatingId === quote.id}
                    onChange={(e) => handleStatusChange(quote.id, e.target.value as QuoteStatus)}
                    className="rounded-lg border border-border px-3 py-2 text-sm"
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <ul className="mt-4 divide-y divide-border rounded-lg border border-border text-sm">
                {quote.lines.map((line) => (
                  <li key={line.id} className="flex flex-wrap justify-between gap-2 px-3 py-2">
                    <span>
                      {line.productName}{" "}
                      <span className="text-text-muted">({line.saleModeLabel})</span>
                    </span>
                    <span className="font-medium">× {line.quantity}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {data ? (
            <div className="overflow-hidden rounded-xl border border-border bg-surface">
              <AdminPagination
                page={data.page}
                pageSize={data.pageSize}
                total={data.total}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export function QuoteList() {
  return (
    <Suspense fallback={<p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>}>
      <QuoteListInner />
    </Suspense>
  );
}
