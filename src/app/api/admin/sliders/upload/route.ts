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
    const file = incoming.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No se recibió ninguna imagen" }, { status: 400 });
    }

    const form = new FormData();
    form.append("image", file);

    const url = buildApiUrl("/api/v1/admin/sliders/upload/image");
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      cache: "no-store",
    });

    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      return NextResponse.json({ error: data.error ?? "Error al subir imagen" }, { status: res.status });
    }

    return NextResponse.json({ url: data.url }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}
