export const categorySeoGuidance: Record<string, string[]> = {
  "material-de-curacion": [
    "Las gasas estériles sirven para cubrir heridas; las no estériles, para limpieza o uso general. En vendas y cintas, fíjate en el ancho y el largo que indica cada producto.",
  ],
  "ortopedia-y-soportes": [
    "Elige según la zona que necesitas apoyar y revisa la talla en la ficha de cada producto. ¿Dudas con la medida? Escríbenos por WhatsApp o visítanos en Hermosillo y te ayudamos a encontrar la tuya.",
  ],
  "antisepticos-y-desinfectantes": [
    "El mismo producto puede ofrecerse en distintos tamaños, desde 60 hasta 1000 ml, y en líquido o spray. Elige según el uso: botiquín, consultorio o reposición.",
  ],
  "medias-de-compresion": [
    "Cada modelo indica su compresión (15-20 o 20-30 mmHg), largo (rodilla o muslo), si lleva punta cerrada y las tallas S a XL. ¿Ya sabes qué compresión buscas? Escríbenos por WhatsApp o visítanos en Hermosillo y te ayudamos con modelo y talla.",
  ],
  "medias-antiembolicas": [
    "Hay modelos a la rodilla y al muslo, en tallas CH, M y G, para pacientes encamados o en recuperación postquirúrgica. Escríbenos por WhatsApp o visítanos en Hermosillo y te ayudamos a elegir modelo y talla.",
  ],
  "equipo-medico": [
    "Las jeringas disponibles tienen capacidades de 1, 3, 5 y 10 ml; los cubrebocas incluyen opciones KN95 y de 3 capas.",
    "Elige según dónde lo vas a usar, en casa, consultorio o clínica, y revisa medidas y capacidad en la ficha. ¿No sabes cuál te conviene? Escríbenos por WhatsApp o visítanos en Hermosillo y te ayudamos a escoger el ideal.",
  ],
  "cuidado-avanzado-de-heridas": [
    "Cada producto indica su tecnología (alginato, espuma de silicona o DACC) y su medida. ¿Ya sabes cuál buscas o tienes dudas? Escríbenos por WhatsApp o visítanos en Hermosillo y te ayudamos a encontrarlo.",
  ],
};

/**
 * "Cómo elegir" por producto: tiene prioridad sobre el de la categoría cuando el nombre o
 * el slug coinciden (ej. el consejo de guantes solo en productos de guantes).
 */
export const productSeoGuidanceRules: { match: RegExp; text: string }[] = [
  {
    match: /guante/i,
    text: "Los guantes de nitrilo y látex se ofrecen en tallas chico, mediano y grande, en caja con 100 piezas, ambidiestros y no estériles.",
  },
];

export function productSeoGuidance(product: { name: string; slug: string }): string | undefined {
  const haystack = `${product.name} ${product.slug}`;
  return productSeoGuidanceRules.find((rule) => rule.match.test(haystack))?.text;
}
