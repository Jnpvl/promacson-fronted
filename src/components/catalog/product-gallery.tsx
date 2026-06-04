"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MediaImage } from "@/components/ui/media-image";
import {
  productGalleryFrameClass,
  productGalleryImageClass,
  productGalleryThumbFrameClass,
  productGalleryThumbImageClass,
  productGalleryThumbStripClass,
} from "@/lib/product-image-layout";
import { resolveMediaUrl } from "@/lib/media-url";

type ProductGalleryProps = {
  images: string[];
  alt: string;
};

const SWIPE_THRESHOLD_PX = 48;

function ThumbnailStrip({
  images,
  alt,
  selectedIndex,
  onSelect,
  variant = "inline",
}: {
  images: string[];
  alt: string;
  selectedIndex: number;
  onSelect: (index: number) => void;
  variant?: "inline" | "lightbox";
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = thumbRefs.current[selectedIndex];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [selectedIndex]);

  return (
    <div
      ref={stripRef}
      className={`${productGalleryThumbStripClass} ${
        variant === "lightbox" ? "justify-start px-2" : "-mx-1 px-1 sm:mx-0"
      }`}
      role="tablist"
      aria-label="Imágenes del producto"
      onClick={(e) => e.stopPropagation()}
    >
      {images.map((url, index) => {
        const isActive = index === selectedIndex;
        return (
          <button
            key={`${url}-${index}`}
            ref={(node) => {
              thumbRefs.current[index] = node;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(index)}
            className={`${productGalleryThumbFrameClass} snap-center cursor-pointer border-2 transition active:scale-95 ${
              isActive
                ? "border-brand-600 ring-2 ring-brand-600/25"
                : variant === "lightbox"
                  ? "border-white/30 opacity-70 hover:opacity-100"
                  : "border-border opacity-80 hover:border-brand-500 hover:opacity-100"
            }`}
          >
            <MediaImage
              src={url}
              alt={`${alt} — imagen ${index + 1}`}
              fill
              className={productGalleryThumbImageClass}
              sizes="80px"
            />
          </button>
        );
      })}
    </div>
  );
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const count = images.length;
  const safeIndex = count ? Math.min(selected, count - 1) : 0;
  const current = images[safeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (!count) return;
      const next = ((index % count) + count) % count;
      setSelected(next);
    },
    [count],
  );

  const handleTouchStart = useCallback((clientX: number) => {
    touchStartX.current = clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (clientX: number) => {
      if (touchStartX.current === null || count < 2) return;
      const delta = clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
      if (delta < 0) goTo(safeIndex + 1);
      else goTo(safeIndex - 1);
    },
    [count, goTo, safeIndex],
  );

  useEffect(() => {
    if (!lightboxOpen) {
      document.body.removeAttribute("data-lightbox-open");
      return;
    }

    document.body.setAttribute("data-lightbox-open", "true");

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") goTo(safeIndex - 1);
      if (event.key === "ArrowRight") goTo(safeIndex + 1);
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.removeAttribute("data-lightbox-open");
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen, safeIndex, goTo]);

  if (!count) {
    return <div className={`${productGalleryFrameClass} bg-gradient-to-br from-slate-100 to-slate-200`} />;
  }

  return (
    <>
      <div className="min-w-0 w-full max-w-full space-y-3 pb-2 md:pb-0">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          onTouchStart={(e) => handleTouchStart(e.touches[0]?.clientX ?? 0)}
          onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
          className={`${productGalleryFrameClass} w-full max-w-full cursor-zoom-in transition hover:border-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600`}
          aria-label="Ver imagen ampliada"
        >
          {current ? (
            <MediaImage
              src={current}
              alt={alt}
              fill
              className={productGalleryImageClass}
              priority={safeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : null}
          {count > 1 ? (
            <span className="absolute bottom-3 right-3 rounded-full bg-brand-900/75 px-2.5 py-1 text-xs font-medium text-white">
              {safeIndex + 1} / {count}
            </span>
          ) : null}
        </button>

        {count > 1 ? (
          <>
            <div className="flex items-center justify-between gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => goTo(safeIndex - 1)}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-brand-700"
              >
                ‹ Anterior
              </button>
              <span className="text-xs text-text-muted">
                {safeIndex + 1} / {count}
              </span>
              <button
                type="button"
                onClick={() => goTo(safeIndex + 1)}
                className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-brand-700"
              >
                Siguiente ›
              </button>
            </div>

            <ThumbnailStrip
              images={images}
              alt={alt}
              selectedIndex={safeIndex}
              onSelect={setSelected}
            />
          </>
        ) : null}
      </div>

      {lightboxOpen && current && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-black/92"
              role="dialog"
              aria-modal="true"
              aria-label={`${alt} — vista ampliada`}
            >
              <div className="flex shrink-0 items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <p className="text-sm font-medium text-white/90">
                  {safeIndex + 1} / {count}
                </p>
                <button
                  type="button"
                  className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white hover:bg-white/25"
                  onClick={() => setLightboxOpen(false)}
                >
                  Cerrar
                </button>
              </div>

              <div
                className="relative flex min-h-0 flex-1 items-center justify-center px-2"
                onClick={() => setLightboxOpen(false)}
                onTouchStart={(e) => handleTouchStart(e.touches[0]?.clientX ?? 0)}
                onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0]?.clientX ?? 0)}
              >
                {count > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Imagen anterior"
                      className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 px-3 py-3 text-xl text-white hover:bg-white/25 sm:left-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(safeIndex - 1);
                      }}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Imagen siguiente"
                      className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/15 px-3 py-3 text-xl text-white hover:bg-white/25 sm:right-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(safeIndex + 1);
                      }}
                    >
                      ›
                    </button>
                  </>
                ) : null}

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveMediaUrl(current)}
                  alt={alt}
                  className="max-h-full max-w-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {count > 1 ? (
                <div className="shrink-0 border-t border-white/10 bg-black/60 px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                  <ThumbnailStrip
                    images={images}
                    alt={alt}
                    selectedIndex={safeIndex}
                    onSelect={setSelected}
                    variant="lightbox"
                  />
                </div>
              ) : (
                <div className="h-[max(1rem,env(safe-area-inset-bottom))] shrink-0" />
              )}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
