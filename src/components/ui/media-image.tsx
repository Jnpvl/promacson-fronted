import type { CSSProperties } from "react";
import Image from "next/image";
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

function canOptimize(src: string): boolean {
  return src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://");
}

/** Imagen de uploads del backend vía proxy `/uploads` y el optimizador de Next. */
export function MediaImage({
  src,
  alt = "",
  className = "",
  style,
  fill = false,
  priority = false,
  sizes,
}: MediaImageProps) {
  const resolved = resolveMediaUrl(src);
  if (!resolved) return null;

  if (!canOptimize(resolved)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element -- blob/data preview en admin
        <img
          src={resolved}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
          style={style}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element -- blob/data preview en admin
      <img src={resolved} alt={alt} className={className} style={style} />
    );
  }

  if (fill) {
    return (
      <Image
        src={resolved}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "100vw"}
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={1200}
      height={900}
      priority={priority}
      sizes={sizes}
      className={className}
      style={style}
    />
  );
}
