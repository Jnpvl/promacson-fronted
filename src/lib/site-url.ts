/** Origen público del sitio (SEO: metadataBase, Open Graph, canónicas absolutas). */
export function getSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const normalized = explicit.replace(/\/$/, "");
    return new URL(`${normalized}/`);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return new URL(`https://${host}/`);
  }

  return new URL("http://localhost:3000/");
}
