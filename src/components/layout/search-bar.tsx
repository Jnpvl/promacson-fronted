type SearchBarProps = {
  query?: string;
  className?: string;
  size?: "default" | "large";
};

const INPUT_DEFAULT =
  "min-w-0 flex-1 rounded-lg border border-border bg-surface-muted px-4 py-2.5 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100";

const INPUT_LARGE =
  "min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-3 text-base outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 sm:text-sm";

const BUTTON =
  "shrink-0 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-brand-800";

/** Formulario GET a /buscar — usable en Server Components. */
export function SearchBar({ query = "", className = "", size = "default" }: SearchBarProps) {
  return (
    <form action="/buscar" method="get" role="search" className={className}>
      <div className="flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Productos, categorías, servicios o SKU…"
          className={size === "large" ? INPUT_LARGE : INPUT_DEFAULT}
          aria-label="Buscar en Promacson"
          autoComplete="off"
          enterKeyHint="search"
        />
        <button type="submit" className={BUTTON}>
          Buscar
        </button>
      </div>
    </form>
  );
}
