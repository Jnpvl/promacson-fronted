import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ServiciosOfferings } from "@/components/services/servicios-offerings";
import { PageHeader } from "@/components/ui/page-header";
import { getSiteContact } from "@/lib/site-contact";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.services, {
  title: {
    absolute: "Cotización y mayoreo de insumos médicos en Hermosillo | Promacson",
  },
  description:
    "Cotización y suministro de insumos médicos, mayoreo para clínicas y hospitales, y asesoría de producto en Hermosillo. Promacson Tienda.",
});

export default async function ServiciosPage() {
  const contact = await getSiteContact();

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <PageHeader
          title="Servicios de insumos médicos en Hermosillo"
          subtitle="Cotización, mayoreo, asesoría de producto y un aliado clínico en el mismo domicilio. Elige cómo podemos apoyarte."
        />
        <ServiciosOfferings contact={contact} />
      </div>
    </SiteShell>
  );
}
