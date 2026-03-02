import type { NextConfig } from 'next';

/**
 * Validate environment variables at build time.
 * Import env here so it runs during `next build`.
 */
await import('./env');

const nextConfig: NextConfig = {
  /** Transpile monorepo packages */
  transpilePackages: ['@repo/ui', '@repo/api', '@repo/models', '@repo/auth', '@repo/database', '@repo/env'],

  /** Recommended for production */
  reactStrictMode: true,

  /** Enable standalone output for Docker deployments */
  // output: 'standalone',

  /** Image optimization domains */
  images: {
    remotePatterns: [
      // Add your image domains here
    ],
  },
};

export default nextConfig;
