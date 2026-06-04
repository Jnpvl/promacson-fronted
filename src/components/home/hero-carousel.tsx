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
            <SlidePanel
              key={slide.id}
              slide={slide}
              index={index}
              active={active}
            />
          ))}
        </div>

        {hasControls ? (
          <CarouselControls
            slides={slides}
            active={active}
            onPrev={prev}
            onNext={next}
            onGo={goTo}
          />
        ) : null}
      </div>
    </section>
  );
}

function SlidePanel({
  slide,
  index,
  active,
}: {
  slide: HeroSlide;
  index: number;
  active: number;
}) {
  const hasImage = Boolean(slide.imageUrl);
  const hasCta = Boolean(slide.cta || slide.secondaryCta);
  const showTextOverlay = !hasImage;

  return (
    <article
      className="relative w-full shrink-0 grow-0 basis-full"
      aria-hidden={index !== active}
      aria-label={slide.title}
    >
      <div className={heroSlideFrameClass}>
        {hasImage ? (
          <>
            <MediaImage
              src={slide.imageUrl!}
              fill
              priority={index === 0}
              className={heroSlideImageClass}
            />
            {/* Banner con arte integrado (marca izq., producto der.): poco velo arriba */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/55 via-black/20 to-transparent sm:h-[32%]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-700/95 to-brand-600/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(255,255,255,0.15),transparent_55%)]" />
          </>
        )}

        {showTextOverlay ? (
          <div className="absolute inset-0 flex flex-col justify-end p-4 pb-16 sm:justify-center sm:p-6 sm:pb-20 lg:px-10">
            <div className="mx-auto w-full max-w-7xl px-2 sm:px-4">
              {slide.eyebrow ? (
                <p className="line-clamp-2 text-xs font-semibold uppercase tracking-wider text-white/90 sm:text-sm">
                  {slide.eyebrow}
                </p>
              ) : null}
              <h1 className="mt-2 line-clamp-3 text-xl font-bold leading-tight tracking-tight sm:line-clamp-4 sm:text-3xl md:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              {slide.description ? (
                <p className="mt-2 line-clamp-2 max-w-xl text-sm text-white/90 sm:mt-3 sm:line-clamp-3 sm:text-lg">
                  {slide.description}
                </p>
              ) : null}
              {hasCta ? (
                <SlideCtaRow slide={slide} className="mt-4 sm:mt-6" />
              ) : null}
            </div>
          </div>
        ) : (
          <>
            <h1 className="sr-only">{slide.title}</h1>
            {hasCta ? (
              <div className="absolute bottom-14 right-3 z-10 sm:bottom-16 sm:right-6 lg:bottom-[4.5rem] lg:right-10">
                <SlideCtaRow slide={slide} align="end" />
              </div>
            ) : null}
          </>
        )}
      </div>
    </article>
  );
}

function SlideCtaRow({
  slide,
  className = "",
  align = "start",
}: {
  slide: HeroSlide;
  className?: string;
  align?: "start" | "end";
}) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 sm:gap-3 ${
        align === "end" ? "justify-end" : ""
      } ${className}`}
    >
      {slide.cta ? (
        <Link
          href={slide.cta.href}
          className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-md transition hover:bg-brand-50 sm:rounded-lg sm:px-6 sm:py-3"
        >
          {slide.cta.label}
        </Link>
      ) : null}
      {slide.secondaryCta ? (
        <Link
          href={slide.secondaryCta.href}
          className="inline-flex items-center justify-center rounded-full border border-white/50 bg-black/25 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-black/40 sm:rounded-lg sm:px-6 sm:py-3 sm:font-semibold"
        >
          {slide.secondaryCta.label}
        </Link>
      ) : null}
    </div>
  );
}

function CarouselControls({
  slides,
  active,
  onPrev,
  onNext,
  onGo,
}: {
  slides: HeroSlide[];
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onGo: (index: number) => void;
}) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 border-t border-white/10 bg-black/45 px-3 py-2.5 backdrop-blur-md sm:gap-4 sm:px-6 sm:py-3"
      aria-label="Controles del carrusel"
    >
      <button
        type="button"
        onClick={onPrev}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:h-10 sm:w-10"
        aria-label="Anterior"
      >
        <ChevronLeft />
      </button>

      <div className="flex min-w-0 flex-1 justify-center gap-2">
        {slides.map((slide, i) => (
          <DotButton
            key={slide.id}
            index={i}
            active={active}
            onGo={onGo}
            label={slide.title}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:h-10 sm:w-10"
        aria-label="Siguiente"
      >
        <ChevronRight />
      </button>
    </div>
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
