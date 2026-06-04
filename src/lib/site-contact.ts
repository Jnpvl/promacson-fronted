import { cache } from "react";
import { getSiteContactFromApi } from "@/lib/services/site-contact.service";

/** Contacto del sitio para Server Components (cache por request). */
export const getSiteContact = cache(getSiteContactFromApi);
