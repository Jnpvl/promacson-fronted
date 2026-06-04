import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { ServiceCard } from "@/components/catalog/service-card";
import { getServices } from "@/lib/services/services.service";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.services, {
  title: "Servicios",
  description: "Consulta médica, entregas foráneas, logística y asesoría de abastecimiento.",
});

export default async function ServiciosPage() {
  const services = await getServices();

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-xl font-bold text-text sm:text-2xl">Nuestros servicios</h1>
          <p className="mt-1 text-sm text-text-muted">
            Elige un servicio para conocer cómo podemos apoyar a tu institución o consultorio.
          </p>
        </header>

        {services.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border bg-surface-muted p-8 text-center text-sm text-text-muted">
            Pronto publicaremos nuestros servicios. Mientras tanto, contáctanos para más información.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
