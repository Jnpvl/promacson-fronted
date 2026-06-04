"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  cartTotalUnits,
  readQuoteCart,
  writeQuoteCart,
} from "@/lib/quote-cart-storage";
import type { QuoteCartItem } from "@/types/quote";

type AddProductInput = {
  productId: string;
  slug: string;
  name: string;
  badge: string;
};

type QuoteCartContextValue = {
  items: QuoteCartItem[];
  totalUnits: number;
  justAdded: boolean;
  addProduct: (product: AddProductInput) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void;
};

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setItems(readQuoteCart());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeQuoteCart(items);
  }, [items, hydrated]);

  const triggerBump = useCallback(() => {
    setJustAdded(true);
    const timer = window.setTimeout(() => setJustAdded(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  const addProduct = useCallback(
    (product: AddProductInput) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === product.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === product.productId ? { ...i, quantity: i.quantity + 1 } : i,
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      triggerBump();
    },
    [triggerBump],
  );

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const qty = Math.max(0, Math.floor(quantity));
    setItems((prev) => {
      if (qty === 0) return prev.filter((i) => i.productId !== productId);
      return prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      totalUnits: cartTotalUnits(items),
      justAdded,
      addProduct,
      setQuantity,
      removeProduct,
      clearCart,
    }),
    [items, justAdded, addProduct, setQuantity, removeProduct, clearCart],
  );

  return <QuoteCartContext.Provider value={value}>{children}</QuoteCartContext.Provider>;
}

export function useQuoteCart(): QuoteCartContextValue {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) {
    throw new Error("useQuoteCart debe usarse dentro de QuoteCartProvider");
  }
  return ctx;
}
