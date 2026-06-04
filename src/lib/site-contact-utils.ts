import type { SiteContact } from "@/types/site-contact";
import type { ServiceContactType } from "@/types/service";

export function phoneHref(contact: SiteContact): string {
  return `tel:${contact.phoneE164.replace(/\s/g, "")}`;
}

export function mailtoHref(contact: SiteContact): string {
  return `mailto:${contact.email}`;
}

export function whatsappHref(contact: SiteContact): string {
  const digits = contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export function serviceContactHref(type: ServiceContactType, value: string): string {
  switch (type) {
    case "phone":
      return `tel:${value.replace(/\s/g, "")}`;
    case "email":
      return `mailto:${value.trim()}`;
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`;
  }
}

export function serviceContactLabel(type: ServiceContactType): string {
  switch (type) {
    case "phone":
      return "Llamar";
    case "email":
      return "Correo";
    case "whatsapp":
      return "WhatsApp";
  }
}

export function hasServiceContact(
  contactType: ServiceContactType | null | undefined,
  contactValue: string | null | undefined,
): contactType is ServiceContactType {
  return Boolean(contactType && contactValue?.trim());
}
