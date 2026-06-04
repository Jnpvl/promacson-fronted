"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MediaImage } from "@/components/ui/media-image";
import { serviceCardFrameClass, serviceCardImageClass } from "@/lib/service-image-layout";
import { routes } from "@/lib/routes";
import type { ServiceRecord } from "@/types/service";

export function ServiceList({ initialServices }: { initialServices: ServiceRecord[] }) {
  const router = useRouter();
  const [services, setServices] = useState(initialServices);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar este servicio?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      setServices((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleMove(id: string, direction: "up" | "down") {
    setMovingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      if (!res.ok) return;
      const updated = (await res.json()) as ServiceRecord[];
      setServices(updated);
      router.refresh();
    } finally {
      setMovingId(null);
    }
  }

  if (services.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-sm text-text-muted">Aún no hay servicios.</p>
        <Link
          href={routes.admin.serviceNew}
          className="mt-4 inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          Nuevo servicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
      <p className="border-b border-border px-4 py-3 text-xs text-text-muted">
        Orden en /servicios e inicio. Los inactivos no se muestran en el sitio.
      </p>
      <ul className="divide-y divide-border">
        {services.map((service, index) => {
          const isFirst = index === 0;
          const isLast = index === services.length - 1;
          return (
            <li key={service.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  aria-label="Subir"
                  disabled={isFirst || movingId === service.id}
                  onClick={() => handleMove(service.id, "up")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:bg-brand-50 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  aria-label="Bajar"
                  disabled={isLast || movingId === service.id}
                  onClick={() => handleMove(service.id, "down")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted hover:bg-brand-50 disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              <div className={`${serviceCardFrameClass.compact} w-full shrink-0 sm:h-16 sm:w-24`}>
                {service.imageUrl ? (
                  <MediaImage src={service.imageUrl} fill className={serviceCardImageClass} alt="" />
                ) : (
                  <div className="flex h-full items-center justify-center rounded-lg bg-brand-50 text-xs text-text-muted">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium text-text">{service.title}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      service.isActive ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {service.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-muted">/{service.slug}</p>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={routes.admin.serviceEdit(service.id)}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(service.id)}
                  disabled={deletingId === service.id}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === service.id ? "…" : "Eliminar"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
