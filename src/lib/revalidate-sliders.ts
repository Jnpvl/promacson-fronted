import { revalidatePath, revalidateTag } from "next/cache";

/** Refresca el carrusel del inicio tras cambios en sliders. */
export function revalidateHomeSliders(): void {
  revalidatePath("/");
  revalidateTag("hero-slides", "max");
}
