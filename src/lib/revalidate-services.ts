import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateServices(): void {
  revalidatePath("/");
  revalidatePath("/servicios");
  revalidateTag("services", "max");
}
