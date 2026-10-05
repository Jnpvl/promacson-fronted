import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { termsDoc } from "@/content/legal";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.terms, {
  title: "Términos y condiciones de uso del sitio",
  description:
    "Términos y condiciones de Promacson Tienda: información del sitio, precios y disponibilidad, pedidos por cotización, uso de productos y ley aplicable.",
  robots: { index: true, follow: true },
});

export default function TerminosPage() {
  return <LegalPage doc={termsDoc} crumbName="Términos y condiciones" path={routes.terms} />;
}
