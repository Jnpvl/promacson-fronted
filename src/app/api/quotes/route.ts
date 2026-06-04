import { NextResponse } from "next/server";
import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { QuoteRecord } from "@/types/quote";

export async function POST(request: Request) {
  if (!hasApiClient()) {
    return NextResponse.json({ error: "API no configurada" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const quote = await apiClient.post<QuoteRecord>(apiEndpoints.quotes.public, body);
    return NextResponse.json(quote, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al enviar cotización" }, { status: 500 });
  }
}
