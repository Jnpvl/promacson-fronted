import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateCategories } from "@/lib/revalidate-categories";
import { ApiError } from "@/lib/api/types";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const categories = await adminApiRequest<{ ok: true }>(
      `/api/v1/admin/categories/${id}/move`,
      { method: "PATCH", json: body },
    );
    revalidateCategories();
    return NextResponse.json(categories);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al reordenar" }, { status: 500 });
  }
}
