import { getProducts } from "@/lib/services/products.service";
import { getServices } from "@/lib/services/services.service";
import {
  matchesAllTokens,
  normalizeSearchText,
  productMatchesQuery,
  searchTokens,
  serviceMatchesQuery,
} from "@/lib/search-utils";
import type { SearchResults } from "@/types/search";

export const MIN_SEARCH_LENGTH = 2;

export async function searchCatalog(query: string): Promise<SearchResults> {
  const trimmed = query.trim();

  if (trimmed.length < MIN_SEARCH_LENGTH) {
    return { query: trimmed, products: [], services: [] };
  }

  const [products, services] = await Promise.all([getProducts(), getServices()]);
  const tokens = searchTokens(trimmed);

  // Una sola palabra o frase corta: coincidencia parcial en cualquier campo.
  const needle = normalizeSearchText(trimmed);

  const filteredProducts = products.filter((product) => {
    if (tokens.length > 1) {
      return matchesAllTokens((token) => productMatchesQuery(product, token), tokens);
    }
    return productMatchesQuery(product, needle);
  });

  const filteredServices = services.filter((service) => {
    if (tokens.length > 1) {
      return matchesAllTokens((token) => serviceMatchesQuery(service, token), tokens);
    }
    return serviceMatchesQuery(service, needle);
  });

  return {
    query: trimmed,
    products: filteredProducts,
    services: filteredServices,
  };
}
