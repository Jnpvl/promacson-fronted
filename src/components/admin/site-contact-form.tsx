"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SiteContact, SiteContactFormValues } from "@/types/site-contact";

function contactToForm(contact: SiteContact): SiteContactFormValues {
  return {
    phone: contact.phone,
    phoneE164: contact.phoneE164,
    email: contact.email,
    whatsapp: contact.whatsapp,
    address: contact.address ?? "",
    businessHours: contact.businessHours ?? "",
    facebookUrl: contact.facebookUrl ?? "",
  };
}

export function SiteContactForm({ initialContact }: { initialContact: SiteContact }) {
  const [form, setForm] = useState<SiteContactFormValues>(contactToForm(initialContact));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function update<K extends keyof SiteContactFormValues>(key: K, value: SiteContactFormValues[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSuccess(null);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/admin/site/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          address: form.address.trim() || null,
          businessHours: form.businessHours.trim() || null,
          facebookUrl: form.facebookUrl.trim() || null,
        }),
      });

      const data = (await res.json()) as SiteContact & { error?: string };

      if (!res.ok) {
        setError(data.error ?? "No se pudo guardar");
        return;
      }

      setForm(contactToForm(data));
      setSuccess("Contacto del sitio actualizado.");
    } catch {
      setError("No se pudo guardar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full space-y-6">
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <fieldset className="space-y-4 rounded-xl border border-border bg-surface p-5">
        <legend className="px-1 text-sm font-semibold text-text">Teléfono y WhatsApp</legend>

        <label className="block">
          <span className="text-sm font-medium text-text">Teléfono (visible)</span>
          <input
            type="text"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="662 450 1230"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text">Teléfono E.164</span>
          <span className="mt-0.5 block text-xs text-text-muted">
            Formato internacional con + para enlaces tel:
          </span>
          <input
            type="text"
            required
            value={form.phoneE164}
            onChange={(e) => update("phoneE164", e.target.value)}
            placeholder="+526624501230"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text">WhatsApp (solo dígitos)</span>
          <span className="mt-0.5 block text-xs text-text-muted">
            Sin + ni espacios. Ej. 526624501230
          </span>
          <input
            type="text"
            required
            value={form.whatsapp}
            onChange={(e) => update("whatsapp", e.target.value.replace(/\D/g, ""))}
            placeholder="526624501230"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border border-border bg-surface p-5">
        <legend className="px-1 text-sm font-semibold text-text">Correo y ubicación</legend>

        <label className="block">
          <span className="text-sm font-medium text-text">Correo electrónico</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="ventas@promacson.mx"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text">Dirección</span>
          <textarea
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            rows={3}
            placeholder="C. Benito Juárez 177, Constitución, 83150 Hermosillo, Son."
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text">Horario de atención</span>
          <input
            type="text"
            value={form.businessHours}
            onChange={(e) => update("businessHours", e.target.value)}
            placeholder="Lun–Vie 9:00–18:00"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>
      </fieldset>

      <fieldset className="space-y-4 rounded-xl border border-border bg-surface p-5">
        <legend className="px-1 text-sm font-semibold text-text">Redes sociales</legend>

        <label className="block">
          <span className="text-sm font-medium text-text">Facebook</span>
          <span className="mt-0.5 block text-xs text-text-muted">
            URL completa. Déjalo vacío si aún no tienes página; podrás agregarla después.
          </span>
          <input
            type="url"
            value={form.facebookUrl}
            onChange={(e) => update("facebookUrl", e.target.value)}
            placeholder="https://facebook.com/promacson"
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>
      </fieldset>
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      ) : null}

      {success ? (
        <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {success}
        </p>
      ) : null}

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando…" : "Guardar cambios"}
      </Button>
    </form>
  );
}
