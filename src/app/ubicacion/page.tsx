import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { storeNap } from "@/config/store-nap";
import { getSiteContact } from "@/lib/site-contact";
import {
  facebookHref,
  hasFacebook,
  mailtoHref,
  phoneHref,
  whatsappHref,
} from "@/lib/site-contact-utils";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.location, {
  title: "Ubicación",
  description:
    "Visita Promacson Tienda en C. Benito Juárez 177, Col. Constitución, Hermosillo. Horario Lun–Vie 8:00–17:00. Cotiza insumos médicos y material de curación.",
});

const ctaOutlineClass =
  "inline-flex items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-50";

export default async function UbicacionPage() {
  const contact = await getSiteContact();
  const address = contact.address?.trim() || storeNap.addressFull;
  const hours = contact.businessHours?.trim() || storeNap.hoursDisplay;

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <PageHeader
          title="Ubicación"
          subtitle="Sucursal Promacson Tienda en Hermosillo, Sonora. Te atendemos en tienda, por teléfono, correo o WhatsApp."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <iframe
              title={`Mapa — ${storeNap.addressFull}`}
              src={storeNap.googleMapsEmbedSrc}
              className="aspect-[4/3] w-full min-h-[280px] border-0 sm:min-h-[360px] lg:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Dirección
              </p>
              <address className="mt-1 not-italic text-sm leading-relaxed text-text">
                {address}
              </address>
              <Link
                href={storeNap.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-medium text-brand-700 hover:underline"
              >
                Cómo llegar en Google Maps →
              </Link>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Horario
              </p>
              <p className="mt-1 text-sm text-text">{hours}</p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Teléfono
              </p>
              <a
                href={phoneHref(contact)}
                className="mt-1 block text-base font-semibold text-brand-700 hover:underline"
              >
                {contact.phone}
              </a>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                Correo
              </p>
              <a
                href={mailtoHref(contact)}
                className="mt-1 block text-sm font-medium text-brand-700 hover:underline"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                WhatsApp
              </p>
              <a
                href={whatsappHref(contact)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-sm font-medium text-brand-700 hover:underline"
              >
                Enviar mensaje
              </a>
            </div>

            {hasFacebook(contact) ? (
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Facebook
                </p>
                <a
                  href={facebookHref(contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm font-medium text-brand-700 hover:underline"
                >
                  Visitar página
                </a>
              </div>
            ) : null}

            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
              <Button href={routes.quote}>Solicitar cotización</Button>
              <a href={phoneHref(contact)} className={ctaOutlineClass}>
                Llamar ahora
              </a>
              <a
                href={whatsappHref(contact)}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaOutlineClass}
              >
                WhatsApp
              </a>
              <a href={mailtoHref(contact)} className={ctaOutlineClass}>
                Enviar correo
              </a>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
