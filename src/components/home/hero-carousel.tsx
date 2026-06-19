"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { MediaImage } from "@/components/ui/media-image";
import {
  heroSlideFrameClass,
  heroSlideImageClass,
} from "@/lib/hero-slide-layout";
import type { HeroSlide } from "@/types/hero-slide";

const INTERVAL_MS = 6000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActive((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  if (slides.length === 0) return null;

  const hasControls = slides.length > 1;

  return (
    <section
      className="relative w-full overflow-hidden bg-black text-white"
      aria-roledescription="carousel"
      aria-label="Destacados"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full">
        <div
          className="flex w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <article
              key={slide.id}
              className="relative w-full shrink-0 grow-0 basis-full"
              aria-hidden={index !== active}
            >
              <div className={heroSlideFrameClass}>
                {slide.imageUrl ? (
                  <>
                    <MediaImage
                      src={slide.imageUrl}
                      fill
                      priority={index === 0}
                      className={heroSlideImageClass}
                      alt={slide.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/75 via-black/40 to-black/15 sm:from-black/60 sm:via-black/30 sm:to-transparent" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-700/95 to-brand-600/80" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.15),transparent_55%)]" />
                  </>
                )}

                <div className="absolute inset-0 flex flex-col items-end justify-end p-4 pb-5 text-right sm:justify-center sm:p-6 sm:pb-14 lg:px-10 lg:pb-16">
                  <div className="mx-auto w-full max-w-7xl px-2 sm:px-4">
                    <div className="ml-auto max-w-xl">
                      {slide.eyebrow ? (
                        <p className="line-clamp-2 text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                          {slide.eyebrow}
                        </p>
                      ) : null}
                      {index === active ? (
                        <h1 className="mt-2 line-clamp-3 text-xl font-bold leading-tight tracking-tight sm:line-clamp-4 sm:text-3xl md:text-4xl lg:text-5xl">
                          {slide.title}
                        </h1>
                      ) : (
                        <h2 className="mt-2 line-clamp-3 text-xl font-bold leading-tight tracking-tight sm:line-clamp-4 sm:text-3xl md:text-4xl lg:text-5xl">
                          {slide.title}
                        </h2>
                      )}
                      {slide.description ? (
                        <p className="mt-2 line-clamp-2 text-sm text-white/90 sm:mt-3 sm:line-clamp-3 sm:text-lg">
                          {slide.description}
                        </p>
                      ) : null}

                      {slide.cta || slide.secondaryCta ? (
                        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 sm:mt-6 sm:gap-3">
                          {slide.cta ? (
                            <Link
                              href={slide.cta.href}
                              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm transition hover:bg-brand-50 sm:rounded-lg sm:px-6 sm:py-3"
                            >
                              {slide.cta.label}
                            </Link>
                          ) : null}
                          {slide.secondaryCta ? (
                            <Link
                              href={slide.secondaryCta.href}
                              className="inline-flex items-center justify-center rounded-full px-3 py-2 text-sm font-medium text-white/95 underline-offset-2 transition hover:text-white sm:rounded-lg sm:border sm:border-white/40 sm:bg-white/10 sm:px-6 sm:py-3 sm:font-semibold sm:no-underline sm:hover:bg-white/20"
                            >
                              {slide.secondaryCta.label}
                            </Link>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {hasControls ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/45 sm:left-6 sm:flex lg:left-10"
              aria-label="Anterior"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/45 sm:right-6 sm:flex lg:right-10"
              aria-label="Siguiente"
            >
              <ChevronRight />
            </button>

            <div className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 hidden justify-center gap-2 sm:flex">
              <div className="pointer-events-auto flex gap-2">
                {slides.map((slide, i) => (
                  <DotButton key={slide.id} index={i} active={active} onGo={goTo} label={slide.title} />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/35 px-4 py-3 backdrop-blur-sm sm:hidden">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
                aria-label="Anterior"
              >
                <ChevronLeft />
              </button>
              <div className="flex min-w-0 flex-1 justify-center gap-2">
                {slides.map((slide, i) => (
                  <DotButton key={slide.id} index={i} active={active} onGo={goTo} label={slide.title} />
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
                aria-label="Siguiente"
              >
                <ChevronRight />
              </button>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function DotButton({
  index,
  active,
  onGo,
  label,
}: {
  index: number;
  active: number;
  onGo: (index: number) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onGo(index)}
      className={`h-2.5 rounded-full transition-all ${
        index === active ? "w-8 bg-white" : "w-2.5 bg-white/40 hover:bg-white/60"
      }`}
      aria-label={`Ir a slide ${index + 1}: ${label}`}
      aria-current={index === active}
    />
  );
}

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
