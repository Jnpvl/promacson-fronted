import { Suspense } from "react";
import Link from "next/link";
import { phoneHref } from "@/lib/site-contact-utils";
import { routes } from "@/lib/routes";
import { QuoteNavLink } from "@/components/quote/quote-nav-link";
import { Logo } from "@/components/ui/logo";
import { SearchForm } from "@/components/layout/search-form";
import type { SiteContact } from "@/types/site-contact";

const NAV = [
  { href: routes.catalog, label: "Catálogo" },
  { href: routes.services, label: "Servicios" },
  { href: routes.about, label: "Nosotros" },
  { href: routes.wholesale, label: "Mayoreo" },
] as const;

const DESKTOP_INPUT_CLASS =
  "rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

const MOBILE_INPUT_CLASS =
  "rounded-lg border border-border bg-surface-muted px-4 py-3 text-base outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:py-2.5 sm:text-sm";

function SearchFormFallback({
  className,
  inputClassName,
  showButton,
}: {
  className?: string;
  inputClassName?: string;
  showButton?: boolean;
}) {
  return (
    <form action="/buscar" method="get" role="search" className={className}>
      <div className={showButton ? "flex gap-2" : undefined}>
        <input
          type="search"
          name="q"
          placeholder="Productos, categorías, servicios o SKU…"
          className={showButton ? `min-w-0 flex-1 ${inputClassName ?? ""}`.trim() : inputClassName}
          aria-label="Buscar en Promacson"
        />
        {showButton ? (
          <button
            type="submit"
            className="shrink-0 rounded-lg bg-brand-700 px-3 py-2.5 text-sm font-medium text-white hover:bg-brand-800 sm:px-4"
          >
            Buscar
          </button>
        ) : null}
      </div>
    </form>
  );
}

export function Header({ contact }: { contact: SiteContact }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-[4.5rem] items-center gap-4 lg:gap-8">
          <Logo size={40} className="mr-1" />

          <Suspense
            fallback={
              <SearchFormFallback
                className="hidden min-w-0 flex-1 lg:block"
                inputClassName={DESKTOP_INPUT_CLASS}
                showButton
              />
            }
          >
            <SearchForm className="hidden min-w-0 flex-1 lg:block" inputClassName={DESKTOP_INPUT_CLASS} />
          </Suspense>

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-text-muted hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={phoneHref(contact)}
              className="hidden text-sm text-text-muted xl:inline"
            >
              {contact.phone}
            </a>
            <QuoteNavLink />
          </div>
        </div>

        <nav
          className="flex gap-4 overflow-x-auto border-t border-border py-2.5 text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden"
          aria-label="Principal móvil"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-medium text-text-muted hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Suspense
          fallback={
            <SearchFormFallback className="pb-3 pt-1 lg:hidden" inputClassName={MOBILE_INPUT_CLASS} showButton />
          }
        >
          <SearchForm className="pb-3 pt-1 lg:hidden" inputClassName={MOBILE_INPUT_CLASS} />
        </Suspense>
      </div>
    </header>
  );
}
