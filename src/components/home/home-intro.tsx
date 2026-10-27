import { VisibleFaq } from "@/components/seo/visible-faq";
import { siteConfig } from "@/config/site";
import { homeFaq, homeIntro } from "@/content/home-seo";

/** H1 y texto de la home. El carrusel no usa h1. */
export function HomeIntro() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="max-w-3xl text-2xl font-bold tracking-tight text-text sm:text-3xl">
          {siteConfig.homeH1}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted sm:text-base">{homeIntro}</p>
        <VisibleFaq items={homeFaq} className="mt-8 max-w-3xl" />
      </div>
    </section>
  );
}
