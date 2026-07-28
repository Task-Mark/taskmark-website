/** Public site links — override via env when remotes/org are finalized. */
export const SITE = {
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/taskmark/taskmark-cursor",
  docsPath: "/docs",
  startPath: "/docs/setup#install",
  contactPath: "/#contact",
  featuresPath: "/#features",
} as const
