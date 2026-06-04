import type { Metadata } from "next";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata: Metadata = {
  title: "Nuevo servicio",
};

export default function AdminNewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Nuevo servicio</h1>
      <p className="mt-2 text-sm text-text-muted">Aparecerá en la sección de servicios del sitio.</p>
      <div className="mt-8">
        <ServiceForm />
      </div>
    </div>
  );
}
