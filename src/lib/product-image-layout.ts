/**
 * Estándar visual de imágenes de producto — alinear tarjetas, PDP y admin.
 * Marco siempre 4:3; en listados se recorta (cover), en detalle se muestra completa (contain).
 */

/** Tarjetas de catálogo, inicio y miniaturas en admin. */
export const productCardFrameClass = "relative aspect-[4/3] w-full overflow-hidden";

export const productCardImageClass = "object-cover object-center";

/** Marco principal en PDP (mismo 4:3 que las tarjetas). */
export const productGalleryFrameClass =
  "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-slate-50";

/** Imagen completa dentro del marco, sin recortar. */
export const productGalleryImageClass = "object-contain object-center p-3 sm:p-5";

/** Miniaturas bajo la imagen principal en PDP. */
export const productGalleryThumbFrameClass =
  "relative aspect-[4/3] h-16 w-[4.25rem] shrink-0 overflow-hidden rounded-lg sm:h-20 sm:w-[6.25rem]";

export const productGalleryThumbImageClass = "object-cover object-center";

/** Contenedor de miniaturas con scroll horizontal en móvil. */
export const productGalleryThumbStripClass =
  "gallery-thumb-scroll flex w-full max-w-full flex-nowrap gap-2 scroll-smooth snap-x snap-mandatory px-0.5 pb-2";

export const productImageGuidelines = {
  idealSize: "1200×900 px",
  minSize: "800×600 px",
  ratio: "4:3 en todo el sitio",
  note: "Sube en 4:3. En tarjetas se recorta el centro; en ficha se ve la imagen completa dentro del mismo marco.",
};
