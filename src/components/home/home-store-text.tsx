import Link from "next/link";
import { routes } from "@/lib/routes";

const linkClass = "font-medium text-brand-700 hover:underline";

/** Texto descriptivo de la tienda física (SEO local: "tienda médica" / "insumos médicos" Hermosillo). */
export function HomeStoreText() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
      <div className="max-w-3xl space-y-4 text-text-muted">
        <h2 className="text-2xl font-bold text-text">Tu tienda médica en Hermosillo</h2>
        <p className="leading-relaxed">
          Promacson Tienda es una tienda médica en Hermosillo, Sonora, con insumos médicos para
          consultorios, clínicas, hospitales y el cuidado en casa. Encuentra{" "}
          <Link href="/catalogo/material-de-curacion" className={linkClass}>
            material de curación
          </Link>{" "}
          como gasas estériles, vendas, algodón y apósitos;{" "}
          <Link href="/catalogo/equipo-medico" className={linkClass}>
            equipo médico
          </Link>{" "}
          como guantes de látex y nitrilo, jeringas y cubrebocas;{" "}
          <Link href="/catalogo/antisepticos-y-desinfectantes" className={linkClass}>
            antisépticos y desinfectantes
          </Link>
          ;{" "}
          <Link href="/catalogo/medias-de-compresion" className={linkClass}>
            medias de compresión
          </Link>{" "}
          y{" "}
          <Link href="/catalogo/ortopedia-y-soportes" className={linkClass}>
            ortopedia
          </Link>
          .
        </p>
        <p className="leading-relaxed">
          Estamos en{" "}
          <Link href={routes.location} className={linkClass}>
            C. Benito Juárez 177
          </Link>
          , Col. Constitución, de lunes a viernes de 8:00 a 17:00. Arma tu cotización en línea por
          pieza o por caja, o llámanos al 662 450 1230.
        </p>
      </div>
    </section>
  );
}
