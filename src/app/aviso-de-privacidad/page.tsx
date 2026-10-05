import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { privacyDoc } from "@/content/legal";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.privacy, {
  title: "Aviso de privacidad y datos personales",
  description:
    "Aviso de privacidad de Promacson Tienda en Hermosillo, Sonora: qué datos recibimos, para qué los usamos y cómo ejercer tus derechos ARCO.",
  robots: { index: true, follow: true },
});

export default function AvisoDePrivacidadPage() {
  return <LegalPage doc={privacyDoc} crumbName="Aviso de privacidad" path={routes.privacy} />;
}
