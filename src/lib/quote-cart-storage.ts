import type { QuoteCartItem } from "@/types/quote";

export const QUOTE_CART_STORAGE_KEY = "promacson-quote-cart";

export function readQuoteCart(): QuoteCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QUOTE_CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as QuoteCartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.productId === "string" &&
        typeof item.slug === "string" &&
        typeof item.name === "string" &&
        typeof item.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function writeQuoteCart(items: QuoteCartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QUOTE_CART_STORAGE_KEY, JSON.stringify(items));
}

export function cartTotalUnits(items: QuoteCartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
