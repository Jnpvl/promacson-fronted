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
    "Marca/arte a la izquierda en la imagen; título y botones del sitio se muestran a la derecha. Evita texto importante en el borde derecho.",
};
