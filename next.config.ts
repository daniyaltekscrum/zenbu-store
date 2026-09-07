import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.dvago.pk",
      },
      {
        protocol: "https",
        hostname: "dvago.pk",
      },
    ],
  },
};

export default nextConfig;
