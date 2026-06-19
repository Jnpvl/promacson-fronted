import Link from "next/link";
import { MediaImage } from "@/components/ui/media-image";
import {
  categoryCardFrameClass,
  categoryCardImageClass,
} from "@/lib/category-image-layout";
import { routes } from "@/lib/routes";
import type { Category } from "@/types/catalog";

/** Gradientes por slug cuando la API no envía imageUrl */
const CATEGORY_GRADIENTS: Record<string, string> = {
  apositos: "from-brand-600 via-brand-700 to-brand-800",
  curacion: "from-brand-600 via-brand-700 to-brand-800",
  guantes: "from-brand-500 via-brand-600 to-brand-700",
  jeringas: "from-brand-700 via-brand-800 to-brand-900",
  cubrebocas: "from-brand-600 via-brand-800 to-brand-900",
  equipo: "from-brand-800 via-brand-900 to-[#003844]",
};

const DEFAULT_GRADIENT = "from-brand-600 to-brand-800";

type CategoryCardProps = {
  category: Category;
  /** compact: home · default: página catálogo */
  variant?: "default" | "compact";
};

export function CategoryCard({ category, variant = "default" }: CategoryCardProps) {
  const gradient = CATEGORY_GRADIENTS[category.slug] ?? DEFAULT_GRADIENT;
  const isCompact = variant === "compact";

  return (
    <article className="group h-full">
      <Link
        href={routes.category(category.slug)}
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:border-brand-600 hover:shadow-lg ${
          isCompact ? "" : ""
        }`}
      >
        <div className={isCompact ? categoryCardFrameClass.compact : categoryCardFrameClass.default}>
          {category.imageUrl ? (
            <MediaImage
              src={category.imageUrl}
              alt={category.name}
              fill
              className={`${categoryCardImageClass} transition duration-500 group-hover:scale-105`}
              sizes={isCompact ? "(max-width: 640px) 50vw, 20vw" : "(max-width: 1024px) 50vw, 33vw"}
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} transition duration-500 group-hover:scale-105`}
              aria-hidden
            />
          )}

          {/* Patrón sutil + overlay para legibilidad del texto */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/50 to-brand-900/10" />

          {!isCompact && category.productCount != null ? (
            <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              +{category.productCount} productos
            </span>
          ) : null}
        </div>

        <div className={`flex flex-1 flex-col ${isCompact ? "p-4" : "p-5 sm:p-6"}`}>
          <h3
            className={`font-bold text-text group-hover:text-brand-700 ${
              isCompact ? "text-sm" : "text-lg sm:text-xl"
            }`}
          >
            {category.name}
          </h3>

          {!isCompact ? (
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-muted">
              {category.description}
            </p>
          ) : null}

          <span
            className={`mt-4 inline-flex w-fit items-center gap-2 rounded-lg font-semibold text-brand-700 transition group-hover:gap-3 ${
              isCompact
                ? "text-xs"
                : "bg-brand-50 px-4 py-2.5 text-sm group-hover:bg-brand-100"
            }`}
          >
            {isCompact ? "Ver más" : "Explorar categoría"}
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
