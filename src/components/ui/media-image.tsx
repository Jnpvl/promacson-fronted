import type { CSSProperties } from "react";
import { resolveMediaUrl } from "@/lib/media-url";

type MediaImageProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

/** Imagen de uploads del backend vía proxy `/uploads` en Next. */
export function MediaImage({
  src,
  alt = "",
  className = "",
  style,
  fill = false,
  priority = false,
}: MediaImageProps) {
  const resolved = resolveMediaUrl(src);

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- uploads dinámicos del backend
      <img
        src={resolved}
        alt={alt}
        fetchPriority={priority ? "high" : undefined}
        className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
        style={style}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- uploads dinámicos del backend
    <img src={resolved} alt={alt} className={className} style={style} />
  );
}
