"use client";

import { whatsappHref } from "@/lib/site-contact-utils";
import { Button } from "@/components/ui/button";
import { QuoteNavLink } from "@/components/quote/quote-nav-link";
import type { SiteContact } from "@/types/site-contact";

export function MobileQuoteBar({ contact }: { contact: SiteContact }) {
  return (
    <div className="mobile-quote-bar fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg md:hidden">
      <div className="flex gap-2">
        <QuoteNavLink className="flex-1 !px-3 !py-2.5" showLabel={false} />
        <Button
          href={whatsappHref(contact)}
          variant="outline"
          className="shrink-0 !border-brand-700 !text-brand-700"
        >
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
