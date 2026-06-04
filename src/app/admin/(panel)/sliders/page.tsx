import type { Metadata } from "next";
import Link from "next/link";
import { SliderList } from "@/components/admin/slider-list";
import { adminApiRequest } from "@/lib/admin-server-api";
import { apiEndpoints } from "@/lib/api/endpoints";
import { routes } from "@/lib/routes";
import type { SliderRecord } from "@/types/hero-slide";

export const metadata: Metadata = {
  title: "Sliders",
};

export default async function AdminSlidersPage() {
  let sliders: SliderRecord[] = [];

  try {
    sliders = await adminApiRequest<SliderRecord[]>(apiEndpoints.sliders.admin);
  } catch {
    sliders = [];
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text">Sliders</h1>
          <p className="mt-2 text-sm text-text-muted">
            Banners del carrusel principal. Ideal 1920×720 px; en móvil se muestra 4:3 y en escritorio 8:3.
          </p>
        </div>
        <Link
          href={routes.admin.sliderNew}
          className="inline-flex rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800"
        >
          Nuevo slider
        </Link>
      </div>

      <SliderList initialSliders={sliders} />
    </div>
  );
}
