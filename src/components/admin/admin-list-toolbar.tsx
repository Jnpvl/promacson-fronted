"use client";

import { useEffect, useState } from "react";
import type { AdminActiveFilter, AdminListFilters } from "@/types/admin-list";

type AdminListToolbarProps = {
  filters: AdminListFilters;
  onApply: (next: Partial<AdminListFilters>) => void;
  searchPlaceholder?: string;
  mode?: "active" | "quote" | "wholesale";
};

const ACTIVE_OPTIONS: { value: AdminActiveFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "inactive", label: "Inactivos" },
];

const QUOTE_STATUS_OPTIONS = [
  { value: "all", label: "Todos los estatus" },
  { value: "NEW", label: "Solicitud nueva" },
  { value: "QUOTE_SENT", label: "Cotización enviada" },
  { value: "PURCHASED", label: "Compra realizada" },
] as const;

const WHOLESALE_STATUS_OPTIONS = [
  { value: "all", label: "Todos los estatus" },
  { value: "NEW", label: "Solicitud nueva" },
  { value: "CONTACTED", label: "Contactado" },
  { value: "CLOSED", label: "Cerrada" },
] as const;

export function AdminListToolbar({
  filters,
  onApply,
  searchPlaceholder = "Buscar por nombre…",
  mode = "active",
}: AdminListToolbarProps) {
  const [q, setQ] = useState(filters.q);

  useEffect(() => {
    setQ(filters.q);
  }, [filters.q]);

  function applySearch() {
    onApply({ q, page: 1 });
  }

  return (
    <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="min-w-0 flex-1 sm:min-w-[220px]">
        <label className="mb-1.5 block text-xs font-medium text-text-muted">Buscar</label>
        <div className="flex gap-2">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applySearch();
              }
            }}
            placeholder={searchPlaceholder}
            className="min-w-0 flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />
          <button
            type="button"
            onClick={applySearch}
            className="shrink-0 rounded-lg bg-brand-700 px-3 py-2 text-sm font-medium text-white hover:bg-brand-800"
          >
            Buscar
          </button>
        </div>
      </div>

      {mode === "quote" || mode === "wholesale" ? (
        <div className="sm:w-48">
          <label className="mb-1.5 block text-xs font-medium text-text-muted">Estatus</label>
          <select
            value={filters.status ?? "all"}
            onChange={(e) =>
              onApply({
                status: e.target.value as AdminListFilters["status"],
                page: 1,
              })
            }
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            {(mode === "wholesale" ? WHOLESALE_STATUS_OPTIONS : QUOTE_STATUS_OPTIONS).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="sm:w-40">
          <label className="mb-1.5 block text-xs font-medium text-text-muted">Estado</label>
          <select
            value={filters.active}
            onChange={(e) =>
              onApply({ active: e.target.value as AdminActiveFilter, page: 1 })
            }
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            {ACTIVE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {mode === "quote" || mode === "wholesale" ? (
        <div className="sm:w-40">
          <label className="mb-1.5 block text-xs font-medium text-text-muted">Seguimiento</label>
          <select
            value={filters.active}
            onChange={(e) =>
              onApply({ active: e.target.value as AdminActiveFilter, page: 1 })
            }
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          >
            <option value="all">Todas</option>
            <option value="active">Abiertas</option>
            <option value="inactive">Cerradas</option>
          </select>
        </div>
      ) : null}

      <div className="sm:w-28">
        <label className="mb-1.5 block text-xs font-medium text-text-muted">Por página</label>
        <select
          value={filters.pageSize}
          onChange={(e) =>
            onApply({ pageSize: Number.parseInt(e.target.value, 10), page: 1 })
          }
          className="w-full rounded-lg border border-border px-3 py-2 text-sm"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
