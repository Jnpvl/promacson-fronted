import Link from "next/link";
import type { FaqItem } from "@/content/faq";

type Props = {
  items: FaqItem[];
  title?: string;
  className?: string;
};

/** Acordeón nativo. Las respuestas siguen en el HTML; el JSON-LD usa el mismo texto. */
export function VisibleFaq({ items, title = "Preguntas frecuentes", className = "mt-10" }: Props) {
  if (items.length === 0) return null;

  return (
    <section className={className} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-bold text-text sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-brand-200 bg-white">
        {items.map((item) => (
          <details key={item.question} className="group border-b border-brand-200 last:border-b-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3.5 font-semibold text-text hover:bg-brand-50 sm:px-5 [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronIcon />
            </summary>
            <div className="px-4 pb-4 text-sm leading-relaxed text-text-muted sm:px-5">{renderAnswer(item)}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

function renderAnswer(item: FaqItem) {
  return item.answer.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <Link key={index} href={part.href} className="font-medium text-brand-700 hover:underline">
        {part.label}
      </Link>
    ),
  );
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="shrink-0 text-brand-700 transition-transform group-open:rotate-180"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
