import type { ReactNode } from "react";

export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: "default" | "brand" }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        variant === "brand" ? "bg-brand-100 text-brand-800" : "bg-slate-100 text-slate-700"
      }`}
    >
      {children}
    </span>
  );
}
