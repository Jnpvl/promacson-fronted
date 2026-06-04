import { apiClient, hasApiClient } from "@/lib/api/client";
import { apiEndpoints } from "@/lib/api/endpoints";
import { MOCK_HERO_SLIDES } from "@/lib/mock-hero-slides";
import type { HeroSlide, SliderRecord } from "@/types/hero-slide";

export function mapSliderToHeroSlide(slider: SliderRecord): HeroSlide {
  return {
    id: slider.id,
    eyebrow: slider.eyebrow,
    title: slider.title,
    description: slider.description,
    imageUrl: slider.imageUrl,
    cta:
      slider.hasPrimaryCta && slider.primaryCtaLabel && slider.primaryCtaHref
        ? { label: slider.primaryCtaLabel, href: slider.primaryCtaHref }
        : undefined,
    secondaryCta:
      slider.hasSecondaryCta && slider.secondaryCtaLabel && slider.secondaryCtaHref
        ? { label: slider.secondaryCtaLabel, href: slider.secondaryCtaHref }
        : undefined,
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  if (!hasApiClient()) {
    return MOCK_HERO_SLIDES;
  }

  try {
    const rows = await apiClient.get<SliderRecord[]>(apiEndpoints.sliders.public, {
      next: { revalidate: 60, tags: ["hero-slides"] },
    });
    return rows.map(mapSliderToHeroSlide);
  } catch (err) {
    console.warn("[sliders] fetch failed, using mock", err);
    return MOCK_HERO_SLIDES;
  }
}
