import type { NextConfig } from "next";

const apiUrl =
  process.env.API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  "http://localhost:4000";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
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
    ];
  },
};

export default nextConfig;
