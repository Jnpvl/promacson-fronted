import { NextResponse } from "next/server";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { revalidateSiteContact } from "@/lib/revalidate-site-contact";
import { normalizeSiteContact } from "@/lib/services/site-contact.service";
import { ApiError } from "@/lib/api/types";
import type { SiteContact } from "@/types/site-contact";

export async function GET() {
  try {
    const data = await adminApiRequest<unknown>(apiEndpoints.site.adminContact);
    return NextResponse.json(normalizeSiteContact(data));
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al obtener contacto" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const contact = await adminApiRequest<SiteContact>(apiEndpoints.site.adminContact, {
      method: "PUT",
      json: body,
    });
    revalidateSiteContact();
    return NextResponse.json(normalizeSiteContact(contact));
  } catch (err) {
    if (err instanceof ApiError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    return NextResponse.json({ error: "Error al guardar contacto" }, { status: 500 });
  }
}
