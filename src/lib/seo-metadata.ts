import type { Metadata } from "next";

/**
 * Añade `link rel="canonical"` vía Metadata API.
 * La ruta es relativa a `metadataBase` del layout raíz (ej. `/catalogo/gasas`).
 */
export function withCanonical(path: string, metadata: Metadata = {}): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const alternates =
    metadata.alternates && typeof metadata.alternates === "object"
      ? metadata.alternates
      : {};

  return {
    ...metadata,
    alternates: {
      ...alternates,
      canonical,
    },
  };
}
