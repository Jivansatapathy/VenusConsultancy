/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 uses React 19 by default
  reactStrictMode: false, // Disabled to prevent double renders in development
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  
  // Suppress console warnings in production
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  
  // Rewrites for API proxy (if needed)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/:path*`,
      },
    ];
  },
  
  // Disable Turbopack to fix CSS chunk loading issues in Next.js 16
  // Turbopack can have issues with CSS code splitting
  // Remove this comment and uncomment experimental.turbo once CSS issues are resolved
  // experimental: {
  //   turbo: {},
  // },
};

module.exports = nextConfig;

