import Link from "next/link";
import { storeNap } from "@/config/store-nap";
import { routes } from "@/lib/routes";

const linkClass = "font-medium text-brand-700 hover:underline";
const whatsappHref = `https://wa.me/${storeNap.telephoneE164.replace(/\D/g, "")}`;

/** Bloque de visita. El texto largo de la home está en HomeIntro. */
export function HomeStoreText() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
      <div className="max-w-3xl space-y-4 text-text-muted">
        <h2 className="text-2xl font-bold text-text">Visítanos en Hermosillo</h2>
        <p className="leading-relaxed">
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
    </section>
  );
}
