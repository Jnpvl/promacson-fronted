export type CategorySeoFallback = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** H1 visible que reemplaza al nombre de la categoría (el nombre sigue en migas y tarjetas). */
  h1Override?: string;
  h2: string[];
  introHtml: string;
};

export const categorySeoFallbacks: Record<string, CategorySeoFallback> = {
  "material-de-curacion": {
    metaTitle: "Material de curación y gasas estériles Hermosillo",
    metaDescription: "Gasas estériles, vendas elásticas y enyesadas, algodón, cintas adhesivas y apósitos para consultorio y botiquín. Material de curación en Hermosillo.",
    h1: "Material de curación",
    h2: ["Gasas estériles, vendas y material de curación", "Cómo elegir gasas, vendas y cintas"],
    introHtml: "En Promacson Tienda reunimos el material de curación de uso diario en consultorios, clínicas y botiquines de Hermosillo: gasas estériles y no estériles, apósitos, algodón, torundas, hisopos, cintas adhesivas, vendas elásticas y vendas enyesadas, principalmente de la marca Protec. Cada producto indica su medida y presentación, y puedes agregarlo a tu cotización. Para limpiar y desinfectar consulta <a href=\"/catalogo/antisepticos-y-desinfectantes\">antisépticos y desinfectantes</a>; para guantes y jeringas, revisa <a href=\"/catalogo/equipo-medico\">equipo médico</a>.",
  },
  "ortopedia-y-soportes": {
    metaTitle: "Tienda de ortopedia en Hermosillo: soportes Daonsa | Promacson",
    metaDescription: "Tienda de ortopedia en Hermosillo: cabestrillo, collar cervical, férula de muñeca, inmovilizador de hombro y más soportes Daonsa. C. Benito Juárez 177, Col. Constitución.",
    h1: "Ortopedia y soportes",
    h1Override: "Ortopedia en Hermosillo: soportes y férulas",
    h2: ["Soportes ortopédicos Daonsa", "Cómo elegir un soporte ortopédico"],
    introHtml: "Si estás en recuperación por una lesión, una cirugía o necesitas apoyar una articulación, en Promacson Tienda encontrarás soportes ortopédicos de la marca Daonsa: cabestrillos, collares cervicales, férulas de muñeca, inmovilizadores de hombro, correas para clavícula y suspensorios. Atendemos a pacientes y consultorios de Hermosillo, y varios modelos manejan tallas. Para vendajes y fijación complementa tu compra con <a href=\"/catalogo/material-de-curacion\">material de curación</a>, o conoce las <a href=\"/catalogo/medias-de-compresion\">medias de compresión</a> para el cuidado de las piernas.",
  },
  "antisepticos-y-desinfectantes": {
    metaTitle: "Antisépticos y desinfectantes en Hermosillo",
    metaDescription: "Alcohol desnaturalizado y etílico, agua oxigenada, yodopovidona y gel antiséptico en varias presentaciones para botiquín y consultorio en Hermosillo.",
    h1: "Antisépticos y desinfectantes",
    h2: ["Antisépticos y desinfectantes disponibles", "Cómo elegir por presentación"],
    introHtml: "Para limpiar la piel y cuidar heridas menores, en Promacson Tienda manejamos antisépticos y desinfectantes de uso común en casa y consultorio: alcohol desnaturalizado en líquido y spray, alcohol etílico, agua oxigenada, solución de yodopovidona Dermodine y gel antiséptico para manos. Muchos se ofrecen en varios tamaños, desde 60 ml hasta un litro, para clientes y consultorios de Hermosillo. Complementa con <a href=\"/catalogo/material-de-curacion\">gasas, algodón y vendas</a> en nuestro material de curación.",
  },
  "medias-de-compresion": {
    metaTitle: "Medias de compresión Jobst en Hermosillo",
    metaDescription: "Medias de compresión Jobst de 15-20 y 20-30 mmHg: línea Relief a la rodilla o al muslo, con o sin punta, y línea Sport. Tallas S a XL. Hermosillo.",
    h1: "Medias de compresión",
    h2: ["Medias de compresión Jobst", "Cómo elegir nivel de compresión y largo"],
    introHtml: "Las medias de compresión ayudan a dar soporte a las piernas durante el día. En Promacson Tienda, en Hermosillo, ofrecemos la línea Jobst Relief y Jobst Sport en dos niveles de compresión, 15-20 y 20-30 mmHg, a la rodilla o al muslo, con punta o sin punta, en tallas S a XL. Si necesitas medias para pacientes encamados o postoperatorio, consulta las <a href=\"/catalogo/medias-antiembolicas\">medias antiembólicas</a>; también tenemos <a href=\"/catalogo/ortopedia-y-soportes\">ortopedia y soportes</a> para la recuperación.",
  },
  "medias-antiembolicas": {
    metaTitle: "Medias antiembólicas Protec en Hermosillo",
    metaDescription: "Medias antiembólicas Protec con compresión graduada y libres de látex, a la rodilla o al muslo, para uso hospitalario y postquirúrgico. Hermosillo.",
    h1: "Medias antiembólicas",
    h2: ["Medias antiembólicas Protec", "Cuándo se usan y cómo elegir el largo"],
    introHtml: "Las medias antiembólicas son medias de compresión graduada pensadas para pacientes con poca movilidad, encamados o en recuperación después de una cirugía. En Promacson Tienda, en Hermosillo, tenemos tres modelos Protec libres de látex: regular a la rodilla, corta al muslo y larga al muslo, en tallas CH, M y G. Su uso debe indicarlo el médico. Si buscas compresión para el día a día, conoce nuestras <a href=\"/catalogo/medias-de-compresion\">medias de compresión Jobst</a>.",
  },
  "equipo-medico": {
    metaTitle: "Guantes, jeringas y cubrebocas en Hermosillo",
    metaDescription: "Guantes de nitrilo y de látex para exploración, cubrebocas KN95 y de 3 capas, jeringas con aguja de 1 a 10 ml y termómetro digital. Hermosillo.",
    h1: "Equipo médico: guantes, jeringas y cubrebocas",
    h2: ["Guantes de nitrilo y de látex para exploración", "Jeringas con aguja y cubrebocas", "Cómo elegir guantes: nitrilo o látex"],
    introHtml: "Para el trabajo diario en consultorio, clínica o botiquín, en Promacson Tienda surtimos artículos de protección y consumibles médicos: guantes de exploración de nitrilo y de látex en caja de 100, cubrebocas KN95 y de 3 capas, jeringas con aguja de 1, 3, 5 y 10 ml, y un termómetro digital. Atendemos a consultorios y clientes de Hermosillo. Si además necesitas curación, revisa nuestro <a href=\"/catalogo/material-de-curacion\">material de curación</a>, incluidas las gasas estériles, y los <a href=\"/catalogo/antisepticos-y-desinfectantes\">antisépticos y desinfectantes</a>.",
  },
  "cuidado-avanzado-de-heridas": {
    metaTitle: "Cuidado avanzado de heridas en Hermosillo",
    metaDescription: "Apósitos Cutimed Alginate, Siltec y Sorbact y cinta de fijación Hypafix para el manejo de heridas, según indicación clínica. Hermosillo, Sonora.",
    h1: "Cuidado avanzado de heridas",
    h2: ["Apósitos y fijación para heridas", "Cómo elegir un apósito"],
    introHtml: "El cuidado avanzado de heridas utiliza apósitos especializados que se eligen según el tipo de herida y la indicación clínica. En Promacson Tienda, en Hermosillo, tenemos apósitos Cutimed de alginato (Alginate), de espuma con silicona (Siltec) y con tecnología DACC (Sorbact), además de Hypafix, una tela adhesiva que se vende por metro para fijar apósitos. Para el material básico de curación visita <a href=\"/catalogo/material-de-curacion\">gasas, vendas y cintas</a>, y para limpieza de la piel, <a href=\"/catalogo/antisepticos-y-desinfectantes\">antisépticos</a>.",
  },
};
