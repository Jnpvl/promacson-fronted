"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "@/contexts/quote-cart-context";

type AddToQuoteButtonProps = {
  productId: string;
  slug: string;
  name: string;
  badge: string;
  className?: string;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
};

export function AddToQuoteButton({
  productId,
  slug,
  name,
  badge,
  className = "",
  variant = "primary",
  fullWidth = false,
}: AddToQuoteButtonProps) {
  const { addProduct } = useQuoteCart();
  const [pulse, setPulse] = useState(false);

  function handleClick() {
    addProduct({ productId, slug, name, badge });
    setPulse(true);
    window.setTimeout(() => setPulse(false), 450);
  }

  return (
    <Button
      type="button"
      variant={variant}
      onClick={handleClick}
      className={`${fullWidth ? "w-full justify-center" : ""} ${pulse ? "scale-95 ring-2 ring-brand-400" : ""} transition-transform ${className}`.trim()}
    >
      Agregar a cotización
    </Button>
  );
}
