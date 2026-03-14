import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/author/bbta',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/category/barista-informantion',
      destination: '/blog',
      permanent: true,
    },
  ],
  compress: true,
  headers: async () => [
    {
      source: '/_next/static/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/fonts/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
      ],
    },
    {
      source: '/_next/image/:path*',
      headers: [
        { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=31536000' },
      ],
    },
  ],
};

export default nextConfig;
