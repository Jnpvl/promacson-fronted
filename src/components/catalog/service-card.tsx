import Link from "next/link";
import { MediaImage } from "@/components/ui/media-image";
import {
  serviceCardFrameClass,
  serviceCardImageClass,
} from "@/lib/service-image-layout";
import { routes } from "@/lib/routes";
import type { Service } from "@/types/service";

const DEFAULT_GRADIENT = "from-brand-600 via-brand-700 to-brand-800";

type ServiceCardProps = {
  service: Service;
  variant?: "default" | "compact";
};

export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  const isCompact = variant === "compact";
  const href = routes.serviceDetail(service.slug);
  const frameClass = isCompact ? serviceCardFrameClass.compact : serviceCardFrameClass.default;

  return (
    <article className="group h-full">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:border-brand-600 hover:shadow-lg"
      >
        <div className={`relative overflow-hidden ${frameClass}`}>
          {service.imageUrl ? (
            <MediaImage
              src={service.imageUrl}
              fill
              className={`${serviceCardImageClass} transition duration-500 group-hover:scale-105`}
              alt=""
            />
          ) : (
            <div
              className={`absolute inset-0 bg-gradient-to-br ${DEFAULT_GRADIENT} transition duration-500 group-hover:scale-105`}
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-900/50 to-brand-900/10" />
        </div>

        <div className={`flex flex-1 flex-col ${isCompact ? "p-4" : "p-5 sm:p-6"}`}>
          <h3
            className={`font-bold text-text group-hover:text-brand-700 ${
              isCompact ? "text-sm" : "text-lg sm:text-xl"
            }`}
          >
            {service.title}
          </h3>

          {!isCompact ? (
            <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-text-muted">
              {service.description}
            </p>
          ) : (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted">
              {service.description}
            </p>
          )}

          <span
            className={`mt-4 inline-flex w-fit items-center gap-2 font-semibold text-brand-700 transition group-hover:gap-3 ${
              isCompact
                ? "text-xs"
                : "rounded-lg bg-brand-50 px-4 py-2.5 text-sm group-hover:bg-brand-100"
            }`}
          >
            {isCompact ? "Ver más" : "Conocer servicio"}
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
