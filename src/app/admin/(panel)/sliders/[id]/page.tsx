import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliderForm } from "@/components/admin/slider-form";
import { adminApiRequest } from "@/lib/admin-server-api";
import { ApiError } from "@/lib/api/types";
import type { SliderRecord } from "@/types/hero-slide";

type PageProps = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Editar slider",
};

async function getSliderForEdit(id: string): Promise<SliderRecord> {
  try {
    return await adminApiRequest<SliderRecord>(`/api/v1/admin/sliders/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}

export default async function AdminEditSliderPage({ params }: PageProps) {
  const { id } = await params;
  const slider = await getSliderForEdit(id);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Editar slider</h1>
      <p className="mt-2 text-sm text-text-muted">{slider.title}</p>
      <div className="mt-8">
        <SliderForm slider={slider} />
      </div>
    </div>
  );
}
