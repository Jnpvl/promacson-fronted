import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/service-form";
import { adminApiRequest } from "@/lib/admin-server-api";
import { ApiError } from "@/lib/api/types";
import type { ServiceRecord } from "@/types/service";

type PageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Editar servicio",
};

async function getServiceForEdit(id: string): Promise<ServiceRecord> {
  try {
    return await adminApiRequest<ServiceRecord>(`/api/v1/admin/services/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export default async function AdminEditServicePage({ params }: PageProps) {
  const { id } = await params;
  const service = await getServiceForEdit(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Editar servicio</h1>
      <p className="mt-2 text-sm text-text-muted">{service.title}</p>
      <div className="mt-8">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
