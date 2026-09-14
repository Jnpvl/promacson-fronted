import { revalidatePath, revalidateTag } from "next/cache";

/** Refresca catálogo, PDP e inicio tras cambios en productos. */
export function revalidateProducts(): void {
  revalidatePath("/");
  revalidatePath("/catalogo");
  revalidatePath("/catalogo/productos");
  revalidatePath("/sitemap.xml");
  revalidateTag("products", "max");
}
