/**
 * Comprueba el JSON-LD de la Parte B sin levantar el sitio.
 * Ejecutar: npx tsx scripts/validate-jsonld.ts
 */
import { categorySeoFallbacks } from "../src/config/seo-category-content";
import { homeFaq, homeIntro, homeMetaDescription } from "../src/content/home-seo";
import { faqPlainAnswer, faqPlainItems } from "../src/content/faq";
import { getGuide } from "../src/content/guides";
import { siteConfig } from "../src/config/site";
import { STORE_PRICE_RANGE, buildHomeJsonLd, buildStoreJsonLd } from "../src/lib/home-jsonld";
import { otherMeasureProducts, variantGroupId } from "../src/lib/product-variants";
import { sanitizeSeoHtml } from "../src/lib/seo-html";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildProductJsonLd,
  catalogBreadcrumb,
  homeBreadcrumb,
} from "../src/lib/seo-jsonld";
import { routes } from "../src/lib/routes";
import type { ProductRecord } from "../src/types/product";

const errors: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) errors.push(message);
}

function asRecord(value: unknown): Record<string, unknown> {
  assert(value && typeof value === "object", "JSON-LD no es un objeto");
  return value as Record<string, unknown>;
}

const home = asRecord(buildHomeJsonLd());
const graph = home["@graph"];
assert(Array.isArray(graph), "la home no trae @graph");
const store = (graph as Record<string, unknown>[]).find((node) => {
  const type = node["@type"];
  return Array.isArray(type) && type.includes("LocalBusiness") && type.includes("Store");
});
assert(store, "falta LocalBusiness/Store en la home");
if (store) {
  assert(store.priceRange === STORE_PRICE_RANGE, "priceRange de la tienda cambió");
  assert(store.priceRange === "$$", "priceRange debe seguir siendo $$");
  const address = asRecord(store.address);
  assert(address.streetAddress === "C. Benito Juárez 177", "calle distinta al NAP");
  assert(address.addressLocality === "Hermosillo", "ciudad distinta al NAP");
  assert(store.telephone === "+52 662 450 1230", "teléfono distinto al NAP");
  assert(!JSON.stringify(home).includes('"@type":"Product"'), "la home no debe emitir Product");
}

const storePage = asRecord(buildStoreJsonLd());
assert(
  storePage["@id"] === (store?.["@id"] ?? ""),
  "la ficha de tienda en /nosotros no reutiliza el @id de la home",
);
const storeTypes = storePage["@type"];
assert(
  Array.isArray(storeTypes) &&
    storeTypes.includes("LocalBusiness") &&
    storeTypes.includes("Store") &&
    storeTypes.includes("MedicalBusiness"),
  "/nosotros perdió LocalBusiness, Store o MedicalBusiness",
);

const homeFaqLd = asRecord(buildFaqJsonLd(faqPlainItems(homeFaq)));
assert(homeFaqLd["@type"] === "FAQPage", "la home no arma FAQPage");
const homeQuestions = homeFaqLd.mainEntity as { name: string; acceptedAnswer: { text: string } }[];
assert(homeQuestions.length === homeFaq.length, "la FAQ de la home no coincide con el texto visible");
homeFaq.forEach((item, index) => {
  assert(homeQuestions[index]?.name === item.question, `pregunta ${index} distinta en JSON-LD`);
  assert(
    homeQuestions[index]?.acceptedAnswer.text === faqPlainAnswer(item),
    `respuesta ${index} distinta en JSON-LD`,
  );
});
assert(buildFaqJsonLd([]) === null, "FAQ vacía no debe emitir JSON-LD");

const priced = buildProductJsonLd({
  id: "1",
  slug: "ejemplo",
  name: "Ejemplo Protec",
  sku: "1",
  description: "Ficha",
  saleMode: "UNIT_ONLY",
  badge: "Nuevo",
  categoryId: "c",
  categorySlug: "material-de-curacion",
  categoryName: "Material de curación",
  imageUrls: [],
  coverImageUrl: null,
  isActive: true,
  isFeatured: false,
  metaTitle: null,
  metaDescription: null,
  seoTitle: "Ejemplo",
  seoDescription: "Ficha",
  createdAt: "2026-10-26",
  updatedAt: "2026-10-26",
  price: 10,
} as ProductRecord & { price: number });
assert(priced?.offers && (priced.offers as { price: number }).price === 10, "con precio debe haber Offer");
assert(
  (priced?.offers as { priceCurrency?: string } | undefined)?.priceCurrency === "MXN",
  "Offer sin priceCurrency",
);

const unpriced = buildProductJsonLd({
  id: "2",
  slug: "sin-precio",
  name: "Sin precio",
  sku: null,
  description: null,
  saleMode: "UNIT_ONLY",
  badge: "Nuevo",
  categoryId: "c",
  categorySlug: "material-de-curacion",
  categoryName: "Material de curación",
  imageUrls: [],
  coverImageUrl: null,
  isActive: true,
  isFeatured: false,
  metaTitle: null,
  metaDescription: null,
  seoTitle: "Sin precio",
  seoDescription: "",
  createdAt: "2026-10-26",
  updatedAt: "2026-10-26",
} as ProductRecord);
assert(unpriced === null, "sin precio no debe emitirse Product (snippets inválidos)");

const crumbs = asRecord(
  buildBreadcrumbJsonLd([
    homeBreadcrumb(),
    catalogBreadcrumb(),
    { name: "Material de curación", item: routes.category("material-de-curacion") },
  ]),
);
const crumbItems = crumbs.itemListElement as { position: number; name: string; item: string }[];
assert(crumbs["@type"] === "BreadcrumbList", "BreadcrumbList");
assert(crumbItems.every((item, index) => item.position === index + 1 && item.name && item.item.startsWith("https://")), "migas incompletas");

for (const [slug, fallback] of Object.entries(categorySeoFallbacks)) {
  if (!fallback.faq?.length) {
    errors.push(`${slug} no tiene FAQ`);
    continue;
  }
  const jsonLd = buildFaqJsonLd(faqPlainItems(fallback.faq));
  assert(jsonLd, `${slug} no arma FAQPage`);
  const cleaned = sanitizeSeoHtml(fallback.introHtml);
  assert(!cleaned.includes("<script") && cleaned.includes("<p>"), `${slug}: la intro no sobrevivió al sanitizado`);
  assert(cleaned.length > 40, `${slug}: intro vacía tras sanitizar`);
  const visible = fallback.faq.map((item) => `${item.question} ${faqPlainAnswer(item)}`).join(" ");
  assert(!/entrega inmediata/i.test(visible + cleaned), `${slug}: entrega inmediata`);
  assert(!/indicado por el médico|personal de salud|registro sanitario/i.test(visible + cleaned), `${slug}: advertencia prohibida`);
}

const guide = getGuide("como-elegir-medias-de-compresion");
assert(guide, "falta la guía de medias");
if (guide) {
  assert(buildFaqJsonLd(faqPlainItems(guide.faq)), "la guía no arma FAQPage");
  const blob = JSON.stringify(guide);
  assert(!/entrega inmediata|indicado por el médico|registro sanitario/i.test(blob), "la guía trae una frase prohibida");
  assert(/par/.test(blob), "la guía debe decir que se venden por par");
}

assert(siteConfig.homeSeoTitle === "Insumos médicos en Hermosillo | Tienda médica Promacson", "title de home");
assert(siteConfig.homeH1 === "Insumos médicos en Hermosillo", "H1 de home");
assert(homeMetaDescription.length === 150, `meta home tiene ${homeMetaDescription.length} caracteres`);
assert(homeIntro.startsWith("En Promacson Tienda encuentras insumos médicos en Hermosillo"), "intro de home");

function product(slug: string, name: string): ProductRecord {
  return {
    id: slug,
    slug,
    name,
    sku: null,
    description: null,
    saleMode: "UNIT_ONLY",
    badge: "Nuevo",
    categoryId: "c",
    categorySlug: "material-de-curacion",
    categoryName: "Material de curación",
    imageUrls: [],
    coverImageUrl: null,
    isActive: true,
    isFeatured: false,
    metaTitle: null,
    metaDescription: null,
    seoTitle: name,
    seoDescription: "",
    createdAt: "2026-10-26",
    updatedAt: "2026-10-26",
  };
}

const vendas = [
  product("venda-elastica-protec-5-cm-5-m", "5 cm"),
  product("venda-elastica-protec-7-cm-5-m", "7 cm"),
  product("venda-elastica-protec-10-cm-5-m", "10 cm"),
  product("venda-elastica-alta-compresion-protec-sport-7-cm-5-m", "sport"),
  product("protec-tela-adhesiva-seda-5cm-10m", "seda 5"),
  product("tela-adhesiva-de-seda-protec-1-25-cm-x-5-m", "seda 1.25"),
];
assert(variantGroupId("venda-elastica-protec-5-cm-5-m") === "venda-elastica-protec", "grupo de venda");
assert(
  variantGroupId("venda-elastica-alta-compresion-protec-sport-7-cm-5-m") === null,
  "la venda sport no es la misma familia",
);
const otras = otherMeasureProducts("venda-elastica-protec-5-cm-5-m", vendas);
assert(otras.length === 2, `otras medidas de la venda 5 cm: ${otras.length}`);
assert(
  variantGroupId("protec-tela-adhesiva-seda-5cm-10m") === variantGroupId("tela-adhesiva-de-seda-protec-1-25-cm-x-5-m"),
  "las telas de seda no quedaron en el mismo grupo",
);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("json-ld ok");
