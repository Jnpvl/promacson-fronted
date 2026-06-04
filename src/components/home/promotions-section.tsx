"use client";

import Link from "next/link";
import { useRef } from "react";
import { siteConfig } from "@/config/site";

const PROMOS = siteConfig.promotions;

export function PromotionsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
              Ofertas y campañas
            </p>
            <h2 className="mt-1 text-2xl font-bold text-text sm:text-3xl">
              Aprovecha nuestras promociones
            </h2>
            <p className="mt-2 max-w-xl text-sm text-text-muted">
              Condiciones sujetas a disponibilidad. Solicita cotización para precio final.
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <ScrollButton direction="left" onClick={() => scroll("left")} />
            <ScrollButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROMOS.map((promo) => (
            <Link
              key={promo.id}
              href={promo.href}
              className="group relative w-[min(100%,320px)] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:border-brand-600 hover:shadow-lg sm:w-[300px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 opacity-95 transition group-hover:opacity-100" />
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />

              <div className="relative flex min-h-[220px] flex-col justify-between p-6 text-white">
                <div>
                  <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    {promo.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-bold leading-snug">{promo.title}</h3>
                  <p className="mt-2 text-sm text-brand-100">{promo.subtitle}</p>
                </div>

                <div className="mt-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-brand-100">Vigencia</p>
                    <p className="text-sm font-medium">{promo.validUntil}</p>
                    {"daysLeft" in promo && promo.daysLeft != null ? (
                      <p className="mt-1 text-xs text-white/80">
                        Solo quedan {promo.daysLeft} días
                      </p>
                    ) : null}
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-800 transition group-hover:bg-brand-50">
                    Ver más
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-center text-xs text-text-muted sm:hidden">
          Desliza para ver más promociones
        </p>
      </div>
    </section>
  );
}

function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-brand-700 shadow-sm transition hover:border-brand-600 hover:bg-brand-50"
      aria-label={direction === "left" ? "Promociones anteriores" : "Promociones siguientes"}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </button>
  );
}
