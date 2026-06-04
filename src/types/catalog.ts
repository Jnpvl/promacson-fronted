/** Categoría para tarjetas y listados del sitio. */
export type Category = {
  id?: string;
  slug: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  productCount?: number;
  seoTitle?: string;
  seoDescription?: string;
};
