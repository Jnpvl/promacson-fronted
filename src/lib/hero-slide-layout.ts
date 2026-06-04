/** Marco del banner — debe coincidir en carrusel y preview del admin. */
export const heroSlideFrameClass =
  "relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[8/3]";

/** Recorte: prioriza el bloque izquierdo (marca) en desktop; centro en móvil. */
export const heroSlideImageClass =
  "object-cover object-[28%_center] sm:object-[22%_center] lg:object-[18%_center]";

export const heroSlideImageGuidelines = {
  idealSize: "1920×720 px",
  minSize: "1600×900 px",
  ratio: "8:3 en escritorio · 4:3 en móvil",
  safeZone:
    "Arte integrado: marca y copy en el tercio izquierdo, producto a la derecha. Deja margen inferior (~80 px) para controles del carrusel. En el admin usa título para SEO; en web con imagen solo se muestran los botones (abajo derecha).",
};
