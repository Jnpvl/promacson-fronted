"use client";

import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminListToolbar } from "@/components/admin/admin-list-toolbar";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { useAdminList } from "@/hooks/use-admin-list";
import type { WholesaleInquiryRecord, WholesaleStatus } from "@/types/wholesale-inquiry";

const STATUS_OPTIONS: { value: WholesaleStatus; label: string }[] = [
  { value: "NEW", label: "Solicitud nueva" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "CLOSED", label: "Cerrada" },
];

function statusBadgeClass(status: WholesaleStatus): string {
  if (status === "CLOSED") return "bg-green-50 text-green-800";
  if (status === "CONTACTED") return "bg-blue-50 text-blue-800";
  return "bg-amber-50 text-amber-900";
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value?.trim()) return null;
  return (
    <p className="text-sm">
      <span className="text-text-muted">{label}: </span>
      <span className="text-text">{value}</span>
    </p>
  );
}

function WholesaleListInner() {
  const router = useRouter();
  const { filters, data, loading, setFilters, refetch } = useAdminList<WholesaleInquiryRecord>(
    "/api/admin/wholesale",
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const inquiries = data?.items ?? [];

  async function handleStatusChange(id: string, status: WholesaleStatus) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/wholesale/${id}/status`, {
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
        mode="wholesale"
        searchPlaceholder="Institución, contacto, folio o correo…"
      />

      {loading ? (
        <p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>
      ) : inquiries.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center text-sm text-text-muted">
          {filters.q || filters.active !== "all" || (filters.status && filters.status !== "all")
            ? "No hay solicitudes con esos filtros."
            : "Aún no hay solicitudes de mayoreo."}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {inquiries.map((inquiry) => (
            <article
              key={inquiry.id}
              className="rounded-xl border border-border bg-surface p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-text">{inquiry.institution}</p>
                    {inquiry.folio ? (
                      <span className="font-mono text-xs text-text-muted">{inquiry.folio}</span>
                    ) : null}
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(inquiry.status)}`}
                    >
                      {inquiry.statusLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-text">
                    {inquiry.customerName}
                    <span className="text-text-muted"> · {inquiry.clientTypeLabel}</span>
                  </p>
                  <p className="mt-1 text-sm text-text-muted">
                    {[inquiry.email, inquiry.phone].filter(Boolean).join(" · ") || "Sin contacto"}
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    {new Date(inquiry.submittedAt ?? inquiry.createdAt).toLocaleString("es-MX")}
                  </p>
                </div>

                <div className="shrink-0">
                  <label className="mb-1 block text-xs font-medium text-text-muted">Estatus</label>
                  <select
                    value={inquiry.status}
                    disabled={updatingId === inquiry.id}
                    onChange={(e) =>
                      handleStatusChange(inquiry.id, e.target.value as WholesaleStatus)
                    }
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

              <div className="mt-4 space-y-1 rounded-lg border border-border bg-surface-muted/40 px-3 py-3">
                <DetailRow label="Volumen" value={inquiry.volume} />
                <DetailRow label="Interés" value={inquiry.interest} />
                <DetailRow label="Comentarios" value={inquiry.message} />
              </div>
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

export function WholesaleList() {
  return (
    <Suspense fallback={<p className="mt-8 text-center text-sm text-text-muted">Cargando…</p>}>
      <WholesaleListInner />
    </Suspense>
  );
}
