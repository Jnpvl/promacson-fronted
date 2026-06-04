import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { aboutConfig, aboutHighlights } from "@/config/about";
import { siteConfig } from "@/config/site";
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

export const metadata: Metadata = withCanonical(routes.about, {
  title: "Nosotros",
  description:
    "Conoce Promacson Tienda: distribución de insumos médicos y material de curación para instituciones de salud en Sonora.",
});

export default async function NosotrosPage() {
  const contact = await getSiteContact();

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <PageHeader
          title="Nosotros"
          subtitle="Más de tres décadas apoyando a instituciones de salud con insumos médicos, curación y soluciones de abastecimiento."
        />

        <section className="max-w-3xl space-y-5 text-text-muted">
          <p className="text-lg leading-relaxed text-text sm:text-xl">{siteConfig.description}</p>
          <p className="leading-relaxed sm:text-base">
            En Promacson Tienda encontrarás un catálogo pensado para quienes compran con criterio
            clínico: cotización personalizada, modalidad por pieza o caja según producto, y atención
            comercial para mayoreo e instituciones.
          </p>
          <p className="leading-relaxed sm:text-base">
            Trabajamos con marcas del sector salud y procesos de entrega que se adaptan a tu
            operación — desde consultorio hasta hospital — con presencia en Hermosillo y cobertura
            principalmente en Sonora.
          </p>
          <div className="flex flex-wrap gap-3 pt-3">
            <Button href={routes.catalog}>Explorar catálogo</Button>
            <Button href={routes.quote} variant="outline">
              Solicitar cotización
            </Button>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-text sm:text-2xl">Qué nos distingue</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aboutHighlights.map((item) => (
              <article
                key={item.title}
                className="flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm"
              >
                <h3 className="font-semibold text-text">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-bold text-text sm:text-2xl">Visítanos</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            {aboutConfig.locationLabel} en Hermosillo, Sonora. Te atendemos en sucursal, por teléfono,
            correo o WhatsApp.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <iframe
                title={`Mapa — ${aboutConfig.address.full}`}
                src={aboutConfig.googleMapsEmbedSrc}
                className="aspect-[4/3] w-full min-h-[280px] border-0 sm:min-h-[360px] lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Ubicación
                </p>
                <p className="mt-1 text-sm leading-relaxed text-text">
                  {contact.address ?? aboutConfig.address.full}
                </p>
                <Link
                  href={aboutConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex text-sm font-medium text-brand-700 hover:underline"
                >
                  Cómo llegar en Google Maps →
                </Link>
              </div>
              {contact.businessHours ? (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    Horario
                  </p>
                  <p className="mt-1 text-sm text-text">{contact.businessHours}</p>
                </div>
              ) : null}
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
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
