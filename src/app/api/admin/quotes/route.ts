import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { PaginatedResult } from "@/types/admin-list";
import type { QuoteRecord } from "@/types/quote";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const path = qs ? `${apiEndpoints.quotes.admin}?${qs}` : apiEndpoints.quotes.admin;
    const quotes = await adminApiRequest<PaginatedResult<QuoteRecord>>(path);
    return NextResponse.json(quotes);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener cotizaciones" }, { status: 500 });
  }
}
