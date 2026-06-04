import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { adminApiRequest } from "@/lib/admin-server-api";
import { ApiError } from "@/lib/api/types";
import type { CategoryRecord } from "@/types/category";

type PageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Editar categoría",
};

async function getCategoryForEdit(id: string): Promise<CategoryRecord> {
  try {
    return await adminApiRequest<CategoryRecord>(`/api/v1/admin/categories/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export default async function AdminEditCategoryPage({ params }: PageProps) {
  const { id } = await params;
  const category = await getCategoryForEdit(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Editar categoría</h1>
      <p className="mt-2 text-sm text-text-muted">{category.name}</p>
      <div className="mt-8">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
