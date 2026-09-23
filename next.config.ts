import type { NextConfig } from "next";

const apiUrl =
  process.env.API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "https://jp-enterprise.tail5cbc3e.ts.net";

function uploadRemotePattern(url: string): {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
} {
  const parsed = new URL(url);
  const protocol = parsed.protocol === "http:" ? "http" : "https";
  return {
    protocol,
    hostname: parsed.hostname,
    ...(parsed.port ? { port: parsed.port } : {}),
    pathname: "/uploads/**",
  };
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [uploadRemotePattern(apiUrl)],
    minimumCacheTTL: 60,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${apiUrl.replace(/\/$/, "")}/uploads/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/categorias",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/categorias/:slug",
        destination: "/catalogo/:slug",
        permanent: true,
      },
      {
        source: "/contacto",
        destination: "/cotizacion",
        permanent: true,
      },
      {
        source: "/area-comercial",
        destination: "/mayoreo",
        permanent: true,
      },
      {
        source: "/proveedor",
        destination: "/mayoreo",
        permanent: true,
      },
      {
        source: "/producto/baston-con-asiento-plegable",
        destination: "/catalogo/ortopedia-y-soportes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
