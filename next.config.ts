import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* existing config options here */

  // Skip ESLint checks during production builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
