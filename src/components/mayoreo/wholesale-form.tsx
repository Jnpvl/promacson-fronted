"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { showFormErrorAlert, showFormSuccessAlert } from "@/lib/form-feedback";
import { routes } from "@/lib/routes";

const TIPOS_CLIENTE = [
  { value: "clinica", label: "Clínica" },
  { value: "hospital", label: "Hospital" },
  { value: "distribuidor", label: "Distribuidor de insumos" },
  { value: "farmacia", label: "Farmacia" },
  { value: "otro", label: "Otro" },
] as const;

const inputClass =
  "w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

export function WholesaleForm() {
  const [clientType, setClientType] = useState("");
  const [clientTypeOther, setClientTypeOther] = useState("");
  const [institution, setInstitution] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [volume, setVolume] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!clientType) {
      await showFormErrorAlert("Selecciona el tipo de cliente", "Revisa tus datos");
      return;
    }
    if (clientType === "otro" && !clientTypeOther.trim()) {
      await showFormErrorAlert("Indica el tipo de cliente", "Revisa tus datos");
      return;
    }
    if (!institution.trim()) {
      await showFormErrorAlert("La institución es obligatoria", "Revisa tus datos");
      return;
    }
    if (!customerName.trim()) {
      await showFormErrorAlert("El nombre de contacto es obligatorio", "Revisa tus datos");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      await showFormErrorAlert("Indica un correo o un teléfono de contacto", "Revisa tus datos");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/wholesale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientType,
          clientTypeOther: clientType === "otro" ? clientTypeOther.trim() : null,
          institution: institution.trim(),
          customerName: customerName.trim(),
          email: email.trim() || null,
          phone: phone.trim() || null,
          volume: volume.trim() || null,
          interest: interest.trim() || null,
          message: message.trim() || null,
        }),
      });

      const data = (await res.json()) as { error?: string; folio?: string };
      if (!res.ok) {
        await showFormErrorAlert(data.error ?? "No se pudo enviar la solicitud");
        return;
      }

      setClientType("");
      setClientTypeOther("");
      setInstitution("");
      setCustomerName("");
      setPhone("");
      setEmail("");
      setVolume("");
      setInterest("");
      setMessage("");
      await showFormSuccessAlert({
        message: "Un vendedor te contactará pronto.",
        folio: data.folio ?? null,
      });
    } catch {
      await showFormErrorAlert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <p className="mb-6 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-900">
        ¿Eres consultorio o compras volúmenes menores? Usa el{" "}
        <Link href={routes.quote} className="font-semibold underline">
          carrito de cotización
        </Link>{" "}
        pensado para quien no compra mayoreo.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="tipo" className="mb-1.5 block text-sm font-medium text-text">
            Tipo de cliente
          </label>
          <select
            id="tipo"
            value={clientType}
            onChange={(e) => {
              setClientType(e.target.value);
              if (e.target.value !== "otro") setClientTypeOther("");
            }}
            required
            className={`${inputClass} bg-surface`}
          >
            <option value="">Selecciona una opción</option>
            {TIPOS_CLIENTE.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {clientType === "otro" ? (
          <div>
            <label htmlFor="tipo-otro" className="mb-1.5 block text-sm font-medium text-text">
              Especifica el tipo de cliente
            </label>
            <input
              id="tipo-otro"
              type="text"
              value={clientTypeOther}
              onChange={(e) => setClientTypeOther(e.target.value)}
              required
              className={inputClass}
              placeholder="Ej. laboratorio, consultorio dental…"
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="institucion" className="mb-1.5 block text-sm font-medium text-text">
            Nombre de la institución o empresa
          </label>
          <input
            id="institucion"
            type="text"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            required
            className={inputClass}
            placeholder="Hospital, clínica o distribuidora"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contacto" className="mb-1.5 block text-sm font-medium text-text">
              Nombre de contacto
            </label>
            <input
              id="contacto"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="mb-1.5 block text-sm font-medium text-text">
              Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
          <p className="mt-1 text-xs text-text-muted">Indica correo o teléfono (al menos uno).</p>
        </div>

        <div>
          <label htmlFor="volumen" className="mb-1.5 block text-sm font-medium text-text">
            Volumen o frecuencia de compra estimada
          </label>
          <input
            id="volumen"
            type="text"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className={inputClass}
            placeholder="Ej. pedido mensual, licitación, surtido recurrente"
          />
        </div>

        <div>
          <label htmlFor="interes" className="mb-1.5 block text-sm font-medium text-text">
            Categorías o productos de interés
          </label>
          <input
            id="interes"
            type="text"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className={inputClass}
            placeholder="Material de curación, guantes, equipo…"
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-text">
            Comentarios adicionales
          </label>
          <textarea
            id="mensaje"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
            placeholder="Licitaciones, entregas, condiciones de pago…"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full justify-center sm:w-auto">
          {loading ? "Enviando…" : "Solicitar atención comercial"}
        </Button>
      </form>
    </>
  );
}
