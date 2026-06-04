export type SaleMode = "UNIT_ONLY" | "PACKAGE_ONLY" | "BOTH";

/** Respuesta de API de productos. */
export type ProductRecord = {
  id: string;
  slug: string;
  name: string;
  sku: string | null;
  description: string | null;
  saleMode: SaleMode;
  badge: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  imageUrls: string[];
  coverImageUrl: string | null;
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductFormValues = {
  name: string;
  slug: string;
  sku: string;
  description: string;
  saleMode: SaleMode;
  categoryId: string;
  imageUrls: string[];
  isActive: boolean;
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
};
