export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type AdminActiveFilter = "all" | "active" | "inactive";

export type AdminListFilters = {
  page: number;
  pageSize: number;
  q: string;
  active: AdminActiveFilter;
  /** Cotizaciones / mayoreo */
  status?:
    | "all"
    | "NEW"
    | "QUOTE_SENT"
    | "PURCHASED"
    | "CONTACTED"
    | "CLOSED";
};

export const DEFAULT_ADMIN_LIST_FILTERS: AdminListFilters = {
  page: 1,
  pageSize: 10,
  q: "",
  active: "all",
  status: "all",
};

export function buildAdminListQuery(filters: AdminListFilters): string {
  const params = new URLSearchParams();
  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));
  if (filters.q.trim()) params.set("q", filters.q.trim());
  if (filters.active !== "all") params.set("active", filters.active);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  return params.toString();
}

export function parseAdminListFilters(searchParams: URLSearchParams): AdminListFilters {
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(
    50,
    Math.max(5, Number.parseInt(searchParams.get("pageSize") ?? "10", 10) || 10),
  );
  const q = searchParams.get("q") ?? "";

  let active: AdminActiveFilter = "all";
  const activeParam = searchParams.get("active");
  if (activeParam === "active" || activeParam === "true") active = "active";
  if (activeParam === "inactive" || activeParam === "false") active = "inactive";

  let status: AdminListFilters["status"] = "all";
  const statusParam = searchParams.get("status");
  if (
    statusParam === "NEW" ||
    statusParam === "QUOTE_SENT" ||
    statusParam === "PURCHASED" ||
    statusParam === "CONTACTED" ||
    statusParam === "CLOSED"
  ) {
    status = statusParam;
  }

  return { page, pageSize, q, active, status };
}
