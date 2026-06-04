import { NextResponse } from "next/server";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { loginWithCredentials } from "@/lib/api/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!body.email || !body.password) {
    return NextResponse.json(
      { error: "Correo y contraseña son obligatorios" },
      { status: 400 },
    );
  }

  const result = await loginWithCredentials({
    email: body.email,
    password: body.password,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 401 });
  }

  const response = NextResponse.json({ user: result.user });
  response.cookies.set(ADMIN_TOKEN_COOKIE, result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
