import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { revalidateHomeSliders } from "@/lib/revalidate-sliders";
import { ApiError } from "@/lib/api/types";
import type { SliderRecord } from "@/types/hero-slide";

export async function GET() {
  try {
    const sliders = await adminApiRequest<SliderRecord[]>(apiEndpoints.sliders.admin);
    return NextResponse.json(sliders);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener sliders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slider = await adminApiRequest<SliderRecord>(apiEndpoints.sliders.admin, {
      method: "POST",
      json: body,
    });
    revalidateHomeSliders();
    return NextResponse.json(slider, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al crear slider" }, { status: 500 });
  }
}
