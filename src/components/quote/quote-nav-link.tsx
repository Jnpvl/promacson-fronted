"use client";

import Link from "next/link";
import { routes } from "@/lib/routes";
import { useQuoteCart } from "@/contexts/quote-cart-context";

type QuoteNavLinkProps = {
  className?: string;
  showLabel?: boolean;
};

export function QuoteNavLink({ className = "", showLabel = true }: QuoteNavLinkProps) {
  const { totalUnits, justAdded } = useQuoteCart();

  return (
    <Link
      href={routes.quote}
      className={`inline-flex items-center justify-center rounded-lg bg-brand-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-brand-800 sm:px-4 ${
        justAdded ? "animate-pulse ring-2 ring-brand-300 ring-offset-1" : ""
      } ${className}`.trim()}
    >
      {showLabel ? (
        <>
          <span className="hidden sm:inline">Cotización </span>
          <span>({totalUnits})</span>
        </>
      ) : (
        <span>Cotización ({totalUnits})</span>
      )}
    </Link>
  );
}
