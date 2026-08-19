"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { fitImageToTarget, type ImageTargetSize } from "@/lib/fit-admin-image";

const ACCEPT = "image/jpeg,image/png,image/webp";

type AdminImagePickerProps = {
  target: ImageTargetSize;
  multiple?: boolean;
  disabled?: boolean;
  onPick: (files: File[]) => void | Promise<void>;
  onError?: (message: string) => void;
};

export function AdminImagePicker({
  target,
  multiple = false,
  disabled = false,
  onPick,
  onError,
}: AdminImagePickerProps) {
  const galleryRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [fitting, setFitting] = useState(false);

  async function handleFiles(list: FileList | null) {
    if (!list?.length) return;

    setFitting(true);
    try {
      const fitted = await Promise.all(Array.from(list).map((file) => fitImageToTarget(file, target)));
      await onPick(fitted);
    } catch {
      onError?.("No se pudo ajustar la imagen. Prueba con otra foto.");
    } finally {
      setFitting(false);
      if (galleryRef.current) galleryRef.current.value = "";
      if (cameraRef.current) cameraRef.current.value = "";
    }
  }

  const busy = disabled || fitting;

  return (
    <div className="space-y-2">
      <input
        ref={galleryRef}
        type="file"
        accept={ACCEPT}
        multiple={multiple}
        disabled={busy}
        className="sr-only"
        onChange={(event) => void handleFiles(event.target.files)}
      />
      <input
        ref={cameraRef}
        type="file"
        accept={ACCEPT}
        capture="environment"
        disabled={busy}
        className="sr-only"
        onChange={(event) => void handleFiles(event.target.files)}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={busy} onClick={() => galleryRef.current?.click()}>
          Galería
        </Button>
        <Button type="button" variant="outline" disabled={busy} onClick={() => cameraRef.current?.click()}>
          Tomar foto
        </Button>
      </div>
      <p className="text-xs text-text-muted">
        Se recorta al centro y se ajusta a {target.width}×{target.height} px.
        {fitting ? " Ajustando imagen…" : null}
      </p>
    </div>
  );
}
