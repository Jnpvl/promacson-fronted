"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import {
  heroSlideImageClass,
  heroSlideImageGuidelines,
} from "@/lib/hero-slide-layout";
import { routes } from "@/lib/routes";
import type { SliderFormValues, SliderRecord } from "@/types/hero-slide";
import { adminFormClassName } from "@/lib/admin-form-styles";

const EMPTY_FORM: SliderFormValues = {
  isActive: true,
  eyebrow: "",
  title: "",
  description: "",
  imageUrl: "",
  hasPrimaryCta: false,
  primaryCtaLabel: "",
  primaryCtaHref: "",
  hasSecondaryCta: false,
  secondaryCtaLabel: "",
  secondaryCtaHref: "",
};

function recordToForm(slider: SliderRecord): SliderFormValues {
  return {
    isActive: slider.isActive,
    eyebrow: slider.eyebrow ?? "",
    title: slider.title,
    description: slider.description ?? "",
    imageUrl: slider.imageUrl,
    hasPrimaryCta: slider.hasPrimaryCta,
    primaryCtaLabel: slider.primaryCtaLabel ?? "",
    primaryCtaHref: slider.primaryCtaHref ?? "",
    hasSecondaryCta: slider.hasSecondaryCta,
    secondaryCtaLabel: slider.secondaryCtaLabel ?? "",
    secondaryCtaHref: slider.secondaryCtaHref ?? "",
  };
}

export function SliderForm({ slider }: { slider?: SliderRecord }) {
  const router = useRouter();
  const isEdit = Boolean(slider);
  const [form, setForm] = useState<SliderFormValues>(slider ? recordToForm(slider) : EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof SliderFormValues>(key: K, value: SliderFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("image", file);

      const res = await fetch("/api/admin/sliders/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "No se pudo subir la imagen");
        return;
      }

      update("imageUrl", data.url);
    } catch {
      setError("No se pudo subir la imagen");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      ...form,
      eyebrow: form.eyebrow || null,
      description: form.description || null,
      primaryCtaLabel: form.hasPrimaryCta ? form.primaryCtaLabel : null,
      primaryCtaHref: form.hasPrimaryCta ? form.primaryCtaHref : null,
      secondaryCtaLabel: form.hasSecondaryCta ? form.secondaryCtaLabel : null,
      secondaryCtaHref: form.hasSecondaryCta ? form.secondaryCtaHref : null,
    };

    try {
      const url = isEdit ? `/api/admin/sliders/${slider!.id}` : "/api/admin/sliders";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "No se pudo guardar");
        return;
      }

      router.push(routes.admin.sliders);
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  const previewSrc = form.imageUrl || null;

  return (
    <form onSubmit={handleSubmit} className={adminFormClassName}>
      <div className="grid gap-8 xl:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text">Contenido</h2>

        <div className="flex items-center">
          <label className="flex items-center gap-2 text-sm font-medium text-text">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => update("isActive", e.target.checked)}
              className="rounded border-border"
            />
            Activo en el sitio
          </label>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Antetítulo (opcional)</label>
          <input
            type="text"
            value={form.eyebrow}
            onChange={(e) => update("eyebrow", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Ej. Distribución médica en México"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Título *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Descripción (opcional)</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">Imagen de fondo *</h2>
          <p className="mt-1 text-sm text-text-muted">
            Ideal {heroSlideImageGuidelines.idealSize} ({heroSlideImageGuidelines.ratio}). Mínimo{" "}
            {heroSlideImageGuidelines.minSize}. {heroSlideImageGuidelines.safeZone}
          </p>
        </div>

        {previewSrc ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Vista móvil (4:3)
              </p>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-brand-50">
                <MediaImage
                  src={previewSrc}
                  fill
                  className={heroSlideImageClass}
                  alt="Vista previa móvil"
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Vista escritorio (8:3)
              </p>
              <div className="relative aspect-[8/3] w-full overflow-hidden rounded-lg border border-border bg-brand-50">
                <MediaImage
                  src={previewSrc}
                  fill
                  className={heroSlideImageClass}
                  alt="Vista previa escritorio"
                />
              </div>
            </div>
          </div>
        ) : null}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImageChange}
          disabled={uploading}
          className="block w-full text-sm text-text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-800"
        />
        {uploading ? <p className="text-sm text-text-muted">Subiendo imagen…</p> : null}
        {!form.imageUrl ? (
          <p className="text-sm text-amber-700">Sube una imagen para poder guardar el slider.</p>
        ) : null}
      </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-text">Botones del banner</h2>
          <p className="mt-1 text-sm text-text-muted">
            Opcional. Si no activas ninguno, el slide solo muestra imagen y textos (sin enlaces).
          </p>
        </div>

        <fieldset className="space-y-4 rounded-lg border border-border bg-surface-muted/40 p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-text">
            <input
              type="checkbox"
              checked={form.hasPrimaryCta}
              onChange={(e) => {
                const checked = e.target.checked;
                update("hasPrimaryCta", checked);
                if (!checked) update("hasSecondaryCta", false);
              }}
              className="rounded border-border"
            />
            Botón principal
          </label>

          <div className={`grid gap-4 sm:grid-cols-2 ${form.hasPrimaryCta ? "" : "opacity-50"}`}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">
                Texto del botón
              </label>
              <input
                type="text"
                disabled={!form.hasPrimaryCta}
                required={form.hasPrimaryCta}
                value={form.primaryCtaLabel}
                onChange={(e) => update("primaryCtaLabel", e.target.value)}
                placeholder="Ej. Explorar catálogo"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">
                Enlace del botón
              </label>
              <input
                type="text"
                disabled={!form.hasPrimaryCta}
                required={form.hasPrimaryCta}
                value={form.primaryCtaHref}
                onChange={(e) => update("primaryCtaHref", e.target.value)}
                placeholder="/catalogo"
                list="slider-route-suggestions"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm disabled:cursor-not-allowed"
              />
              <p className="mt-1 text-xs text-text-muted">
                Ruta interna del sitio. Ej: <code>/catalogo</code>, <code>/cotizacion</code>
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4 rounded-lg border border-border bg-surface-muted/40 p-4">
          <label className="flex items-center gap-2 text-sm font-medium text-text">
            <input
              type="checkbox"
              checked={form.hasSecondaryCta}
              disabled={!form.hasPrimaryCta}
              onChange={(e) => update("hasSecondaryCta", e.target.checked)}
              className="rounded border-border"
            />
            Botón secundario
          </label>

          <div className={`grid gap-4 sm:grid-cols-2 ${form.hasSecondaryCta ? "" : "opacity-50"}`}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">
                Texto del botón
              </label>
              <input
                type="text"
                disabled={!form.hasSecondaryCta}
                required={form.hasSecondaryCta}
                value={form.secondaryCtaLabel}
                onChange={(e) => update("secondaryCtaLabel", e.target.value)}
                placeholder="Ej. Solicitar cotización"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">
                Enlace del botón
              </label>
              <input
                type="text"
                disabled={!form.hasSecondaryCta}
                required={form.hasSecondaryCta}
                value={form.secondaryCtaHref}
                onChange={(e) => update("secondaryCtaHref", e.target.value)}
                placeholder="/cotizacion"
                list="slider-route-suggestions"
                className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </fieldset>

        <datalist id="slider-route-suggestions">
          <option value={routes.home} />
          <option value={routes.catalog} />
          <option value={routes.quote} />
          <option value={routes.wholesale} />
          <option value={routes.about} />
          <option value={routes.services} />
        </datalist>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={loading || !form.imageUrl}>
          {loading ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear slider"}
        </Button>
        <Link
          href={routes.admin.sliders}
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
