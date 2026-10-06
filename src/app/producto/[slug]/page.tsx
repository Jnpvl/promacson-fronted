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
import { getProductBySlug, getProducts } from "@/lib/services/products.service";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  catalogBreadcrumb,
  homeBreadcrumb,
  plainProductDescription,
} from "@/lib/seo-jsonld";
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
    { image: product.coverImageUrl, openGraphType: "product" },
  );
}

function firstSentence(value: string): string {
  const match = value.match(/^(.+?[.!?])(?:\s|$)/);
  return match?.[1] ?? value;
}

export default async function ProductoPdpPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const category = await getCategoryBySlug(product.categorySlug);
  const relatedProducts = category
    ? (await getProducts(category.slug)).filter((item) => item.slug !== product.slug).slice(0, 3)
    : [];
  const images = product.imageUrls.length ? product.imageUrls : [];
  const description = plainProductDescription(product.description);
  const purposeText = description
    ? firstSentence(description)
    : "Consulta la ficha y solicita una cotización para conocer la disponibilidad del producto.";
  const presentationText = description && description !== purposeText
    ? description.slice(purposeText.length).trim()
    : `${product.badge}. Consulta la medida o presentación indicada en la ficha.`;
  const hasVariants = /talla|tallas|mmhg|rodilla|muslo|chico|mediano|grande|blanco|negro|\b\d+\s*ml\b/i.test(
    `${product.name} ${product.description ?? ""}`,
  );
  const productJsonLd = buildProductJsonLd(product);
  const breadcrumbItems = [
    homeBreadcrumb(),
    catalogBreadcrumb(),
    ...(category ? [{ name: category.name, item: routes.category(category.slug) }] : []),
    { name: product.name, item: routes.product(product.slug) },
  ];

  return (
    <>
      {productJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)),
        }}
      />
      <SiteShell>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <nav className="mb-4 text-sm text-text-muted">
            <Link href={routes.home} className="hover:text-brand-700">
              Inicio
            </Link>
            <span className="mx-2">/</span>
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
              {description ? (
                <p className="mt-4 whitespace-pre-line text-text-muted">{description}</p>
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

          <section className="mt-12 max-w-4xl">
            <h2 className="text-xl font-bold text-text sm:text-2xl">Para qué sirve</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{purposeText}</p>
          </section>

          <section className="mt-8 max-w-4xl">
            <h2 className="text-xl font-bold text-text sm:text-2xl">Presentación</h2>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text-muted">
              {presentationText}
            </p>
          </section>

          {hasVariants ? (
            <section className="mt-8 max-w-4xl">
              <h2 className="text-xl font-bold text-text sm:text-2xl">Cómo elegir</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Compara la talla, medida, capacidad o variante que necesitas con las opciones de esta categoría.
                Si tienes dudas, solicita orientación al preparar tu cotización.
              </p>
            </section>
          ) : null}

          {category ? (
            <section className="mt-8 max-w-4xl">
              <h2 className="text-xl font-bold text-text sm:text-2xl">Más en {category.name}</h2>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link href={routes.category(category.slug)} className="font-medium text-brand-700 hover:underline">
                  Ver toda la categoría
                </Link>
                {relatedProducts.map((related) => (
                  <Link
                    key={related.slug}
                    href={routes.product(related.slug)}
                    className="text-brand-700 hover:underline"
                  >
                    {related.name}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </SiteShell>
    </>
  );
}
