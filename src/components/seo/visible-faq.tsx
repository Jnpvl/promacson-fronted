import Link from "next/link";
import type { FaqItem } from "@/content/faq";

type Props = {
  items: FaqItem[];
  title?: string;
  className?: string;
};

/** FAQ visible (no colapsada): el mismo texto alimenta el JSON-LD FAQPage. */
export function VisibleFaq({ items, title = "Preguntas frecuentes", className = "mt-10" }: Props) {
  if (items.length === 0) return null;

  return (
    <section className={className} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-bold text-text sm:text-2xl">
        {title}
      </h2>
      <dl className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
        {items.map((item) => (
          <div key={item.question} className="px-4 py-4 sm:px-5">
            <dt className="font-semibold text-text">{item.question}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-text-muted">{renderAnswer(item)}</dd>
          </div>
        ))}
      </dl>
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
