/** Respuesta de API de categorías (público y admin). */
export type CategoryRecord = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  seoTitle: string;
  seoDescription: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CategoryFormValues = {
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
};
