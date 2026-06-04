"use client";

import { useSearchParams } from "next/navigation";

type SearchFormProps = {
  className?: string;
  inputClassName?: string;
  showButton?: boolean;
};

export function SearchForm({ className, inputClassName, showButton = true }: SearchFormProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <form action="/buscar" method="get" role="search" className={className}>
      <div className={showButton ? "flex gap-2" : undefined}>
        <input
          type="search"
          name="q"
          key={query}
          defaultValue={query}
          placeholder="Productos, categorías, servicios o SKU…"
          className={showButton ? `min-w-0 flex-1 ${inputClassName ?? ""}`.trim() : inputClassName}
          aria-label="Buscar en Promacson"
          autoComplete="off"
          enterKeyHint="search"
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
