import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateHomeSliders } from "@/lib/revalidate-sliders";
import { ApiError } from "@/lib/api/types";
import type { SliderRecord } from "@/types/hero-slide";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const slider = await adminApiRequest<SliderRecord>(`/api/v1/admin/sliders/${id}`);
    return NextResponse.json(slider);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener slider" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const slider = await adminApiRequest<SliderRecord>(`/api/v1/admin/sliders/${id}`, {
      method: "PUT",
      json: body,
    });
    revalidateHomeSliders();
    return NextResponse.json(slider);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al actualizar slider" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await adminApiRequest<void>(`/api/v1/admin/sliders/${id}`, { method: "DELETE" });
    revalidateHomeSliders();
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al eliminar slider" }, { status: 500 });
  }
}
