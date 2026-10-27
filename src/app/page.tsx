import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { AudienceCards } from "@/components/home/audience-cards";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { HomeStoreText } from "@/components/home/home-store-text";
import { HomeIntro } from "@/components/home/home-intro";
import { TargetCategoryLinks } from "@/components/home/target-category-links";
import { OurServicesSection } from "@/components/home/our-services-section";
import { TrustSection } from "@/components/home/trust-section";
import { homeFaq, homeMetaDescription } from "@/content/home-seo";
import { faqPlainItems } from "@/content/faq";
import { siteConfig } from "@/config/site";
import { getCategories } from "@/lib/services/categories.service";
import { getFeaturedProducts } from "@/lib/services/products.service";
import { getServices } from "@/lib/services/services.service";
import { getHeroSlides } from "@/lib/services/sliders.service";
import { routes } from "@/lib/routes";
import { buildHomeJsonLd } from "@/lib/home-jsonld";
import { buildFaqJsonLd } from "@/lib/seo-jsonld";
import { withCanonical } from "@/lib/seo-metadata";

export const metadata: Metadata = withCanonical(routes.home, {
  title: { absolute: siteConfig.homeSeoTitle },
  description: homeMetaDescription,
});

export default async function HomePage() {
  const [heroSlides, categories, featuredProducts, services] = await Promise.all([
    getHeroSlides(),
    getCategories(),
    getFeaturedProducts(),
    getServices(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd(faqPlainItems(homeFaq))) }}
      />
      <SiteShell>
      <HeroCarousel slides={heroSlides} />
      <HomeIntro />
      <TargetCategoryLinks />
      <CategoryGrid categories={categories} />
      <HomeStoreText />
      <FeaturedProducts products={featuredProducts} />
      <AudienceCards />
      <OurServicesSection services={services} />
      <TrustSection />
      </SiteShell>
    </>
  );
}
