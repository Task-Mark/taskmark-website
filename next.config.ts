import path from "node:path"
import { fileURLToPath } from "node:url"

import type { NextConfig } from "next";

const workspaceRoot = path.dirname(
  path.dirname(fileURLToPath(import.meta.url))
)

const nextConfig: NextConfig = {
  outputFileTracingRoot: workspaceRoot,
  transpilePackages: ["@taskmark/components"],
  turbopack: {
    root: workspaceRoot,
  },
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
