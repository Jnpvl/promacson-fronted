import { siteConfig } from "@/config/site";

/** H1 SEO local del inicio (el carrusel usa h2 para no duplicar). */
export function HomeIntro() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <h1 className="text-center text-xl font-bold tracking-tight text-text sm:text-2xl md:text-3xl">
          {siteConfig.homeH1}
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-text-muted sm:text-base">
          Catálogo de insumos médicos, material de curación y ortopedia. Solicita cotización —
          sin compra en línea.
        </p>
      </div>
    </section>
  );
}
