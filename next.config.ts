import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons", "clsx", "tailwind-merge"],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
      {
        hostname: 'mosaic.scdn.co',
      },
      {
        hostname: 'opengraph.githubassets.com',
      },
      {
        hostname: 'raw.githubusercontent.com',
      },
      {
        hostname: 'user-images.githubusercontent.com',
      },
      {
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;
