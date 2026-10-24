import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // lucide-react is already optimized by default
    optimizePackageImports: ['@radix-ui/react-icons'],
  },
  images: {
    remotePatterns: [
      // Spotify album art (footer player)
      { hostname: 'i.scdn.co' },
      // GitHub repo cards
      { hostname: 'opengraph.githubassets.com' },
    ],
  },
  // The site is home-only now; send links to the removed pages back home
  async redirects() {
    return [
      { source: '/projects/:path*', destination: '/#projects', permanent: true },
      ...['labs', 'music', 'hiking', 'activities'].map((page) => ({
        source: `/${page}/:path*`,
        destination: '/',
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
