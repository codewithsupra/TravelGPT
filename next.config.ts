import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'places.googleapis.com', // add this
      // add any other external domains you need
    ],
  },

};

export default nextConfig;
