/** Marco de tarjetas de categoría — alineado con `CategoryCard`. */
export const categoryCardFrameClass = {
  compact: "relative aspect-[4/3] w-full overflow-hidden",
  default: "relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]",
} as const;

export const categoryCardImageClass = "object-cover object-center";

export const categoryImageGuidelines = {
  idealSize: "1200×900 px",
  minSize: "800×600 px",
  ratio: "4:3 en inicio · 16:10 en catálogo",
  note: "Centra el producto o icono; los bordes se recortan según la vista.",
};
