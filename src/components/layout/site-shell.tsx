import type { ReactNode } from "react";
import { getSiteContact } from "@/lib/site-contact";
import { getServices } from "@/lib/services/services.service";
import { Footer } from "./footer";
import { Header } from "./header";
import { MobileQuoteBar } from "./mobile-quote-bar";

export async function SiteShell({ children }: { children: ReactNode }) {
  const [contact, services] = await Promise.all([getSiteContact(), getServices()]);

  return (
    <>
      <Header contact={contact} />
      <main className="flex-1">{children}</main>
      <Footer contact={contact} services={services} />
      <MobileQuoteBar contact={contact} />
    </>
  );
}
