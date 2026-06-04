"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "@/contexts/quote-cart-context";
import { showFormErrorAlert, showFormSuccessAlert } from "@/lib/form-feedback";
import { routes } from "@/lib/routes";

export function QuoteCartView() {
  const { items, setQuantity, removeProduct, clearCart } = useQuoteCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!name.trim()) {
      await showFormErrorAlert("El nombre es obligatorio", "Revisa tus datos");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      await showFormErrorAlert("Indica un correo o un teléfono de contacto", "Revisa tus datos");
      return;
    }
    if (!items.length) {
      await showFormErrorAlert("Agrega productos desde el catálogo", "Cotización vacía");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          lines: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await res.json()) as { error?: string; folio?: string };
      if (!res.ok) {
        await showFormErrorAlert(data.error ?? "No se pudo enviar la solicitud");
        return;
      }

      clearCart();
      setName("");
      setEmail("");
      setPhone("");
      await showFormSuccessAlert({
        message: "Un vendedor te contactará pronto con tu propuesta.",
        folio: data.folio ?? null,
      });
    } catch {
      await showFormErrorAlert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-muted/50 p-10 text-center">
            <p className="text-sm text-text-muted">Tu cotización está vacía.</p>
            <Button href={routes.catalog} className="mt-4">
              Explorar catálogo
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-muted text-text-muted">
                <tr>
                  <th className="px-4 py-3">Producto</th>
                  <th className="px-4 py-3">Presentación</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Cantidad</th>
                  <th className="px-4 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.productId} className="border-t border-border">
                    <td className="px-4 py-3">
                      <Link href={routes.product(item.slug)} className="font-medium hover:text-brand-700">
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-text-muted">{item.badge}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div className="inline-flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          aria-label="Menos"
                          className="px-3 py-1.5 text-brand-700 hover:bg-brand-50"
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] px-2 text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Más"
                          className="px-3 py-1.5 text-brand-700 hover:bg-brand-50"
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:justify-end">
                        <div className="inline-flex items-center rounded-lg border border-border sm:hidden">
                          <button
                            type="button"
                            className="px-3 py-1.5 text-brand-700"
                            onClick={() => setQuantity(item.productId, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] px-2 text-center font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            className="px-3 py-1.5 text-brand-700"
                            onClick={() => setQuantity(item.productId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProduct(item.productId)}
                          className="text-sm text-red-700 hover:underline"
                        >
                          Quitar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="h-fit space-y-4 rounded-xl border border-border bg-surface p-6">
        <p className="font-semibold text-text">Datos de contacto</p>
        <p className="text-xs text-text-muted">
          Nombre obligatorio. Indica correo o celular (al menos uno).
        </p>

        <div>
          <label className="mb-1 block text-sm font-medium">Nombre *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="correo@ejemplo.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Celular</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
            placeholder="10 dígitos"
          />
        </div>

        <Button type="submit" className="w-full justify-center" disabled={loading || !items.length}>
          {loading ? "Enviando…" : "Enviar solicitud"}
        </Button>
      </form>
    </div>
  );
}
