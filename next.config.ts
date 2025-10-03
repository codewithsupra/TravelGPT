import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Completely ignore TS errors during build
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "places.googleapis.com",
      // Add any other external domains you need
    ],
  },
};

export default nextConfig;
