import Link from "next/link";
import { homeExactLinks } from "@/content/home-seo";

export function TargetCategoryLinks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h2 className="text-2xl font-bold text-text">Empieza por una categoría</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {homeExactLinks.map((link) => (
          <Link
            key={link.href}
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
