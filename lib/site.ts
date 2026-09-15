/** Public site links — override via env when remotes/org are finalized. */
export const SITE = {
  /** Canonical origin for absolute OG/Twitter URLs (no trailing slash). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://taskmark.dev").replace(
    /\/$/,
    ""
  ),
  githubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/taskmark/taskmark-cursor",
  /** Hosted product board the team uses to develop Taskmark (also the live UI demo). */
  boardUrl:
    process.env.NEXT_PUBLIC_BOARD_URL ?? "https://board.taskmark.dev/",
  /** Hosted Taskmark Cloud app — shared read of synced local boards. */
  cloudUrl:
    process.env.NEXT_PUBLIC_CLOUD_URL ?? "https://cloud.taskmark.dev",
  cloudLoginUrl: `${
    process.env.NEXT_PUBLIC_CLOUD_URL ?? "https://cloud.taskmark.dev"
  }/login`,
  docsPath: "/docs",
  cloudDocsPath: "/docs/cloud",
  startPath: "/docs/setup#install",
  contactPath: "/#contact",
  featuresPath: "/#features",
} as const
