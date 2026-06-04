import { siteConfig } from "@/config/site";
import type { HeroSlide } from "@/types/hero-slide";

/** Fallback cuando el API de sliders no responde o está vacío. */
export const MOCK_HERO_SLIDES: HeroSlide[] = siteConfig.heroSlides.map((slide) => ({
  id: slide.id,
  eyebrow: slide.eyebrow,
  title: slide.title,
  description: slide.description,
  imageUrl: "",
  cta: slide.cta,
  secondaryCta: slide.secondaryCta ?? undefined,
}));
