import type { SiteContact } from "@/types/site-contact";

/** Fallback local hasta que la API de contacto esté disponible. */
export const MOCK_SITE_CONTACT: SiteContact = {
  phone: "662 450 1230",
  phoneE164: "+526624501230",
  email: "ventas@promacson.mx",
  whatsapp: "526624501230",
  address: "C. Benito Juárez 177, Constitución, 83150 Hermosillo, Son.",
  facebookUrl: null,
};
