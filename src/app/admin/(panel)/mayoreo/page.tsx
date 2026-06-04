import type { Metadata } from "next";
import { WholesaleList } from "@/components/admin/wholesale-list";

export const metadata: Metadata = {
  title: "Mayoreo",
};

export default function AdminWholesalePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Mayoreo</h1>
      <p className="mt-2 text-sm text-text-muted">
        Solicitudes del formulario de compra mayoreo. Actualiza el estatus según el seguimiento
        comercial.
      </p>
      <WholesaleList />
    </div>
  );
}
