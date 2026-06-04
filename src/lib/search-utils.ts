/** Normaliza texto para comparación sin acentos ni mayúsculas. */
export function normalizeSearchText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

export function includesSearchTerm(haystack: string | null | undefined, needle: string): boolean {
  if (!haystack?.trim() || !needle) return false;
  return normalizeSearchText(haystack).includes(needle);
}

export function productMatchesQuery(product: {
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  categoryName: string;
  categorySlug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  seoTitle?: string;
  seoDescription?: string;
}, needle: string): boolean {
  return (
    includesSearchTerm(product.name, needle) ||
    includesSearchTerm(product.slug, needle) ||
    includesSearchTerm(product.sku, needle) ||
    includesSearchTerm(product.description, needle) ||
    includesSearchTerm(product.categoryName, needle) ||
    includesSearchTerm(product.categorySlug, needle) ||
    includesSearchTerm(product.metaTitle, needle) ||
    includesSearchTerm(product.metaDescription, needle) ||
    includesSearchTerm(product.seoTitle, needle) ||
    includesSearchTerm(product.seoDescription, needle)
  );
}

export function serviceMatchesQuery(
  service: {
    slug: string;
    title: string;
    description: string;
    body?: string | null;
    seoTitle?: string;
    seoDescription?: string;
  },
  needle: string,
): boolean {
  return (
    includesSearchTerm(service.title, needle) ||
    includesSearchTerm(service.slug, needle) ||
    includesSearchTerm(service.description, needle) ||
    includesSearchTerm(service.body, needle) ||
    includesSearchTerm(service.seoTitle, needle) ||
    includesSearchTerm(service.seoDescription, needle)
  );
}

/** Divide la consulta en tokens (mín. 2 caracteres) para buscar por palabras. */
export function searchTokens(query: string): string[] {
  return normalizeSearchText(query)
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

export function matchesAllTokens(
  matchesOne: (needle: string) => boolean,
  tokens: string[],
): boolean {
  if (tokens.length === 0) return false;
  return tokens.every(matchesOne);
}
