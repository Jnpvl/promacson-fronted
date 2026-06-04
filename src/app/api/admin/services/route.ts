import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { revalidateServices } from "@/lib/revalidate-services";
import { ApiError } from "@/lib/api/types";
import type { ServiceRecord } from "@/types/service";

export async function GET() {
  try {
    const services = await adminApiRequest<ServiceRecord[]>(apiEndpoints.services.admin);
    return NextResponse.json(services);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener servicios" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await adminApiRequest<ServiceRecord>(apiEndpoints.services.admin, {
      method: "POST",
      json: body,
    });
    revalidateServices();
    return NextResponse.json(service, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al crear servicio" }, { status: 500 });
  }
}
