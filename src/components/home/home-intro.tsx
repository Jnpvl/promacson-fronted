import { HomeStoreText } from "@/components/home/home-store-text";
import { TargetCategoryLinks } from "@/components/home/target-category-links";
import { VisibleFaq } from "@/components/seo/visible-faq";
import { siteConfig } from "@/config/site";
import { homeFaq, homeIntro, homeLead } from "@/content/home-seo";

/** H1 y una línea bajo el carrusel. El texto largo va en HomeReadingSection. */
export function HomeIntro() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {siteConfig.homeH1}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">{homeLead}</p>
      </div>
    </section>
  );
}

/** Párrafo de la propuesta, anclas exactas, visita y FAQ, debajo del catálogo visual. */
export function HomeReadingSection() {
  return (
    <section className="border-y border-brand-200 bg-brand-50">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">Promacson Tienda</h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{homeIntro}</p>
        <TargetCategoryLinks />
        <HomeStoreText />
        <VisibleFaq items={homeFaq} className="mt-10" />
      </div>
    </section>
  );
}
