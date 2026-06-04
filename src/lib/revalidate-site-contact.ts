import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateSiteContact(): void {
  revalidatePath("/");
  revalidatePath("/nosotros");
  revalidateTag("site-contact", "max");
}
