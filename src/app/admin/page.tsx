import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { BrandName } from "@/components/ui/brand-name";
import { ADMIN_TOKEN_COOKIE } from "@/lib/admin-auth";
import { getCurrentAdminUser } from "@/lib/services/auth.service";
import { routes } from "@/lib/routes";

type PageProps = {
  searchParams: Promise<{ email?: string; password?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Evita credenciales expuestas en la URL por submit GET accidental
  if (params.email || params.password) {
    redirect(routes.admin.root);
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;

  if (token) {
    const user = await getCurrentAdminUser(token);
    if (user) {
      redirect(routes.admin.sliders);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <BrandName />
          </div>
          <p className="mt-3 text-sm text-text-muted">Panel de administración</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
