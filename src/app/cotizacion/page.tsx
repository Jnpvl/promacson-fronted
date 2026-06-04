import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/ui/page-header";
import { QuoteCartView } from "@/components/quote/quote-cart-view";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.quote, {
  title: "Cotización",
  description: "Arma tu lista de insumos y recibe propuesta de un vendedor Promacson.",
});

export default function CotizacionPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          title="Tu cotización"
          subtitle="Arma tu lista y recibe propuesta de un vendedor. Puedes seguir agregando productos desde el catálogo."
        />

        <p className="mb-6 max-w-2xl rounded-lg border border-border bg-surface-muted px-4 py-3 text-sm text-text-muted">
          ¿Representas una <strong className="text-text">clínica, hospital o distribuidor</strong> con compras por
          volumen?{" "}
          <Link href={routes.wholesale} className="font-semibold text-brand-700 underline">
            Solicita atención mayoreo
          </Link>
          .
        </p>

        <QuoteCartView />
      </div>
    </SiteShell>
  );
}
