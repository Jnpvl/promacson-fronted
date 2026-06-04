import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { adminApiRequest } from "@/lib/admin-server-api";
import { fetchAdminCategoriesAll } from "@/lib/admin-categories";
import { ApiError } from "@/lib/api/types";
import type { ProductRecord } from "@/types/product";

type PageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Editar producto",
};

async function getProductForEdit(id: string): Promise<ProductRecord> {
  try {
    return await adminApiRequest<ProductRecord>(`/api/v1/admin/products/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export default async function AdminEditProductPage({ params }: PageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductForEdit(id),
    fetchAdminCategoriesAll(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Editar producto</h1>
      <p className="mt-2 text-sm text-text-muted">{product.name}</p>
      <div className="mt-8">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
