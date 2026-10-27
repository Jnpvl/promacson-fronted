import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { VisibleFaq } from "@/components/seo/visible-faq";
import type { FaqAnswerPart } from "@/content/faq";
import { faqPlainItems } from "@/content/faq";
import { getGuide, guides } from "@/content/guides";
import { storeNap } from "@/config/store-nap";
import { getSiteContact } from "@/lib/site-contact";
import { whatsappHref } from "@/lib/site-contact-utils";
import { routes } from "@/lib/routes";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, homeBreadcrumb } from "@/lib/seo-jsonld";
import { withCanonical } from "@/lib/seo-metadata";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return withCanonical(routes.guides, { title: "Guías" });

  return withCanonical(routes.guide(slug), {
    title: guide.title,
    description: guide.description,
  });
}

function AnswerParts({ parts }: { parts: FaqAnswerPart[] }) {
  return parts.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <Link key={index} href={part.href} className="font-medium text-brand-700 hover:underline">
        {part.label}
      </Link>
    ),
  );
}

export default async function GuiaPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const contact = await getSiteContact();
  const faqJsonLd = buildFaqJsonLd(faqPlainItems(guide.faq));
  const breadcrumbItems = [
    homeBreadcrumb(),
    { name: "Guías", item: routes.guides },
    { name: guide.h1, item: routes.guide(guide.slug) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(breadcrumbItems)) }}
      />
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <SiteShell>
        <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
          <nav aria-label="Migas de pan" className="mb-4 text-sm text-text-muted">
            <Link href={routes.home} className="hover:text-brand-700">
              Inicio
            </Link>
            <span className="mx-2" aria-hidden="true">
              ›
            </span>
            <Link href={routes.guides} className="hover:text-brand-700">
              Guías
            </Link>
            <span className="mx-2" aria-hidden="true">
              ›
            </span>
            <span className="text-text" aria-current="page">
              {guide.h1}
            </span>
          </nav>

          <h1 className="text-2xl font-bold text-text sm:text-3xl">{guide.h1}</h1>

          <div className="mt-6 space-y-8">
            {guide.sections.map((section, sectionIndex) => (
              <section key={section.heading ?? `intro-${sectionIndex}`}>
                {section.heading ? (
                  <h2 className="text-xl font-bold text-text">{section.heading}</h2>
                ) : null}
                <div className={section.heading ? "mt-2 space-y-3" : "space-y-3"}>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-relaxed text-text-muted sm:text-base">
                      <AnswerParts parts={paragraph} />
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <VisibleFaq items={guide.faq} />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={whatsappHref(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-800"
            >
              WhatsApp {storeNap.telephoneDisplay}
            </a>
            <Link
              href={routes.location}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Visitar la tienda en Hermosillo
            </Link>
            <Link
              href={routes.category("medias-de-compresion")}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              Ver medias de compresión
            </Link>
          </div>
        </article>
      </SiteShell>
    </>
  );
}
