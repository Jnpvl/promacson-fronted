"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  buildAdminListQuery,
  parseAdminListFilters,
  type AdminListFilters,
  type PaginatedResult,
} from "@/types/admin-list";

export function useAdminList<T>(apiPath: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => parseAdminListFilters(searchParams),
    [searchParams],
  );

  const queryKey = buildAdminListQuery(filters);
  const [data, setData] = useState<PaginatedResult<T> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiPath}?${queryKey}`);
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        console.warn("[admin-list]", apiPath, res.status, body?.error);
        setData({ items: [], total: 0, page: filters.page, pageSize: filters.pageSize, totalPages: 1 });
        return;
      }
      const body = await res.json();
      const normalized: PaginatedResult<T> = Array.isArray(body)
        ? {
            items: body as T[],
            total: body.length,
            page: filters.page,
            pageSize: filters.pageSize,
            totalPages: Math.max(1, Math.ceil(body.length / filters.pageSize)),
          }
        : (body as PaginatedResult<T>);
      setData(normalized);
    } catch {
      setData({ items: [], total: 0, page: filters.page, pageSize: filters.pageSize, totalPages: 1 });
    } finally {
      setLoading(false);
    }
  }, [apiPath, queryKey, filters.page, filters.pageSize]);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  const setFilters = useCallback(
    (next: Partial<AdminListFilters>) => {
      const merged: AdminListFilters = { ...filters, ...next };
      const qs = buildAdminListQuery(merged);
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [filters, pathname, router],
  );

  return { filters, data, loading, setFilters, refetch: fetchList };
}
