/** Fragmento de respuesta: texto o enlace interno. El texto plano es el que va al JSON-LD. */
export type FaqAnswerPart = string | { href: string; label: string };

export type FaqItem = {
  question: string;
  answer: FaqAnswerPart[];
};

export function faqPlainAnswer(item: FaqItem): string {
  return item.answer.map((part) => (typeof part === "string" ? part : part.label)).join("");
}

export function faqPlainItems(items: FaqItem[]): { question: string; answer: string }[] {
  return items.map((item) => ({ question: item.question, answer: faqPlainAnswer(item) }));
}
