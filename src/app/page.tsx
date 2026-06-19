import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { AudienceCards } from "@/components/home/audience-cards";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { OurServicesSection } from "@/components/home/our-services-section";
import { TrustSection } from "@/components/home/trust-section";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/services/categories.service";
import { getFeaturedProducts } from "@/lib/services/products.service";
import { getServices } from "@/lib/services/services.service";
import { getHeroSlides } from "@/lib/services/sliders.service";
import { routes } from "@/lib/routes";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.home, {
  title: { absolute: siteConfig.homeSeoTitle },
  description: siteConfig.description,
});

export default async function HomePage() {
  const [heroSlides, categories, featuredProducts, services] = await Promise.all([
    getHeroSlides(),
    getCategories(),
    getFeaturedProducts(),
    getServices(),
  ]);

  return (
    <SiteShell>
      <HeroCarousel slides={heroSlides} />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <AudienceCards />
      <OurServicesSection services={services} />
      <TrustSection />
    </SiteShell>
  );
}
