/** Respuesta de API de servicios. */
export type ServiceContactType = "phone" | "email" | "whatsapp";

export type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  body: string | null;
  imageUrl: string | null;
  href: string | null;
  contactType: ServiceContactType | null;
  contactValue: string | null;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type ServiceFormValues = {
  title: string;
  slug: string;
  description: string;
  body: string;
  imageUrl: string;
  href: string;
  contactType: ServiceContactType | "";
  contactValue: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
};

/** Tarjeta pública de servicio. */
export type Service = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  href?: string | null;
  contactType?: ServiceContactType | null;
  contactValue?: string | null;
  body?: string | null;
  seoTitle?: string;
  seoDescription?: string;
};
