const allowedTag = /^<\/?(?:p|a|strong|h2|ul|li)(?:\s+href="\/[^"]*")?\s*\/?>$/i;

/** Keep the small, code-owned SEO snippets limited to the spec's safe tags. */
export function sanitizeSeoHtml(value: string): string {
  return value.replace(/<[^>]*>/g, (tag) => (allowedTag.test(tag) ? tag : ""));
}
