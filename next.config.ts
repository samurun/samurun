import createMDX from '@next/mdx';
import { NextConfig } from 'next';
import { hostname } from 'os';
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // next config here...
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
