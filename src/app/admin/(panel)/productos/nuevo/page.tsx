import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/product-form";
import { fetchAdminCategoriesAll } from "@/lib/admin-categories";

export const metadata: Metadata = {
  title: "Nuevo producto",
};

export default async function AdminNewProductPage() {
  const categories = await fetchAdminCategoriesAll();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Nuevo producto</h1>
      <p className="mt-2 text-sm text-text-muted">
        Vincula a una categoría y sube las imágenes. La primera será la portada.
      </p>
      <div className="mt-8">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
