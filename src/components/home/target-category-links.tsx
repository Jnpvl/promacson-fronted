import Link from "next/link";
import { routes } from "@/lib/routes";

const targetLinks = [
  { label: "Guantes", href: routes.category("equipo-medico") },
  { label: "Gasas estériles", href: routes.category("material-de-curacion") },
  { label: "Jeringas", href: routes.category("equipo-medico") },
  { label: "Cubrebocas", href: routes.category("equipo-medico") },
];

export function TargetCategoryLinks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-2xl font-bold text-text">
        Guantes, gasas estériles, jeringas y cubrebocas
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {targetLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-800 hover:bg-brand-100"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
