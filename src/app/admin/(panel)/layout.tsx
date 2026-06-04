import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { getCurrentAdminUser } from "@/lib/services/auth.service";
import { routes } from "@/lib/routes";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (!token) {
    redirect(routes.admin.root);
  }

  const user = await getCurrentAdminUser(token);
  if (!user) {
    redirect(routes.admin.root);
  }

  return <AdminShell userEmail={user.email}>{children}</AdminShell>;
}
