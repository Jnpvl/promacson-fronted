import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { ApiError } from "@/lib/api/types";
import type { PaginatedResult } from "@/types/admin-list";
import type { WholesaleInquiryRecord } from "@/types/wholesale-inquiry";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const path = qs ? `${apiEndpoints.wholesale.admin}?${qs}` : apiEndpoints.wholesale.admin;
    const data = await adminApiRequest<PaginatedResult<WholesaleInquiryRecord>>(path);
    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
  }
}
