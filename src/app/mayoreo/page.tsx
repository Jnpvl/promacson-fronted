import type { Metadata } from "next";
import { WholesaleForm } from "@/components/mayoreo/wholesale-form";
import { SiteShell } from "@/components/layout/site-shell";
import { PageHeader } from "@/components/ui/page-header";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.wholesale, {
  title: "Mayoreo",
  description:
    "Compras por volumen para hospitales, clínicas y distribuidores. Contacto comercial Promacson.",
});

export default function MayoreoPage() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
        <PageHeader
          title="Compra mayoreo"
          subtitle="Para clínicas, hospitales y distribuidores que abastecen por volumen. Un vendedor te atiende con precios, contratos y logística a tu medida."
        />
        <WholesaleForm />
      </div>
    </SiteShell>
  );
}
