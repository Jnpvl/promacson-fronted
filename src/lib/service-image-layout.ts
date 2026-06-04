/** Marco de tarjetas de servicio — alineado con `ServiceCard`. */
export const serviceCardFrameClass = {
  compact: "relative aspect-[4/3] w-full overflow-hidden",
  default: "relative aspect-[16/10] w-full overflow-hidden sm:aspect-[5/3]",
} as const;

export const serviceCardImageClass = "object-cover object-center";

export const serviceImageGuidelines = {
  idealSize: "1200×900 px",
  minSize: "800×600 px",
  ratio: "4:3 en inicio · 16:10 en listado",
  note: "Centra el mensaje o icono; los bordes se recortan según la vista.",
};
