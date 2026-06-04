import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandName } from "./brand-name";

export const LOGO_PATH = "/brand/logo.png";

export function Logo({
  showName = true,
  className = "",
  size = 40,
  nameVariant = "header",
}: {
  showName?: boolean;
  className?: string;
  size?: number;
  nameVariant?: "header" | "light";
}) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center gap-2.5 sm:gap-3 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_PATH}
        alt={siteConfig.siteTitle}
        width={size}
        height={size}
        className="block shrink-0 object-contain"
        style={{ width: size, height: size }}
      />
      {showName ? <BrandName variant={nameVariant} /> : null}
    </Link>
  );
}
