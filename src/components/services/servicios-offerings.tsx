import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { phoneHref, whatsappHref } from "@/lib/site-contact-utils";
import type { SiteContact } from "@/types/site-contact";

const RISE = {
  siteUrl: "https://serviciosmedicosrise.com",
  whatsappDigits: "526623533813",
  whatsappDisplay: "662 353 3813",
  email: "serviciomedicorise@gmail.com",
} as const;

function ExternalButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "bg-brand-700 text-white hover:bg-brand-800"
      : "border border-border bg-surface text-brand-700 hover:bg-brand-50";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function ServiciosOfferings({ contact }: { contact: SiteContact }) {
  const storeWhatsApp = whatsappHref(contact);
  const storePhone = phoneHref(contact);

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Suministro
        </p>
        <h2 className="mt-2 text-xl font-bold text-text">Cotización y suministro</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
          Material de curación, ortopedia, medias de compresión, antiembólicas y equipo médico.
          Cotiza lo que necesitas para casa, consultorio o institución.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={routes.quote}>Cotizar</Button>
          <ExternalButton href={storeWhatsApp} variant="outline">
            WhatsApp tienda
          </ExternalButton>
          <a
            href={storePhone}
            className="inline-flex items-center text-sm font-medium text-brand-700 hover:underline"
          >
            {contact.phone || "662 450 1230"}
          </a>
        </div>
      </article>

      <article className="flex h-full flex-col rounded-2xl border-2 border-brand-700 bg-brand-50 p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Mayoreo</p>
        <h2 className="mt-2 text-xl font-bold text-text">
          Clínicas, hospitales y distribuidores
        </h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
          Compras recurrentes, surtido para reventa y logística dedicada. Te asignamos ejecutivo y
          precios por contrato según tu volumen.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={routes.wholesale}>Contactar</Button>
          <Button href={routes.quote} variant="outline">
            Cotización
          </Button>
        </div>
      </article>

      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
          Orientación
        </p>
        <h2 className="mt-2 text-xl font-bold text-text">Asesoría de producto</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
          Te orientamos para elegir curación, soportes ortopédicos o medias según el uso, sin precios
          publicados en web.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ExternalButton href={storeWhatsApp}>Pedir asesoría</ExternalButton>
          <ExternalButton href={storeWhatsApp} variant="outline">
            WhatsApp tienda
          </ExternalButton>
        </div>
      </article>

      <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <Badge variant="brand">Aliado clínico</Badge>
        <h2 className="mt-3 text-xl font-bold text-text">Servicios Médicos RISE</h2>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted sm:text-base">
          Medicina general, podología, curaciones, análisis y seguimiento. Mismo domicilio (C. Benito
          Juárez 177, Constitución, Hermosillo). Levántate, recupérate, mejora.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ExternalButton href={RISE.siteUrl}>Visitar sitio</ExternalButton>
          <ExternalButton href={`https://wa.me/${RISE.whatsappDigits}`} variant="outline">
            WhatsApp {RISE.whatsappDisplay}
          </ExternalButton>
          <a
            href={`mailto:${RISE.email}`}
            className="inline-flex items-center text-sm font-medium text-brand-700 hover:underline"
          >
            {RISE.email}
          </a>
        </div>
      </article>
    </div>
  );
}
