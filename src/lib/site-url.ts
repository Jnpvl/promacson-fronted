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
 */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return originFromHostOrUrl(explicit);

  return new URL("http://localhost:3000/");
}
