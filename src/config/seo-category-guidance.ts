export const categorySeoGuidance: Record<string, string[]> = {
  "material-de-curacion": [
    "Las gasas estériles sirven para cubrir heridas; las no estériles, para limpieza o uso general. En vendas y cintas, fíjate en el ancho y el largo que indica cada producto.",
  ],
  "ortopedia-y-soportes": [
    "Revisa la zona del cuerpo que se va a apoyar y la talla que indica cada producto. Collares y suspensorios manejan tallas; úsalos según indicación médica.",
  ],
  "antisepticos-y-desinfectantes": [
    "El mismo producto puede ofrecerse en distintos tamaños, desde 60 hasta 1000 ml, y en líquido o spray. Elige según el uso: botiquín, consultorio o reposición.",
  ],
  "medias-de-compresion": [
    "Cada modelo indica su compresión (15-20 o 20-30 mmHg), largo (rodilla o muslo), si lleva punta cerrada y las tallas S a XL. El nivel adecuado debe definirlo tu médico.",
  ],
  "medias-antiembolicas": [
    "Se usan en pacientes encamados y en recuperación postquirúrgica, según indicación médica. Hay modelos a la rodilla y al muslo, con tallas CH, M y G.",
  ],
  "equipo-medico": [
    "Las jeringas disponibles tienen capacidades de 1, 3, 5 y 10 ml; los cubrebocas incluyen opciones KN95 y de 3 capas.",
    "Piensa primero en el uso que le vas a dar y en las necesidades de quien lo va a usar, en casa, consultorio o clínica. Revisa las medidas, la capacidad o el peso máximo que indica cada producto, y si cuenta con certificaciones o registro sanitario. Considera también el mantenimiento, los consumibles y la garantía. Si tienes dudas, pregúntanos en la tienda antes de cotizar; el uso clínico debe indicarlo el personal de salud.",
  ],
  "cuidado-avanzado-de-heridas": [
    "La elección depende del tipo de herida y del exudado, y debe definirla el personal de salud. Cada producto indica su tecnología (alginato, espuma de silicona o DACC) y su medida.",
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
