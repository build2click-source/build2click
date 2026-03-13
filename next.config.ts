import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/personality-app',
          destination: '/404',
        },
        {
          source: '/personality-app/:path*',
          destination: '/404',
        },
      ],
      afterFiles: [
        {
          source: '/per-app',
          destination: '/personality-app',
        },
        {
          source: '/per-app/:path*',
          destination: '/personality-app/:path*',
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
