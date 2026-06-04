import { revalidatePath, revalidateTag } from "next/cache";

/** Refresca catálogo e inicio tras cambios en categorías. */
export function revalidateCategories(): void {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidateTag("categories", "max");
}
