import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { revalidateCategories } from "@/lib/revalidate-categories";
import { ApiError } from "@/lib/api/types";
import type { PaginatedResult } from "@/types/admin-list";
import type { CategoryRecord } from "@/types/category";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const path = qs
      ? `${apiEndpoints.categories.admin}?${qs}`
      : apiEndpoints.categories.admin;
    const categories = await adminApiRequest<PaginatedResult<CategoryRecord>>(path);
    return NextResponse.json(categories);
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener categorías" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = await adminApiRequest<CategoryRecord>(apiEndpoints.categories.admin, {
      method: "POST",
      json: body,
    });
    revalidateCategories();
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al crear categoría" }, { status: 500 });
  }
}
