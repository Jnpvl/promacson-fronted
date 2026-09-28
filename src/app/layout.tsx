import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/config/site";
import { buildLocalBusinessJsonLd } from "@/lib/local-business-jsonld";
import { defaultSiteOpenGraph } from "@/lib/seo-metadata";
import { getSiteUrl } from "@/lib/site-url";
import { QuoteCartProvider } from "@/contexts/quote-cart-context";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.siteTitle}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  ...defaultSiteOpenGraph(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildLocalBusinessJsonLd();

  return (
    <html lang="es" className={`${geist.variable} h-full`}>
      <body className="flex min-h-full flex-col pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <QuoteCartProvider>{children}</QuoteCartProvider>
      </body>
    </html>
  );
}
