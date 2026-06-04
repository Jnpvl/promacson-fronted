"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MediaImage } from "@/components/ui/media-image";
import { routes } from "@/lib/routes";
import type { SliderRecord } from "@/types/hero-slide";

export function SliderList({ initialSliders }: { initialSliders: SliderRecord[] }) {
  const router = useRouter();
  const [sliders, setSliders] = useState(initialSliders);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [movingId, setMovingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!window.confirm("¿Eliminar este slider?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/sliders/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      setSliders((prev) => prev.filter((s) => s.id !== id));
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  }

  async function handleMove(id: string, direction: "up" | "down") {
    setMovingId(id);
    try {
      const res = await fetch(`/api/admin/sliders/${id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      if (!res.ok) return;
      const updated = (await res.json()) as SliderRecord[];
      setSliders(updated);
      router.refresh();
    } finally {
      setMovingId(null);
    }
  }

  if (sliders.length === 0) {
    return (
      <div className="mt-8 rounded-xl border border-dashed border-border bg-surface p-10 text-center">
        <p className="text-sm text-text-muted">Aún no hay sliders. Crea el primero para el inicio.</p>
        <Link
          href={routes.admin.sliderNew}
          className="mt-4 inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          Nuevo slider
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface">
      <p className="border-b border-border px-4 py-3 text-xs text-text-muted">
        Usa las flechas para cambiar el orden en el carrusel del inicio.
      </p>
      <ul className="divide-y divide-border">
        {sliders.map((slider, index) => {
          const isFirst = index === 0;
          const isLast = index === sliders.length - 1;
          const isMoving = movingId === slider.id;

          return (
            <li key={slider.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex shrink-0 flex-col gap-1">
                <button
                  type="button"
                  aria-label="Subir"
                  disabled={isFirst || isMoving}
                  onClick={() => handleMove(slider.id, "up")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition hover:bg-brand-50 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  aria-label="Bajar"
                  disabled={isLast || isMoving}
                  onClick={() => handleMove(slider.id, "down")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition hover:bg-brand-50 hover:text-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg bg-brand-50 sm:h-16 sm:w-36">
                {slider.imageUrl ? (
                  <MediaImage src={slider.imageUrl} fill className="object-center" alt="" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-text-muted">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-text-muted">#{index + 1}</span>
                  <p className="font-medium text-text">{slider.title}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      slider.isActive ? "bg-green-50 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {slider.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>
                {slider.eyebrow ? (
                  <p className="mt-1 truncate text-sm text-text-muted">{slider.eyebrow}</p>
                ) : null}
                <p className="mt-1 text-xs text-text-muted">
                  {slider.hasPrimaryCta || slider.hasSecondaryCta ? "Con botones" : "Solo visual"}
                </p>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={routes.admin.sliderEdit(slider.id)}
                  className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(slider.id)}
                  disabled={deletingId === slider.id}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === slider.id ? "…" : "Eliminar"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
