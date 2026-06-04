import type { ProductRecord } from "@/types/product";
import type { Service } from "@/types/service";

export type SearchResults = {
  query: string;
  products: ProductRecord[];
  services: Service[];
};
