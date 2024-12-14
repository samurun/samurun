import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {
    turbo: {},
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default nextConfig;
