import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateServices } from "@/lib/revalidate-services";
import { ApiError } from "@/lib/api/types";
import type { ServiceRecord } from "@/types/service";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const service = await adminApiRequest<ServiceRecord>(`/api/v1/admin/services/${id}`);
    return NextResponse.json(service);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener servicio" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const service = await adminApiRequest<ServiceRecord>(`/api/v1/admin/services/${id}`, {
      method: "PUT",
      json: body,
    });
    revalidateServices();
    return NextResponse.json(service);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al actualizar servicio" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await adminApiRequest<void>(`/api/v1/admin/services/${id}`, { method: "DELETE" });
    revalidateServices();
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al eliminar servicio" }, { status: 500 });
  }
}
