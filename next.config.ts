import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon",
      },
    ];
  },
};

export default nextConfig;
