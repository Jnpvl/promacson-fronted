import { NextResponse } from "next/server";
import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { WholesaleInquiryRecord } from "@/types/wholesale-inquiry";

export async function POST(request: Request) {
  if (!hasApiClient()) {
    return NextResponse.json({ error: "API no configurada" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const inquiry = await apiClient.post<WholesaleInquiryRecord>(
      apiEndpoints.wholesale.public,
      body,
    );
    return NextResponse.json(inquiry, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al enviar solicitud" }, { status: 500 });
  }
}
