export type ImageTargetSize = {
  width: number;
  height: number;
};

function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file, { imageOrientation: "from-image" });
}

function canvasToJpegBlob(canvas: HTMLCanvasElement, quality = 0.88): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error("No se pudo generar la imagen"));
      },
      "image/jpeg",
      quality,
    );
  });
}

function coverCropAndDraw(
  source: CanvasImageSource,
  sw: number,
  sh: number,
  target: ImageTargetSize,
): HTMLCanvasElement {
  const { width: tw, height: th } = target;
  const targetRatio = tw / th;
  const srcRatio = sw / sh;

  let sx = 0;
  let sy = 0;
  let cw = sw;
  let ch = sh;

  if (srcRatio > targetRatio) {
    cw = sh * targetRatio;
    sx = (sw - cw) / 2;
  } else {
    ch = sw / targetRatio;
    sy = (sh - ch) / 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = tw;
  canvas.height = th;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo procesar la imagen");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, sx, sy, cw, ch, 0, 0, tw, th);
  return canvas;
}

/** Recorte centrado (cover) + resize al tamaño recomendado. Sale JPEG. */
export async function fitImageToTarget(file: File, target: ImageTargetSize): Promise<File> {
  const bitmap = await loadBitmap(file);
  const canvas = coverCropAndDraw(bitmap, bitmap.width, bitmap.height, target);
  bitmap.close();
  const blob = await canvasToJpegBlob(canvas);
  const base = file.name.replace(/\.[^.]+$/, "") || "imagen";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
}

export async function fitVideoFrameToTarget(
  video: HTMLVideoElement,
  target: ImageTargetSize,
): Promise<File> {
  const canvas = coverCropAndDraw(video, video.videoWidth, video.videoHeight, target);
  const blob = await canvasToJpegBlob(canvas);
  return new File([blob], `foto-${Date.now()}.jpg`, { type: "image/jpeg" });
}

export function cameraErrorMessage(err: unknown): string {
  const name = err instanceof DOMException ? err.name : "";
  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    return "Permiso de cámara denegado. Actívalo en el navegador e inténtalo de nuevo.";
  }
  if (name === "NotFoundError" || name === "OverconstrainedError") {
    return "No se encontró una cámara en este equipo.";
  }
  if (name === "NotReadableError") {
    return "La cámara está en uso por otra aplicación.";
  }
  if (!window.isSecureContext) {
    return "La cámara solo funciona en HTTPS o localhost.";
  }
  return "No se pudo abrir la cámara.";
}
