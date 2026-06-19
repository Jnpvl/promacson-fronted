import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductGallery } from "@/components/catalog/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToQuoteButton } from "@/components/quote/add-to-quote-button";
import { routes } from "@/lib/routes";
import { getCategoryBySlug } from "@/lib/services/categories.service";
import { getProductBySlug } from "@/lib/services/products.service";
import { withCanonical } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return withCanonical(routes.catalog, { title: "Producto" });

  return withCanonical(
    routes.product(slug),
    {
      title: product.seoTitle ?? product.name,
      description: product.seoDescription ?? product.description ?? undefined,
    },
    { image: product.coverImageUrl },
  );
}

export default async function ProductoPdpPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.categorySlug);
  const images = product.imageUrls.length ? product.imageUrls : [];

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <nav className="mb-4 text-sm text-text-muted">
          <Link href={routes.catalog} className="hover:text-brand-700">
            Catálogo
          </Link>
          {category ? (
            <>
              <span className="mx-2">/</span>
              <Link href={routes.category(category.slug)} className="hover:text-brand-700">
                {category.name}
              </Link>
            </>
          ) : null}
          <span className="mx-2">/</span>
          <span className="text-text">{product.name}</span>
        </nav>

        <div className="grid min-w-0 gap-10 lg:grid-cols-2">
          <div className="min-w-0 max-w-full">
            <ProductGallery images={images} alt={product.name} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-text sm:text-3xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="brand">{product.badge}</Badge>
              {category ? (
                <Link
                  href={routes.category(category.slug)}
                  className="text-sm text-brand-700 hover:underline"
                >
                  {category.name}
                </Link>
              ) : null}
            </div>
            {product.description ? (
              <p className="mt-4 whitespace-pre-line text-text-muted">{product.description}</p>
            ) : (
              <p className="mt-4 text-text-muted">
                Solicita cotización para conocer disponibilidad y condiciones de entrega.
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <AddToQuoteButton
                productId={product.id}
                slug={product.slug}
                name={product.name}
                badge={product.badge}
              />
              {category ? (
                <Button href={routes.category(category.slug)} variant="outline">
                  Ver más en {category.name}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
