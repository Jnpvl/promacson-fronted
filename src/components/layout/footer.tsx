import Link from "next/link";
import { siteConfig } from "@/config/site";
import {
  facebookHref,
  hasFacebook,
  mailtoHref,
  phoneHref,
  whatsappHref,
} from "@/lib/site-contact-utils";
import { routes } from "@/lib/routes";
import { Logo } from "@/components/ui/logo";
import type { Service } from "@/types/service";
import type { SiteContact } from "@/types/site-contact";

export function Footer({ contact, services }: { contact: SiteContact; services: Service[] }) {
  return (
    <footer className="mt-12 border-t border-border bg-brand-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Logo showName nameVariant="light" size={48} />
            <p className="mt-3 max-w-xs text-xs leading-relaxed text-brand-100">{siteConfig.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4 sm:gap-8">
            <div>
              <p className="font-semibold text-white">Catálogo</p>
              <ul className="mt-2 space-y-1.5 text-brand-100">
                <li>
                  <Link href={routes.catalog} className="hover:text-white">
                    Ver todo el catálogo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Servicios</p>
              <ul className="mt-2 space-y-1.5 text-brand-100">
                <li>
                  <Link href={routes.services} className="hover:text-white">
                    Ver servicios
                  </Link>
                </li>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={routes.serviceDetail(s.slug)} className="hover:text-white">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Empresa</p>
              <ul className="mt-2 space-y-1.5 text-brand-100">
                <li>
                  <Link href={routes.about} className="hover:text-white">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href={routes.wholesale} className="hover:text-white">
                    Mayoreo
                  </Link>
                </li>
                <li>
                  <Link href={routes.quote} className="hover:text-white">
                    Cotización
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white">Contacto</p>
              <ul className="mt-2 space-y-1.5 text-brand-100">
                <li>
                  <a href={phoneHref(contact)} className="hover:text-white">
                    {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={mailtoHref(contact)} className="hover:text-white">
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref(contact)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp
                  </a>
                </li>
                {hasFacebook(contact) ? (
                  <li>
                    <a
                      href={facebookHref(contact)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                    >
                      Facebook
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-brand-700 pt-4 text-center text-xs text-brand-100">
          © {new Date().getFullYear()} {siteConfig.siteTitle}
        </p>
      </div>
    </footer>
  );
}
