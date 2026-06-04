import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

type Props = { params: Promise<{ slug: string }> };

export default async function CategoriasSlugRedirectPage({ params }: Props) {
  const { slug } = await params;
  redirect(routes.category(slug));
}
