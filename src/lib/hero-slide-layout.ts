/** Marco del banner — debe coincidir en carrusel y preview del admin. */
export const heroSlideFrameClass =
  "relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[8/3]";

/** Recorte: centro en móvil, ligero bias vertical en desktop ancho. */
export const heroSlideImageClass = "object-cover object-center sm:object-[center_45%]";

export const heroSlideImageGuidelines = {
  idealSize: "1920×720 px",
  minSize: "1600×900 px",
  ratio: "8:3 en escritorio · 4:3 en móvil",
  safeZone:
    "Mantén logo, producto y mensaje en el tercio izquierdo-centro; evita bordes (se recortan en móvil).",
};
