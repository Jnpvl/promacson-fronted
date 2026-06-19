import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { MediaImage } from "@/components/ui/media-image";
import { getServiceBySlug } from "@/lib/services/services.service";
import {
  hasServiceContact,
  serviceContactHref,
  serviceContactLabel,
} from "@/lib/site-contact-utils";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  return withCanonical(
    routes.serviceDetail(slug),
    {
      title: service?.seoTitle ?? service?.title ?? "Servicio",
      description: service?.seoDescription ?? service?.description,
    },
    { image: service?.imageUrl },
  );
}

export default async function ServicioDetallePage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const showContact = hasServiceContact(service.contactType, service.contactValue);

  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <nav className="mb-4 text-sm text-text-muted">
          <Link href={routes.services} className="hover:text-brand-700">
            Servicios
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text">{service.title}</span>
        </nav>

        {service.imageUrl ? (
          <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-border">
            <MediaImage src={service.imageUrl} fill className="object-cover" alt={service.title} />
          </div>
        ) : null}

        <header className="mb-6">
          <h1 className="text-2xl font-bold text-text sm:text-3xl">{service.title}</h1>
          {service.description ? (
            <p className="mt-3 text-text-muted">{service.description}</p>
          ) : null}
        </header>

        <div className="rounded-2xl border border-border bg-surface-muted p-6">
          {service.body ? (
            <div className="whitespace-pre-line text-sm leading-relaxed text-text">{service.body}</div>
          ) : (
            <p className="text-sm text-text-muted">
              Para más detalles sobre este servicio, contáctanos y con gusto te orientamos.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {showContact ? (
              <Button
                href={serviceContactHref(service.contactType!, service.contactValue!)}
                variant="outline"
              >
                {serviceContactLabel(service.contactType!)}
              </Button>
            ) : null}
            {service.href ? (
              <Button href={service.href} variant="outline">
                Ir al enlace del servicio
              </Button>
            ) : null}
          </div>
        </div>

        <p className="mt-8">
          <Link href={routes.services} className="text-sm font-medium text-brand-700 hover:underline">
            ← Ver todos los servicios
          </Link>
        </p>
      </div>
    </SiteShell>
  );
}
