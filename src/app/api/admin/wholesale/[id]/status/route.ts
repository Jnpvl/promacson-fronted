import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { ApiError } from "@/lib/api/types";
import type { WholesaleInquiryRecord } from "@/types/wholesale-inquiry";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const inquiry = await adminApiRequest<WholesaleInquiryRecord>(
      `/api/v1/admin/wholesale/${id}/status`,
      {
        method: "PATCH",
        json: body,
      },
    );
    return NextResponse.json(inquiry);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al actualizar estatus" }, { status: 500 });
  }
}
