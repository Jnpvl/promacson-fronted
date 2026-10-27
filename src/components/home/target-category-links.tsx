import Link from "next/link";
import { homeExactLinks } from "@/content/home-seo";

export function TargetCategoryLinks() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-text sm:text-2xl">Empieza por una categoría</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {homeExactLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex h-full items-center justify-between gap-3 rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm font-medium text-brand-800 transition hover:border-brand-600 hover:bg-brand-50"
            >
              <span>{link.label}</span>
              <ArrowIcon />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0 text-brand-600"
      aria-hidden
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
