"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { BrandName } from "@/components/ui/brand-name";
import { routes } from "@/lib/routes";

const navItems = [
  { label: "Sliders", href: routes.admin.sliders },
  { label: "Categorías", href: routes.admin.categories },
  { label: "Productos", href: routes.admin.products },
  { label: "Servicios", href: routes.admin.services },
  { label: "Cotizaciones", href: routes.admin.quotes },
  { label: "Mayoreo", href: routes.admin.wholesale },
  { label: "Contacto sitio", href: routes.admin.siteContact },
] as const;

export function AdminShell({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push(routes.admin.root);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface">
        <div className="border-b border-border px-5 py-5">
          <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
            Administración
          </p>
          <BrandName />
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-brand-50 text-brand-800"
                        : "text-text-muted hover:bg-brand-50 hover:text-brand-800"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border px-5 py-4">
          <p className="truncate text-xs text-text-muted">{userEmail}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 text-sm font-medium text-brand-700 hover:text-brand-800"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
