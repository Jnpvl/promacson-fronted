<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Promacson Tienda — reglas del proyecto

Portal B2B de insumos médicos (México). **Fase actual:** catálogo + cotización + leads (sin eCommerce ni precios en web). Stack: **Next.js 16 App Router**, TypeScript, Tailwind.

Documentación de negocio/arquitectura: `../docs/PROPUESTA-PORTAL-INSUMOS-MEDICOS.md`. Checklist contenido: `../docs/MAQUETACION-INICIO.md`. Esquema DB referencia: `../packages/database/prisma/schema.prisma` (no integrado al front aún).

## Monorepo

| Ruta | Rol |
|------|-----|
| `promacson-frontend/` | App web (trabajar aquí) |
| `docs/` | Propuesta y maquetación |
| `packages/database/` | Prisma referencia |

```bash
cd promacson-frontend && npm run dev
```

## Negocio y UX (no negociar sin pedido explícito)

- **Sin precios en web.** CTAs hacia cotización o contacto comercial.
- **Mayoreo** (`/mayoreo`): clínicas, hospitales, distribuidores que **compran** a Promacson (volumen / comercial).
- **Cotización** (`/cotizacion`): quien **no** es flujo mayoreo; carrito de intención (aún sin persistencia real).
- **Catálogo canónico:** `/catalogo` y `/catalogo/[slug]`. No usar `/categorias` en links nuevos (redirect 301 en `next.config.ts` + páginas legacy en `app/categorias/`).
- **Menú principal:** Catálogo · Servicios · Nosotros · Mayoreo + botón **Cotización** + buscador.
- **Redirects de rutas viejas:** `/contacto` → `/cotizacion`; `/proveedor`, `/area-comercial` → `/mayoreo`.
- **SKU:** no mostrar en UI (puede existir en tipos/API).
- **Idioma UI:** español (México). Tono producto real, no “wireframe” ni placeholders obvios en copy visible.

## Marca

- Nombre: **Promacson** + línea **TIENDA** (mayúsculas, tracking) vía `BrandName`.
- Título sitio / pestaña: **Promacson Tienda** (`siteConfig.siteTitle`).
- Color primario: `#005F71` (tokens `brand-*` en `globals.css`).
- **Logo:** solo PNG `public/brand/logo.png`. No usar SVG inventados. Header ~40px, footer ~48px.

## Rutas

Usar siempre `src/lib/routes.ts` — no hardcodear paths en componentes.

| Ruta | Uso |
|------|-----|
| `/` | Home |
| `/catalogo`, `/catalogo/[slug]` | Catálogo |
| `/producto/[slug]` | PDP |
| `/servicios`, `/servicios/[slug]` | Servicios |
| `/cotizacion` | Cotización |
| `/mayoreo` | Mayoreo |
| `/nosotros` | Nosotros |
| `/buscar` | Búsqueda |
| `/admin` | Login panel admin |
| `/admin/sliders` | Sliders |
| `/admin/categorias` | Categorías del catálogo |
| `/admin/productos` | Productos del catálogo |
| `/admin/servicios` | Servicios del sitio |

## Datos: consumir API, no hardcodear en UI

Patrón: **mock local** + **fetch con fallback** hasta que exista backend.

| Dato | Mock | Servicio |
|------|------|----------|
| Contacto (tel, email, WhatsApp) | `src/lib/mock-site-contact.ts` | `site-contact.service.ts` → `GET /api/v1/site/contact` |
| Admin (login / sesión) | — | `auth.service.ts` → `POST /api/v1/auth/login`, `GET /api/v1/auth/me` |
| Sliders (carrusel inicio) | `mock-hero-slides.ts` | `sliders.service.ts` → `GET /api/v1/sliders`; admin vía `/api/admin/sliders` |
| Categorías | — (solo API) | `categories.service.ts` → `GET /api/v1/categories`; admin vía `/api/admin/categories` |
| Productos (catálogo) | — (solo API) | `products.service.ts` → `GET /api/v1/products`; admin `/api/admin/products` |
| Servicios | — (solo API) | `services.service.ts` → `GET /api/v1/services`; admin `/api/admin/services` |

**Cliente HTTP:** `src/lib/api/client.ts` (`apiClient`, `createApiClient`). Rutas en `src/lib/api/endpoints.ts`. Config en `src/lib/api/config.ts`. La lógica de negocio va en `src/lib/services/*.service.ts` — no llamar `fetch` al backend desde componentes.

- **Contacto:** nunca volver a poner tel/email/WhatsApp en `src/config/site.ts`.
- **Env:** `API_URL` o `NEXT_PUBLIC_API_URL` (ver `.env.example`). Sin URL → mock.
- **Admin login UI:** `POST /api/admin/auth/login` (cookie httpOnly); el route handler usa `auth.service`.
- Helpers de enlaces: `src/lib/site-contact-utils.ts` (`phoneHref`, `mailtoHref`, `whatsappHref`).

`src/config/site.ts` solo para **marca y contenido editorial estático** (tagline, description, hero slides, promociones, `quoteCount` temporal del carrito).

## Componentes y estructura

```
src/
  app/              # App Router (páginas)
  components/
    layout/         # SiteShell (async), Header, Footer, MobileQuoteBar
    ui/             # Logo, BrandName, Button, PageHeader, Badge
    catalog/        # ProductCard, CategoryCard, ServiceCard
    home/           # Secciones del inicio
  config/site.ts
  lib/routes.ts, mock-*.ts, api/, services/, site-contact.ts
  types/
```

- **`SiteShell`:** Server Component async; hace `getSiteContact()` y pasa `contact` a Header/Footer/MobileQuoteBar.
- Reutilizar cards existentes; mantener gradientes/CTAs al estilo de `CategoryCard` / `ServiceCard`.
- Formularios (cotización, mayoreo): maquetados; **sin envío a API** hasta implementarlo.

## Código

- Cambios **mínimos y focalizados**; seguir convenciones del archivo (nombres, imports, Tailwind).
- Preferir **Server Components**; cliente solo si hace falta interactividad.
- No sobre-ingeniería (helpers de una línea, abstracciones prematuras).
- Comentarios solo para lógica no obvia.
- No crear commits ni push salvo que el usuario lo pida.
- No commitear secretos (`.env`).

## SEO

- Metadata en `app/layout.tsx` con template `%s | Promacson Tienda` y `metadataBase` (`NEXT_PUBLIC_SITE_URL`).
- Canónicas: `withCanonical()` en `src/lib/seo-metadata.ts` (rutas de `routes.ts`).
- URLs legibles en español (`/catalogo/curacion`, no IDs en path público).

## Pendiente (no asumir hecho)

- Backend/API real (catálogo, cotización, leads, carrito).
- Imágenes reales (`imageUrl` en mocks).
- CRUD admin (sliders, catálogo, etc.) — login en `/admin` operativo.
