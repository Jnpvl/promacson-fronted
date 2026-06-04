export type HeroSlide = {
  id: string;
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  imageUrl: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type SliderRecord = {
  id: string;
  sortOrder: number;
  isActive: boolean;
  eyebrow: string | null;
  title: string;
  description: string | null;
  imageUrl: string;
  hasPrimaryCta: boolean;
  primaryCtaLabel: string | null;
  primaryCtaHref: string | null;
  hasSecondaryCta: boolean;
  secondaryCtaLabel: string | null;
  secondaryCtaHref: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SliderFormValues = {
  isActive: boolean;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  hasPrimaryCta: boolean;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  hasSecondaryCta: boolean;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};
