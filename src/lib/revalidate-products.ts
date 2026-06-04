import { revalidatePath, revalidateTag } from "next/cache";

/** Refresca catálogo, PDP e inicio tras cambios en productos. */
export function revalidateProducts(): void {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/catalogo/productos");
  revalidateTag("products", "max");
}
