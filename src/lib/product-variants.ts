import type { ProductRecord } from "@/types/product";

/**
 * Grupos de la misma ficha en otra medida, talla o presentación.
 * El prefijo de slug no siempre coincide (tela de seda, alcohol, jeringas), así que
 * cada familia tiene su propia regla. La primera que coincide gana.
 */
const VARIANT_RULES: { id: string; test: (slug: string) => boolean }[] = [
  { id: "venda-elastica-protec", test: (slug) => /^venda-elastica-protec-\d/.test(slug) },
  { id: "venda-enyesada", test: (slug) => slug.startsWith("venda-enyesada-protec-") },
  {
    id: "tela-seda",
    test: (slug) =>
      slug.startsWith("tela-adhesiva-de-seda-protec-") || slug.startsWith("protec-tela-adhesiva-seda-"),
  },
  { id: "chg", test: (slug) => slug.startsWith("aposito-transparente-chg-") },
  { id: "dermodine", test: (slug) => slug.startsWith("dermodine-") },
  { id: "hypafix", test: (slug) => slug.startsWith("hypafix-") },
  { id: "cutimed-alginate", test: (slug) => slug.startsWith("cutimed-alginate-") },
  { id: "cutimed-siltec", test: (slug) => slug.startsWith("cutimed-siltec") },
  { id: "cutimed-sorbact", test: (slug) => slug.startsWith("cutimed-sorbact") },
  { id: "alcohol-spray", test: (slug) => slug.startsWith("alcohol-desnaturalizado-en-spray-") },
  {
    id: "alcohol-desnaturalizado",
    test: (slug) =>
      slug === "alcohol-desnaturalizado-protec-250-ml" || slug === "protec-alcohol-desnaturalizado-500ml",
  },
  { id: "agua-oxigenada", test: (slug) => slug.includes("agua-oxigenada") },
  { id: "gel-antiseptico", test: (slug) => slug.includes("gel-antiseptico") },
  { id: "cinta-microperforada", test: (slug) => slug.includes("microperforada") },
  { id: "cinta-microporosa", test: (slug) => slug.includes("microporosa") },
  {
    id: "gasa-esteril",
    test: (slug) => slug.startsWith("gasa-seca-cortada-esteril-") || slug === "protec-gasas-esteriles-10x10",
  },
  {
    id: "gasa-no-esteril",
    test: (slug) => slug.startsWith("gasa-seca-cortada-no-esteril-"),
  },
  { id: "jeringas", test: (slug) => slug.includes("jeringa") },
  { id: "guantes-latex", test: (slug) => slug.includes("guantes-de-latex") },
  { id: "guantes-nitrilo", test: (slug) => slug.includes("guantes-nitrilo") },
  { id: "jobst-relief", test: (slug) => slug.startsWith("media-jobst-relief-") },
  { id: "jobst-sport", test: (slug) => slug.startsWith("media-jobst-sport-") },
  { id: "antiembolica", test: (slug) => slug.startsWith("media-antiembolica-protec-") },
];

export function variantGroupId(slug: string): string | null {
  return VARIANT_RULES.find((rule) => rule.test(slug))?.id ?? null;
}

/** Otras fichas del mismo grupo, sin la actual. Vacío si no hay variantes. */
export function otherMeasureProducts(slug: string, products: ProductRecord[]): ProductRecord[] {
  const groupId = variantGroupId(slug);
  if (!groupId) return [];

  return products
    .filter((product) => product.slug !== slug && variantGroupId(product.slug) === groupId)
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}
