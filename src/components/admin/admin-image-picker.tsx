"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  cameraErrorMessage,
  fitImageToTarget,
  fitVideoFrameToTarget,
  type ImageTargetSize,
} from "@/lib/fit-admin-image";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [fitting, setFitting] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOpen(false);
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

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
    }
  }

  async function openCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      onError?.("Este navegador no permite usar la cámara.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      streamRef.current = stream;
      setCameraOpen(true);
      requestAnimationFrame(() => {
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        void video.play();
      });
    } catch (err) {
      onError?.(cameraErrorMessage(err));
    }
  }

  async function capturePhoto() {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) {
      onError?.("La cámara aún no está lista. Espera un segundo.");
      return;
    }

    setFitting(true);
    try {
      const file = await fitVideoFrameToTarget(video, target);
      stopCamera();
      await onPick([file]);
    } catch {
      onError?.("No se pudo capturar la foto.");
    } finally {
      setFitting(false);
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
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" disabled={busy} onClick={() => galleryRef.current?.click()}>
          Galería
        </Button>
        <Button type="button" variant="outline" disabled={busy} onClick={() => void openCamera()}>
          Tomar foto
        </Button>
      </div>
      <p className="text-xs text-text-muted">
        Se recorta al centro y se ajusta a {target.width}×{target.height} px.
        {fitting ? " Ajustando imagen…" : null}
      </p>

      {cameraOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-3xl rounded-xl bg-surface p-4 shadow-lg">
            <p className="mb-3 text-sm font-medium text-text">Cámara</p>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="aspect-video w-full rounded-lg bg-black object-cover"
            />
            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <Button type="button" variant="outline" disabled={fitting} onClick={stopCamera}>
                Cancelar
              </Button>
              <Button type="button" disabled={fitting} onClick={() => void capturePhoto()}>
                Capturar
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
