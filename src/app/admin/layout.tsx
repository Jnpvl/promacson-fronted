import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
  // Sin canonical: no heredar el de la home (señal contradictoria con noindex).
  alternates: { canonical: null },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen pb-0">{children}</div>;
}
