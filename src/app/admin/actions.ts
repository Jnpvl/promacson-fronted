"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { loginWithCredentials } from "@/lib/services/auth.service";
import { routes } from "@/lib/routes";

export type LoginFormState = {
  error?: string;
};

export async function loginAdminAction(
  _prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Correo y contraseña son obligatorios" };
  }

  const result = await loginWithCredentials({ email, password });
  if (!result.ok) {
    return { error: result.error };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_TOKEN_COOKIE, result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(routes.admin.sliders);
}
