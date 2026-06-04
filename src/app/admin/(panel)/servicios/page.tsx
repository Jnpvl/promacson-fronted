import type { Metadata } from "next";
import Link from "next/link";
import { ServiceList } from "@/components/admin/service-list";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { routes } from "@/lib/routes";
import type { ServiceRecord } from "@/types/service";

export const metadata: Metadata = {
  title: "Servicios",
};

export default async function AdminServicesPage() {
  let services: ServiceRecord[] = [];

  try {
    services = await adminApiRequest<ServiceRecord[]>(apiEndpoints.services.admin);
  } catch {
    services = [];
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text">Servicios</h1>
          <p className="mt-2 text-sm text-text-muted">
            Tarjetas en inicio y listado en /servicios. Imagen opcional (4:3 / 16:10).
          </p>
        </div>
        <Link
          href={routes.admin.serviceNew}
          className="inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          Nuevo servicio
        </Link>
      </div>

      <ServiceList initialServices={services} />
    </div>
  );
}
