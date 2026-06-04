"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import {
  categoryCardFrameClass,
  categoryCardImageClass,
  categoryImageGuidelines,
} from "@/lib/category-image-layout";
import { routes } from "@/lib/routes";
import { adminFormClassName } from "@/lib/admin-form-styles";
import type { CategoryFormValues, CategoryRecord } from "@/types/category";

const EMPTY_FORM: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  imageUrl: "",
  isActive: true,
  metaTitle: "",
  metaDescription: "",
};

function recordToForm(category: CategoryRecord): CategoryFormValues {
  return {
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    imageUrl: category.imageUrl ?? "",
    isActive: category.isActive,
    metaTitle: category.metaTitle ?? "",
    metaDescription: category.metaDescription ?? "",
  };
}

export function CategoryForm({ category }: { category?: CategoryRecord }) {
  const router = useRouter();
  const isEdit = Boolean(category);
  const [form, setForm] = useState<CategoryFormValues>(category ? recordToForm(category) : EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof CategoryFormValues>(key: K, value: CategoryFormValues[K]) {
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

      const res = await fetch("/api/admin/categories/upload", { method: "POST", body });
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
      name: form.name,
      slug: form.slug || undefined,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      isActive: form.isActive,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
    };

    try {
      const url = isEdit ? `/api/admin/categories/${category!.id}` : "/api/admin/categories";
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

      router.push(routes.admin.categories);
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  const previewSrc = form.imageUrl || null;
  const previewSeoTitle =
    form.metaTitle.trim() || (form.name ? `${form.name} | Promacson Tienda` : "");
  const previewSeoDescription =
    form.metaDescription.trim() ||
    form.description.trim() ||
    (form.name
      ? `Explora ${form.name} en el catálogo de insumos médicos Promacson. Solicita cotización.`
      : "");

  return (
    <form onSubmit={handleSubmit} className={adminFormClassName}>
      <div className="grid gap-8 xl:grid-cols-2">
      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text">Datos de la categoría</h2>

        <label className="flex items-center gap-2 text-sm font-medium text-text">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
            className="rounded border-border"
          />
          Activa en el sitio
        </label>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Nombre *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Ej. Apósitos hidrocoloides"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">
            Slug (opcional)
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-mono"
            placeholder="apositos-hidrocoloides"
          />
          <p className="mt-1 text-xs text-text-muted">
            Si lo dejas vacío, se genera desde el nombre. URL: /catalogo/[slug]
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Descripción</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Texto visible en la tarjeta y página de categoría."
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">Imagen *</h2>
          <p className="mt-1 text-sm text-text-muted">
            Ideal {categoryImageGuidelines.idealSize} ({categoryImageGuidelines.ratio}). Mínimo{" "}
            {categoryImageGuidelines.minSize}. {categoryImageGuidelines.note}
          </p>
        </div>

        {previewSrc ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Vista inicio (4:3)
              </p>
              <div className={categoryCardFrameClass.compact + " rounded-lg border border-border bg-brand-50"}>
                <MediaImage
                  src={previewSrc}
                  fill
                  className={categoryCardImageClass}
                  alt="Vista previa inicio"
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Vista catálogo (16:10)
              </p>
              <div className={categoryCardFrameClass.default + " rounded-lg border border-border bg-brand-50"}>
                <MediaImage
                  src={previewSrc}
                  fill
                  className={categoryCardImageClass}
                  alt="Vista previa catálogo"
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
          <p className="text-sm text-amber-700">Sube una imagen para poder guardar la categoría.</p>
        ) : null}
      </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">SEO</h2>
          <p className="mt-1 text-sm text-text-muted">
            Opcional. Si los dejas vacíos, el sitio usa el nombre y la descripción de la categoría.
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Meta título</label>
          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Ej. Apósitos hidrocoloides | Promacson Tienda"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Meta descripción</label>
          <textarea
            rows={2}
            value={form.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            maxLength={500}
          />
        </div>

        <div className="rounded-lg border border-dashed border-border bg-surface-muted/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Vista previa SEO</p>
          <p className="mt-2 text-base font-medium text-brand-800 line-clamp-1">{previewSeoTitle}</p>
          <p className="mt-1 text-sm text-text-muted line-clamp-2">{previewSeoDescription}</p>
        </div>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={loading || !form.imageUrl}>
          {loading ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear categoría"}
        </Button>
        <Link
          href={routes.admin.categories}
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
