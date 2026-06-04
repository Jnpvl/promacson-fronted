import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateServices } from "@/lib/revalidate-services";
import { ApiError } from "@/lib/api/types";
import type { ServiceRecord } from "@/types/service";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const services = await adminApiRequest<ServiceRecord[]>(`/api/v1/admin/services/${id}/move`, {
      method: "PATCH",
      json: body,
    });
    revalidateServices();
    return NextResponse.json(services);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al reordenar" }, { status: 500 });
  }
}
