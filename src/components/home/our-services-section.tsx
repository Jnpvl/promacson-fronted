import Link from "next/link";
import { ServiceCard } from "@/components/catalog/service-card";
import type { Service } from "@/types/service";
import { routes } from "@/lib/routes";

export function OurServicesSection({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <section id="servicios" className="border-y border-border bg-surface-muted py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Nuestros servicios
            </p>
            <h2 className="mt-1 text-2xl font-bold text-text sm:text-3xl">
              Más que distribución de insumos
            </h2>
            <p className="mt-2 max-w-xl text-sm text-text-muted">
              Soluciones complementarias para tu operación clínica y logística.
            </p>
          </div>
          <Link
            href={routes.services}
            className="shrink-0 text-sm font-medium text-brand-700 hover:underline"
          >
            Ver todos los servicios
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
