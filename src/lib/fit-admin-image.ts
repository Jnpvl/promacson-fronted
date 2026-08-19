export type ImageTargetSize = {
  width: number;
  height: number;
};

function loadBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file, { imageOrientation: "from-image" });
}

/** Recorte centrado (cover) + resize al tamaño recomendado. Sale JPEG. */
export async function fitImageToTarget(file: File, target: ImageTargetSize): Promise<File> {
  const bitmap = await loadBitmap(file);
  const { width: tw, height: th } = target;
  const sw = bitmap.width;
  const sh = bitmap.height;
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
  if (!ctx) {
    bitmap.close();
    throw new Error("No se pudo procesar la imagen");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap, sx, sy, cw, ch, 0, 0, tw, th);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) resolve(result);
        else reject(new Error("No se pudo generar la imagen"));
      },
      "image/jpeg",
      0.88,
    );
  });

  const base = file.name.replace(/\.[^.]+$/, "") || "imagen";
  return new File([blob], `${base}.jpg`, { type: "image/jpeg" });
}
