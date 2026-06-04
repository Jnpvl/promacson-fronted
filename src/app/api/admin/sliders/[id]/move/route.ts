import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateHomeSliders } from "@/lib/revalidate-sliders";
import { ApiError } from "@/lib/api/types";
import type { SliderRecord } from "@/types/hero-slide";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const body = (await request.json()) as { direction?: string };
    const sliders = await adminApiRequest<SliderRecord[]>(
      `/api/v1/admin/sliders/${id}/move`,
      { method: "PATCH", json: body },
    );
    revalidateHomeSliders();
    return NextResponse.json(sliders);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al reordenar" }, { status: 500 });
  }
}
