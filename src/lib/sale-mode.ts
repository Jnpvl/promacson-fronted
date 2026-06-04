import type { SaleMode } from "@/types/product";

export const SALE_MODE_OPTIONS: { value: SaleMode; label: string }[] = [
  { value: "UNIT_ONLY", label: "Solo pieza" },
  { value: "PACKAGE_ONLY", label: "Solo caja" },
  { value: "BOTH", label: "Pieza o caja" },
];

export function saleModeLabel(mode: SaleMode): string {
  return SALE_MODE_OPTIONS.find((o) => o.value === mode)?.label ?? "Pieza o caja";
}
