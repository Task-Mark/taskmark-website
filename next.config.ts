import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/docs/velocity",
        destination: "/docs/sizing",
        permanent: true,
      },
      {
        source: "/docs/readme",
        destination: "/docs/structure",
        permanent: true,
      },
    ]
  },
}

export default nextConfig;
