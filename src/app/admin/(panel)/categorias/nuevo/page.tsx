import type { Metadata } from "next";
import { CategoryForm } from "@/components/admin/category-form";

export const metadata: Metadata = {
  title: "Nueva categoría",
};

export default function AdminNewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Nueva categoría</h1>
      <p className="mt-2 text-sm text-text-muted">
        Ejemplos: Apósitos, Gasas, Vendas — cada una es una categoría independiente.
      </p>
      <div className="mt-8">
        <CategoryForm />
      </div>
    </div>
  );
}
