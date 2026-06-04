"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import {
  serviceCardFrameClass,
  serviceCardImageClass,
  serviceImageGuidelines,
} from "@/lib/service-image-layout";
import { routes } from "@/lib/routes";
import { adminFormClassName } from "@/lib/admin-form-styles";
import type { ServiceContactType, ServiceFormValues, ServiceRecord } from "@/types/service";

const EMPTY_FORM: ServiceFormValues = {
  title: "",
  slug: "",
  description: "",
  body: "",
  imageUrl: "",
  href: "",
  contactType: "",
  contactValue: "",
  isActive: true,
  metaTitle: "",
  metaDescription: "",
};

const CONTACT_TYPE_OPTIONS: { value: ServiceContactType; label: string; placeholder: string }[] = [
  { value: "phone", label: "Teléfono", placeholder: "+52 662 123 4567" },
  { value: "email", label: "Correo", placeholder: "contacto@ejemplo.com" },
  { value: "whatsapp", label: "WhatsApp", placeholder: "+52 662 123 4567" },
];

function recordToForm(service: ServiceRecord): ServiceFormValues {
  return {
    title: service.title,
    slug: service.slug,
    description: service.description ?? "",
    body: service.body ?? "",
    imageUrl: service.imageUrl ?? "",
    href: service.href ?? "",
    contactType: service.contactType ?? "",
    contactValue: service.contactValue ?? "",
    isActive: service.isActive,
    metaTitle: service.metaTitle ?? "",
    metaDescription: service.metaDescription ?? "",
  };
}

export function ServiceForm({ service }: { service?: ServiceRecord }) {
  const router = useRouter();
  const isEdit = Boolean(service);
  const [form, setForm] = useState<ServiceFormValues>(service ? recordToForm(service) : EMPTY_FORM);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function update<K extends keyof ServiceFormValues>(key: K, value: ServiceFormValues[K]) {
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

      const res = await fetch("/api/admin/services/upload", { method: "POST", body });
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
      title: form.title,
      slug: form.slug || undefined,
      description: form.description || null,
      body: form.body || null,
      imageUrl: form.imageUrl || null,
      href: form.href || null,
      contactType: form.contactType || null,
      contactValue: form.contactValue || null,
      isActive: form.isActive,
      metaTitle: form.metaTitle || null,
      metaDescription: form.metaDescription || null,
    };

    try {
      const url = isEdit ? `/api/admin/services/${service!.id}` : "/api/admin/services";
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

      router.push(routes.admin.services);
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  const previewSrc = form.imageUrl || null;
  const previewSeoTitle = form.metaTitle.trim() || form.title;
  const previewSeoDescription =
    form.metaDescription.trim() ||
    form.description.trim() ||
    (form.title ? `${form.title}. Conoce este servicio de Promacson Tienda.` : "");
  const contactOption = CONTACT_TYPE_OPTIONS.find((option) => option.value === form.contactType);

  return (
    <form onSubmit={handleSubmit} className={adminFormClassName}>
      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text">Datos del servicio</h2>

        <label className="flex items-center gap-2 text-sm font-medium text-text">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => update("isActive", e.target.checked)}
            className="rounded border-border"
          />
          Activo en el sitio
        </label>

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
          <label className="mb-1.5 block text-sm font-medium text-text">Slug (opcional)</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 font-mono text-sm"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Resumen</label>
          <textarea
            rows={2}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Texto corto para tarjetas y listados."
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Contenido (página de detalle)</label>
          <textarea
            rows={5}
            value={form.body}
            onChange={(e) => update("body", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="Descripción ampliada, horarios, condiciones…"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Enlace externo (opcional)</label>
          <input
            type="url"
            value={form.href}
            onChange={(e) => update("href", e.target.value)}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
            placeholder="https://…"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">Botón de contacto (opcional)</h2>
          <p className="mt-1 text-sm text-text-muted">
            Muestra un botón en la página del servicio. Deja el tipo vacío para ocultarlo.
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Tipo de contacto</label>
          <select
            value={form.contactType}
            onChange={(e) => {
              const value = e.target.value as ServiceContactType | "";
              update("contactType", value);
              if (!value) update("contactValue", "");
            }}
            className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
          >
            <option value="">Sin botón de contacto</option>
            {CONTACT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {form.contactType ? (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">
              {contactOption?.label ?? "Valor"} *
            </label>
            <input
              type={form.contactType === "email" ? "email" : "text"}
              required
              value={form.contactValue}
              onChange={(e) => update("contactValue", e.target.value)}
              className="w-full rounded-lg border border-border px-4 py-2.5 text-sm"
              placeholder={contactOption?.placeholder}
            />
          </div>
        ) : null}
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-text">Imagen (opcional)</h2>
          <p className="mt-1 text-sm text-text-muted">
            Ideal {serviceImageGuidelines.idealSize} ({serviceImageGuidelines.ratio}). Sin imagen se usa
            gradiente de marca.
          </p>
        </div>

        {previewSrc ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">Inicio (4:3)</p>
              <div className={serviceCardFrameClass.compact + " rounded-lg border border-border bg-brand-50"}>
                <MediaImage src={previewSrc} fill className={serviceCardImageClass} alt="" />
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">Listado (16:10)</p>
              <div className={serviceCardFrameClass.default + " rounded-lg border border-border bg-brand-50"}>
                <MediaImage src={previewSrc} fill className={serviceCardImageClass} alt="" />
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
      </div>

      <div className="rounded-xl border border-border bg-surface p-6 space-y-5">
        <h2 className="text-lg font-semibold text-text">SEO</h2>
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

      {error ? (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Guardando…" : isEdit ? "Guardar cambios" : "Crear servicio"}
        </Button>
        <Link
          href={routes.admin.services}
          className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
