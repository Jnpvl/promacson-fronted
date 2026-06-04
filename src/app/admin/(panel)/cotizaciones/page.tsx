import type { Metadata } from "next";
import { QuoteList } from "@/components/admin/quote-list";

export const metadata: Metadata = {
  title: "Cotizaciones",
};

export default function AdminQuotesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Cotizaciones</h1>
      <p className="mt-2 text-sm text-text-muted">
        Solicitudes del sitio. Actualiza el estatus según el seguimiento comercial.
      </p>
      <QuoteList />
    </div>
  );
}
