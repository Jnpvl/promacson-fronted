export type QuoteCartItem = {
  productId: string;
  slug: string;
  name: string;
  badge: string;
  quantity: number;
};

export type QuoteStatus = "NEW" | "QUOTE_SENT" | "PURCHASED";

export type QuoteLineRecord = {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  saleModeLabel: string;
  quantity: number;
};

export type QuoteRecord = {
  id: string;
  folio: string | null;
  status: QuoteStatus;
  statusLabel: string;
  customerName: string;
  email: string | null;
  phone: string | null;
  lines: QuoteLineRecord[];
  submittedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
