import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { SearchBar } from "@/components/layout/search-bar";
import { ProductCard } from "@/components/catalog/product-card";
import { ServiceCard } from "@/components/catalog/service-card";
import { PageHeader } from "@/components/ui/page-header";
import { MIN_SEARCH_LENGTH, searchCatalog } from "@/lib/services/search.service";
import { mapProductToCard } from "@/lib/services/products.service";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = withCanonical(routes.search, {
  title: "Buscar",
  description: "Busca insumos médicos y servicios en Promacson Tienda.",
  robots: { index: false, follow: true },
});

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BuscarPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const hasQuery = query.length > 0;
  const isValidQuery = query.length >= MIN_SEARCH_LENGTH;
  const results = isValidQuery ? await searchCatalog(query) : null;

  const productCount = results?.products.length ?? 0;
  const serviceCount = results?.services.length ?? 0;
  const totalCount = productCount + serviceCount;

  let subtitle = "Nombre de producto, SKU, categoría o servicio.";
  if (hasQuery && !isValidQuery) {
    subtitle = `Escribe al menos ${MIN_SEARCH_LENGTH} caracteres para buscar.`;
  } else if (isValidQuery && results) {
    subtitle =
      totalCount > 0
        ? `${totalCount} resultado${totalCount === 1 ? "" : "s"} para «${query}»`
        : `No encontramos resultados para «${query}». Prueba con otro término.`;
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <PageHeader title={hasQuery ? `Búsqueda: ${query}` : "Buscar en Promacson"} subtitle={subtitle} />

        <div className="mt-6 max-w-2xl">
          <SearchBar query={query} size="large" />
        </div>

        {hasQuery && !isValidQuery ? (
          <p className="mt-6 rounded-xl border border-border bg-surface-muted p-6 text-sm text-text-muted">
            Tu búsqueda es muy corta. Intenta con al menos {MIN_SEARCH_LENGTH} caracteres.
          </p>
        ) : null}

        {isValidQuery && results ? (
          <div className="mt-8 space-y-10">
            {productCount > 0 ? (
              <section>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <h2 className="text-lg font-semibold text-text">Productos ({productCount})</h2>
                  <Link href={routes.catalog} className="text-sm font-medium text-brand-700 hover:underline">
                    Ver catálogo
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {results.products.map((product) => (
                    <ProductCard key={product.id} product={mapProductToCard(product)} />
                  ))}
                </div>
              </section>
            ) : null}

            {serviceCount > 0 ? (
              <section>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <h2 className="text-lg font-semibold text-text">Servicios ({serviceCount})</h2>
                  <Link href={routes.services} className="text-sm font-medium text-brand-700 hover:underline">
                    Ver servicios
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.services.map((service) => (
                    <ServiceCard key={service.slug} service={service} />
                  ))}
                </div>
              </section>
            ) : null}

            {totalCount === 0 ? (
              <div className="rounded-xl border border-border bg-surface-muted p-8 text-center">
                <p className="text-sm text-text-muted">
                  No hay coincidencias en productos ni servicios activos.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  <Link
                    href={routes.catalog}
                    className="rounded-lg bg-brand-700 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800"
                  >
                    Explorar catálogo
                  </Link>
                  <Link
                    href={routes.services}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50"
                  >
                    Ver servicios
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </SiteShell>
  );
}
