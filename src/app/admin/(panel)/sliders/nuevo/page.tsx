import type { Metadata } from "next";
import { SliderForm } from "@/components/admin/slider-form";

export const metadata: Metadata = {
  title: "Nuevo slider",
};

export default function AdminNewSliderPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Nuevo slider</h1>
      <p className="mt-2 text-sm text-text-muted">Crea un banner para el carrusel del inicio.</p>
      <div className="mt-8">
        <SliderForm />
      </div>
    </div>
  );
}
