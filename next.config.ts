import { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
    ],
  },
};

export default nextConfig;
