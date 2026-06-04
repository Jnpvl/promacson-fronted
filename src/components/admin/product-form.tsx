"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import {
  productCardFrameClass,
  productCardImageClass,
  productGalleryFrameClass,
  productGalleryImageClass,
  productImageGuidelines,
} from "@/lib/product-image-layout";
import { routes } from "@/lib/routes";
import { adminFormClassName, adminFormFieldsGridClassName } from "@/lib/admin-form-styles";
import { SALE_MODE_OPTIONS } from "@/lib/sale-mode";
import type { CategoryRecord } from "@/types/category";
import type { ProductFormValues, ProductRecord, SaleMode } from "@/types/product";

const EMPTY_FORM: ProductFormValues = {
  name: "",
  slug: "",
  sku: "",
  description: "",
  saleMode: "BOTH",
  categoryId: "",
  imageUrls: [],
  isActive: true,
  isFeatured: false,
  metaTitle: "",
  metaDescription: "",
};

function recordToForm(product: ProductRecord): ProductFormValues {
  return {
    name: product.name,
    slug: product.slug,
    sku: product.sku ?? "",
    description: product.description ?? "",
    saleMode: product.saleMode,
    categoryId: product.categoryId,
    imageUrls: [...product.imageUrls],
    isActive: product.isActive,
    isFeatured: product.isFeatured,
    metaTitle: product.metaTitle ?? "",
    metaDescription: product.metaDescription ?? "",
  };
}

export function ProductForm({
  product,
  categories,
}: {
  product?: ProductRecord;
  categories: CategoryRecord[];
}) {
  const router = useRouter();
  const isEdit = Boolean(product);
  const [form, setForm] = useState<ProductFormValues>(product ? recordToForm(product) : EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function moveImage(index: number, direction: "up" | "down") {
    const next = [...form.imageUrls];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    const current = next[index];
    const neighbor = next[target];
    if (current === undefined || neighbor === undefined) return;
    next[index] = neighbor;
    next[target] = current;
    update("imageUrls", next);
  }

  function removeImage(index: number) {
    update(
      "imageUrls",
      form.imageUrls.filter((_, i) => i !== index),
    );
  }

  async function handleImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (!files?.length) return;

    setUploading(true);
    setError(null);

    try {
      const body = new FormData();
      for (const file of Array.from(files)) {
        body.append("images", file);
      }

      const res = await fetch("/api/admin/products/upload", { method: "POST", body });
      const data = (await res.json()) as { urls?: string[]; error?: string };

      if (!res.ok || !data.urls?.length) {
        setError(data.error ?? "No se pudieron subir las imágenes");
        return;
      }

      update("imageUrls", [...form.imageUrls, ...data.urls]);
    } catch {
      setError("No se pudieron subir las imágenes");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      name: form.name,
      slug: form.slug || undefined,
      sku: form.sku || null,
      description: form.description || null,
      saleMode: form.saleMode,
      categoryId: form.categoryId,
      imageUrls: form.imageUrls,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
    };

    try {
      const url = isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products";
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

      router.push(routes.admin.products);
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  const previewSeoTitle = form.metaTitle.trim() || form.name;
  const previewSeoDescription =
    form.metaDescription.trim() ||
    form.description.trim() ||
    (form.name ? `${form.name}. Solicita cotización en Promacson Tienda.` : "");

  return (
    <form onSubmit={handleSubmit} className={adminFormClassName}>
      <div className="grid gap-8 xl:grid-cols-2">
      <div className="space-y-8">
      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text">Datos del producto</h2>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm font-medium text-text">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => update("isActive", e.target.checked)}
              className="rounded border-border"
            />
            Activo en el sitio
          </label>

          <label className="flex items-center gap-2 text-sm font-medium text-text">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => update("isFeatured", e.target.checked)}
              className="rounded border-border"
            />
            Destacado en inicio
          </label>
        </div>

        <div className={adminFormFieldsGridClassName}>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-text">Nombre *</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Slug (opcional)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 font-mono text-sm"
            placeholder="guante-nitrilo-caja-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">SKU (opcional)</label>
          <input
            type="text"
            value={form.sku}
            onChange={(e) => update("sku", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Solo uso interno, no se muestra en la web"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Categoría *</label>
          <select
            required
            value={form.categoryId}
            onChange={(e) => update("categoryId", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Modalidad de venta *</label>
          <select
            value={form.saleMode}
            onChange={(e) => update("saleMode", e.target.value as SaleMode)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          >
            {SALE_MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-text-muted">
            Define el texto del distintivo en tarjetas (sin precios en web).
          </p>
        </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Descripción</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">SEO</h2>
          <p className="mt-1 text-sm text-text-muted">Opcional. Si está vacío, se usa el nombre y la descripción.</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Meta título</label>
          <input
            type="text"
            value={form.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
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
          <p className="mt-2 line-clamp-1 text-base font-medium text-brand-800">{previewSeoTitle}</p>
          <p className="mt-1 line-clamp-2 text-sm text-text-muted">{previewSeoDescription}</p>
        </div>
      </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5 xl:sticky xl:top-8 xl:self-start">
        <div>
          <h2 className="text-lg font-semibold text-text">Imágenes *</h2>
          <p className="mt-1 text-sm text-text-muted">
            Ideal {productImageGuidelines.idealSize} ({productImageGuidelines.ratio}).{" "}
            {productImageGuidelines.note}
          </p>
        </div>

        {form.imageUrls[0] ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Vista tarjeta (4:3, recorte)
              </p>
              <div className={productCardFrameClass + " max-w-xs rounded-lg border border-border bg-brand-50"}>
                <MediaImage
                  src={form.imageUrls[0]}
                  fill
                  className={productCardImageClass}
                  alt="Vista tarjeta"
                />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
                Vista ficha (4:3, imagen completa)
              </p>
              <div className={productGalleryFrameClass + " max-w-xs bg-brand-50"}>
                <MediaImage
                  src={form.imageUrls[0]}
                  fill
                  className={productGalleryImageClass}
                  alt="Vista ficha"
                />
              </div>
            </div>
          </div>
        ) : null}

        {form.imageUrls.length > 0 ? (
          <ul className="space-y-3">
            {form.imageUrls.map((url, index) => (
              <li
                key={`${url}-${index}`}
                className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center"
              >
                <div className={`${productCardFrameClass} w-24 shrink-0 sm:w-28`}>
                  <MediaImage src={url} fill className={productCardImageClass} alt="" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text">
                    {index === 0 ? "Portada" : `Imagen ${index + 1}`}
                  </p>
                  <p className="truncate text-xs text-text-muted">{url}</p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Subir imagen"
                    disabled={index === 0}
                    onClick={() => moveImage(index, "up")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    aria-label="Bajar imagen"
                    disabled={index === form.imageUrls.length - 1}
                    onClick={() => moveImage(index, "down")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-700 hover:bg-red-50"
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleImagesChange}
          disabled={uploading}
          className="block w-full text-sm text-text-muted file:mr-4 file:rounded-lg file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-brand-800"
        />
        {uploading ? <p className="text-sm text-text-muted">Subiendo imágenes…</p> : null}
        {!form.imageUrls.length ? (
          <p className="text-sm text-amber-700">Sube al menos una imagen para guardar el producto.</p>
        ) : null}
      </div>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={loading || !form.imageUrls.length || !form.categoryId}
        >
          {loading ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Link
          href={routes.admin.products}
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
