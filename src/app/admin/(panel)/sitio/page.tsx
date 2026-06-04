import type { Metadata } from "next";
import { SiteContactForm } from "@/components/admin/site-contact-form";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { normalizeSiteContact } from "@/lib/services/site-contact.service";
import { MOCK_SITE_CONTACT } from "@/lib/mock-site-contact";
import type { SiteContact } from "@/types/site-contact";

export const metadata: Metadata = {
  title: "Contacto del sitio",
};

export default async function AdminSiteContactPage() {
  let contact: SiteContact = MOCK_SITE_CONTACT;

  try {
    const data = await adminApiRequest<unknown>(apiEndpoints.site.adminContact);
    contact = normalizeSiteContact(data);
  } catch {
    contact = MOCK_SITE_CONTACT;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Contacto del sitio</h1>
      <p className="mt-2 text-sm text-text-muted">
        Teléfono, correo, WhatsApp, dirección y horarios que se muestran en el header, footer y
        página Nosotros. También puedes dejar preparada la URL de Facebook para cuando la uses.
      </p>

      <SiteContactForm initialContact={contact} />
    </div>
  );
}
