# promacson-frontend

Portal web Promacson (Next.js). Actualmente prioriza la **página de inicio**; el resto de rutas se irán alineando al mismo diseño.

## Desarrollo

```bash
npm install
npm run dev
```

## Configuración de contenido

- **Marca y copy estático** (hero, promos, tagline): `src/config/site.ts`
- **Contacto** (teléfono, email, WhatsApp): se consume con `getSiteContact()` → `GET /api/v1/site/contact`. Sin `API_URL` / `NEXT_PUBLIC_API_URL` usa el mock en `src/lib/mock-site-contact.ts`. Ver `.env.example`.

Checklist de material para el home: `../docs/MAQUETACION-INICIO.md`
