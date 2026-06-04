function originFromHostOrUrl(value: string): URL {
  const trimmed = value.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return new URL(`${trimmed}/`);
  }
  const host = trimmed.replace(/^https?:\/\//, "");
  return new URL(`https://${host}/`);
}

/**
 * Origen público del sitio (SEO: metadataBase, Open Graph, canónicas absolutas).
 * En producción define NEXT_PUBLIC_SITE_URL=https://promacsontienda.com en Vercel.
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return originFromHostOrUrl(explicit);

  // Dominio de producción en Vercel (custom domain), no la URL de preview del deploy.
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) return originFromHostOrUrl(production);

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return originFromHostOrUrl(vercel);

  return new URL("http://localhost:3000/");
}
