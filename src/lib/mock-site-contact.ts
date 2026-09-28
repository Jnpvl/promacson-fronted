import type { SiteContact } from "@/types/site-contact";
import { storeNap } from "@/config/store-nap";

/** Fallback local hasta que la API de contacto esté disponible. */
export const MOCK_SITE_CONTACT: SiteContact = {
  phone: storeNap.telephoneDisplay,
  phoneE164: storeNap.telephoneE164,
  email: storeNap.email,
  whatsapp: "526624501230",
  address: storeNap.addressFull,
  businessHours: storeNap.hoursDisplay,
  facebookUrl: null,
};
