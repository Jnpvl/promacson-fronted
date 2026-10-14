import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/** Tags usados por los fetch de catálogo (src/lib/services/*.service.ts). */
const TAG_PATTERN =
  /^(products|products-all|products-featured|products-[a-z0-9-]+|product-[a-z0-9-]+|categories|category-[a-z0-9-]+|hero-slides|services|service-[a-z0-9-]+|site-contact)$/;

function secretMatches(given: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Revalidación bajo demanda para el backend.
 * POST /api/revalidate  header `x-revalidate-secret: <REVALIDATE_SECRET>`
 * body JSON: { "tags"?: string[], "tag"?: string, "paths"?: string[], "path"?: string }
 */
export async function POST(req: NextRequest) {
  if (!process.env.REVALIDATE_SECRET?.trim()) {
    return NextResponse.json({ error: "Revalidación no configurada" }, { status: 503 });
  }
  if (!secretMatches(req.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: { tag?: unknown; tags?: unknown; path?: unknown; paths?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const list = (one: unknown, many: unknown): string[] =>
    [...(Array.isArray(many) ? many : []), one].filter(
      (v): v is string => typeof v === "string" && v.trim() !== "",
    );
  const tags = list(body.tag, body.tags).map((t) => t.trim());
  const paths = list(body.path, body.paths).map((p) => p.trim());

  if (!tags.length && !paths.length) {
    return NextResponse.json({ error: "Falta tag o path" }, { status: 400 });
  }
  const badTag = tags.find((t) => !TAG_PATTERN.test(t));
  if (badTag) return NextResponse.json({ error: `Tag no permitido: ${badTag}` }, { status: 400 });
  const badPath = paths.find((p) => !p.startsWith("/") || p.startsWith("//") || p.length > 200);
  if (badPath) return NextResponse.json({ error: `Path inválido: ${badPath}` }, { status: 400 });

  for (const tag of tags) revalidateTag(tag, "max");
  for (const path of paths) revalidatePath(path);

  return NextResponse.json({ revalidated: true, tags, paths, now: Date.now() });
}
