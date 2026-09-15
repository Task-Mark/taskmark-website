import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const siblingComponents = path.join(projectRoot, "..", "taskmark-ui")
const workspaceRoot = fs.existsSync(siblingComponents)
  ? path.dirname(projectRoot)
  : projectRoot

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
