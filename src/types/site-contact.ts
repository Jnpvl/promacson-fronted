/**
 * Datos de contacto públicos del sitio (CMS / API).
 * Contrato: GET /api/v1/site/contact
 */
export type SiteContact = {
  phone: string;
  phoneE164: string;
  email: string;
  /** Número WhatsApp sin + (solo dígitos, ej. 526624501230) */
  whatsapp: string;
  address?: string | null;
  businessHours?: string | null;
  facebookUrl?: string | null;
};

export type SiteContactFormValues = {
  phone: string;
  phoneE164: string;
  email: string;
  whatsapp: string;
  address: string;
  businessHours: string;
  facebookUrl: string;
};
