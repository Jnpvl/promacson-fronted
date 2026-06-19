import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToQuoteButton } from "@/components/quote/add-to-quote-button";
import { MediaImage } from "@/components/ui/media-image";
import {
  productCardFrameClass,
  productCardImageClass,
} from "@/lib/product-image-layout";
import { routes } from "@/lib/routes";
import type { SaleMode } from "@/types/product";

export type ProductCardData = {
  productId: string;
  slug: string;
  name: string;
  badge: string;
  saleMode?: SaleMode;
  coverImageUrl?: string | null;
  /** Opcional — no se muestra en UI pública */
  sku?: string;
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const productUrl = routes.product(product.slug);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:border-brand-600 hover:shadow-md">
      <Link href={productUrl} className="group block shrink-0">
        <div className={productCardFrameClass}>
          {product.coverImageUrl ? (
            <MediaImage
              src={product.coverImageUrl}
              alt={product.name}
              fill
              className={`${productCardImageClass} transition group-hover:scale-105`}
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200" aria-hidden />
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Badge variant="brand">{product.badge}</Badge>
        <h3 className="mt-2 font-semibold text-text">
          <Link href={productUrl} className="hover:text-brand-700">
            {product.name}
          </Link>
        </h3>
        <div className="mt-4 flex flex-col gap-2">
          <Button href={productUrl} variant="outline" className="w-full justify-center">
            Ver producto
          </Button>
          <AddToQuoteButton
            productId={product.productId}
            slug={product.slug}
            name={product.name}
            badge={product.badge}
            fullWidth
            className="text-sm"
          />
        </div>
      </div>
    </article>
  );
}
