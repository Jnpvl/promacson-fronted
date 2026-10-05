/** Texto legal aprobado (aviso de privacidad y términos). Contenido sin cambios respecto a los .md aprobados; solo formato. */
export type LegalInline = string | { b: string };
export type LegalBlock = { t: "h2"; x: string } | { t: "p"; x: LegalInline[] };
export type LegalDoc = { title: string; blocks: LegalBlock[] };

export const privacyDoc: LegalDoc = {
  "title": "Aviso de Privacidad — Promacson Tienda",
  "blocks": [
    {
      "t": "p",
      "x": [
        {
          "b": "Última actualización:"
        },
        " 4 de octubre de 2026"
      ]
    },
    {
      "t": "p",
      "x": [
        {
          "b": "Promacson Tienda"
        },
        ", con domicilio en C. Benito Juárez 177, Col. Constitución, Hermosillo, Sonora, es responsable del tratamiento de los datos personales que usted nos proporcione, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares."
      ]
    },
    {
      "t": "h2",
      "x": "Qué información recibimos"
    },
    {
      "t": "p",
      "x": [
        "Este sitio no recopila información personal de forma automática. No utilizamos cookies de rastreo propias, herramientas de analítica ni píxeles publicitarios. Algunos contenidos de terceros, como los mapas de Google, pueden usar sus propias cookies."
      ]
    },
    {
      "t": "p",
      "x": [
        "Solo recibimos los datos que usted decide compartirnos voluntariamente, por ejemplo al escribirnos por WhatsApp, llamarnos por teléfono o enviar un formulario de contacto, cotización o mayoreo."
      ]
    },
    {
      "t": "h2",
      "x": "Para qué los usamos"
    },
    {
      "t": "p",
      "x": [
        "Usamos esos datos únicamente para responder a su mensaje, elaborar su cotización y dar seguimiento a su pedido. No vendemos su información ni la compartimos con terceros con fines comerciales; solo se procesa mediante los servicios técnicos necesarios para operar el sitio y enviarnos su mensaje, o cuando la ley lo exija. Conservamos sus datos solo el tiempo necesario para atender su solicitud."
      ]
    },
    {
      "t": "h2",
      "x": "Sus derechos"
    },
    {
      "t": "p",
      "x": [
        "Usted puede solicitar en cualquier momento el acceso, rectificación, cancelación u oposición (derechos ARCO) respecto de sus datos, o retirar su consentimiento, escribiendo a ",
        {
          "b": "gerardo@promacson.com.mx"
        },
        "."
      ]
    },
    {
      "t": "h2",
      "x": "Cambios a este aviso"
    },
    {
      "t": "p",
      "x": [
        "Cualquier cambio a este aviso se publicará en este sitio, indicando la fecha de actualización."
      ]
    }
  ]
};

export const termsDoc: LegalDoc = {
  "title": "Términos y Condiciones — Promacson Tienda",
  "blocks": [
    {
      "t": "p",
      "x": [
        {
          "b": "Última actualización:"
        },
        " 4 de octubre de 2026"
      ]
    },
    {
      "t": "p",
      "x": [
        "Estos términos aplican al uso de este sitio de ",
        {
          "b": "Promacson Tienda"
        },
        ", con domicilio en C. Benito Juárez 177, Col. Constitución, Hermosillo, Sonora. Al usar el sitio, usted acepta estos términos."
      ]
    },
    {
      "t": "h2",
      "x": "Información del sitio"
    },
    {
      "t": "p",
      "x": [
        "El contenido del sitio es informativo. Las descripciones e imágenes de los productos son de referencia y pueden variar según el fabricante o la presentación. Procuramos que la información esté actualizada, pero puede contener errores u omisiones."
      ]
    },
    {
      "t": "h2",
      "x": "Precios y disponibilidad"
    },
    {
      "t": "p",
      "x": [
        "Los precios, la disponibilidad y las condiciones de venta están sujetos a cambio sin previo aviso y se confirman únicamente en la cotización correspondiente."
      ]
    },
    {
      "t": "h2",
      "x": "Pedidos"
    },
    {
      "t": "p",
      "x": [
        "Los pedidos se realizan mediante cotización. Solicitar una cotización no obliga a ninguna de las partes; el pedido queda confirmado cuando usted acepta la cotización y Promacson Tienda confirma la disponibilidad."
      ]
    },
    {
      "t": "h2",
      "x": "Uso de los productos"
    },
    {
      "t": "p",
      "x": [
        "Los productos deben utilizarse bajo indicación y supervisión de un profesional de la salud y conforme a las instrucciones del fabricante. Promacson Tienda no se hace responsable por un uso distinto al indicado."
      ]
    },
    {
      "t": "h2",
      "x": "Propiedad intelectual"
    },
    {
      "t": "p",
      "x": [
        "La marca, los textos y el diseño del sitio pertenecen a Promacson Tienda o a sus respectivos titulares y no pueden usarse sin autorización."
      ]
    },
    {
      "t": "h2",
      "x": "Ley aplicable"
    },
    {
      "t": "p",
      "x": [
        "Estos términos se rigen por las leyes de México y del estado de Sonora. Cualquier controversia se resolverá ante los tribunales competentes de Hermosillo, Sonora."
      ]
    },
    {
      "t": "h2",
      "x": "Contacto"
    },
    {
      "t": "p",
      "x": [
        "Para dudas sobre estos términos, escríbanos a ",
        {
          "b": "gerardo@promacson.com.mx"
        },
        "."
      ]
    }
  ]
};
