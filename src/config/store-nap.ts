/**
 * NAP canónico de la tienda (SEO / footer / JSON-LD).
 * Solo sucursal Juárez 177 — nunca almacén Balderrama/Américas.
 */
export const storeNap = {
  name: "Promacson Tienda",
  url: "https://promacsontienda.com",
  telephoneDisplay: "662 450 1230",
  telephoneE164: "+526624501230",
  email: "gerardo@promacson.com.mx",
  /** Una línea legible (footer, ubicación, view-source). */
  addressFull:
    "C. Benito Juárez 177, Col. Constitución, Hermosillo, Sonora, C.P. 83150",
  hoursDisplay: "Lun–Vie 8:00–17:00",
  address: {
    streetAddress: "C. Benito Juárez 177",
    addressLocality: "Hermosillo",
    addressRegion: "Sonora",
    postalCode: "83150",
    addressCountry: "MX",
    neighborhood: "Col. Constitución",
  },
  openingHoursSpecification: {
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ] as const,
    opens: "08:00",
    closes: "17:00",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Promacson+Tienda/data=!4m2!3m1!1s0x0:0x4e69af9c013e8113",
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=C.+Benito+Ju%C3%A1rez+177,+Constituci%C3%B3n,+83150+Hermosillo,+Son.&hl=es&z=16&output=embed",
} as const;

export type StoreNap = typeof storeNap;
