import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateCategories } from "@/lib/revalidate-categories";
import { ApiError } from "@/lib/api/types";
import type { CategoryRecord } from "@/types/category";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const category = await adminApiRequest<CategoryRecord>(`/api/v1/admin/categories/${id}`);
    return NextResponse.json(category);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener categoría" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const category = await adminApiRequest<CategoryRecord>(`/api/v1/admin/categories/${id}`, {
      method: "PUT",
      json: body,
    });
    revalidateCategories();
    return NextResponse.json(category);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al actualizar categoría" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await adminApiRequest<void>(`/api/v1/admin/categories/${id}`, { method: "DELETE" });
    revalidateCategories();
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al eliminar categoría" }, { status: 500 });
  }
}
