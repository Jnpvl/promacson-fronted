import { NextResponse } from "next/server";
import { getAdminToken } from "@/lib/admin-server-api";
import { buildApiUrl } from "@/lib/api/config";

export async function POST(request: Request) {
  const token = await getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const incoming = await request.formData();
    const files = incoming.getAll("images").filter((f): f is File => f instanceof File);
    if (!files.length) {
      return NextResponse.json({ error: "No se recibió ninguna imagen" }, { status: 400 });
    }

    const form = new FormData();
    for (const file of files) {
      form.append("images", file);
    }

    const url = buildApiUrl("/api/v1/admin/products/upload/images");
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      cache: "no-store",
    });

    const data = (await res.json()) as { urls?: string[]; error?: string };
    if (!res.ok || !data.urls?.length) {
      return NextResponse.json({ error: data.error ?? "Error al subir imágenes" }, { status: res.status });
    }

    return NextResponse.json({ urls: data.urls }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al subir imágenes" }, { status: 500 });
  }
}
