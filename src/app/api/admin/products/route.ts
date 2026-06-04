import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { revalidateProducts } from "@/lib/revalidate-products";
import { ApiError } from "@/lib/api/types";
import type { PaginatedResult } from "@/types/admin-list";
import type { ProductRecord } from "@/types/product";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const path = qs ? `${apiEndpoints.products.admin}?${qs}` : apiEndpoints.products.admin;
    const products = await adminApiRequest<PaginatedResult<ProductRecord>>(path);
    return NextResponse.json(products);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await adminApiRequest<ProductRecord>(apiEndpoints.products.admin, {
      method: "POST",
      json: body,
    });
    revalidateProducts();
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
