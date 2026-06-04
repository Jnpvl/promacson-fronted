import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { revalidateProducts } from "@/lib/revalidate-products";
import { ApiError } from "@/lib/api/types";
import type { ProductRecord } from "@/types/product";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const product = await adminApiRequest<ProductRecord>(`/api/v1/admin/products/${id}`);
    return NextResponse.json(product);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  try {
    const body = await request.json();
    const product = await adminApiRequest<ProductRecord>(`/api/v1/admin/products/${id}`, {
      method: "PUT",
      json: body,
    });
    revalidateProducts();
    return NextResponse.json(product);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  try {
    await adminApiRequest<void>(`/api/v1/admin/products/${id}`, { method: "DELETE" });
    revalidateProducts();
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}
