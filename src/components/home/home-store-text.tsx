import Link from "next/link";
import { storeNap } from "@/config/store-nap";
import { routes } from "@/lib/routes";

const linkClass = "font-medium text-brand-700 hover:underline";
const whatsappHref = `https://wa.me/${storeNap.telephoneE164.replace(/\D/g, "")}`;

/** Bloque de visita, dentro de la sección de lectura de la home. */
export function HomeStoreText() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-text sm:text-2xl">Visítanos en Hermosillo</h2>
      <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
        La tienda está en {storeNap.address.streetAddress}, {storeNap.address.neighborhood}, de
        lunes a viernes de 8:00 a 17:00. Escríbenos al{" "}
        <a href={whatsappHref} className={linkClass} target="_blank" rel="noopener noreferrer">
          WhatsApp {storeNap.telephoneDisplay}
        </a>{" "}
        o ven a la tienda. También puedes ver la{" "}
        <Link href={routes.location} className={linkClass}>
          ubicación
        </Link>{" "}
        y conocer{" "}
        <Link href={routes.about} className={linkClass}>
          quiénes somos
        </Link>
        .
      </p>
    </div>
  );
}
