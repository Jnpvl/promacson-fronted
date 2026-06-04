import { siteConfig } from "@/config/site";

type BrandNameProps = {
  variant?: "header" | "light";
};

export function BrandName({ variant = "header" }: BrandNameProps) {
  const isLight = variant === "light";

  return (
    <span className="inline-flex flex-col justify-center">
      <span
        className={`font-bold leading-none tracking-tight ${
          isLight ? "text-[15px] text-white sm:text-base" : "text-[15px] text-brand-800 sm:text-base"
        }`}
      >
        {siteConfig.name}
      </span>
      <span
        className={`mt-1 font-medium uppercase leading-none tracking-[0.18em] ${
          isLight
            ? "text-[9px] text-brand-100/90 sm:text-[10px]"
            : "text-[9px] text-brand-600 sm:text-[10px]"
        }`}
      >
        {siteConfig.brandLine}
      </span>
    </span>
  );
}
