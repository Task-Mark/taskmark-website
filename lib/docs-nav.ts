export type DocsNavItem = {
  href: string
  title: string
  description: string
}

/**
 * Documentation information architecture (T-219).
 * Routes under /docs for Taskmark product documentation.
 */
export const DOCS_NAV: DocsNavItem[] = [
  {
    href: "/docs",
    title: "Overview",
    description: "What Taskmark is and how the docs are organized.",
  },
  {
    href: "/docs/setup",
    title: "Setup",
    description: "Install the Cursor plugin and create your first board.",
  },
  {
    href: "/docs/commands",
    title: "Commands",
    description: "Slash commands for create, work sessions, sync, and commits.",
  },
  {
    href: "/docs/structure",
    title: "Folder structure",
    description: "Single-repo vs multi-repo boards and file conventions.",
  },
  {
    href: "/docs/specification",
    title: "File specification",
    description:
      "Epic, story, task, and bug markdown shape for the UI and manual edits.",
  },
  {
    href: "/docs/sizing",
    title: "Sizing & points",
    description: "T-shirt sizes, Fibonacci points, and rollups.",
  },
  {
    href: "/docs/velocity",
    title: "Velocity",
    description: "Current Speed, ETA, and estimate intensity.",
  },
  {
    href: "/docs/readme",
    title: "README dashboard",
    description: "Managed README sections and how they refresh.",
  },
  {
    href: "/docs/workflows",
    title: "Workflows",
    description: "Work logs, actuals, multi-repo loop, and audit trails.",
  },
]

export const DOCS_COMMANDS = [
  {
    id: "new-epic",
    slash: "/new-epic",
    skill: "create-epic",
    purpose: "Create an epic on the board",
  },
  {
    id: "new-story",
    slash: "/new-story",
    skill: "create-story",
    purpose: "Create a user story under an epic (or General)",
  },
  {
    id: "new-task",
    slash: "/new-task",
    skill: "create-task",
    purpose: "Create a task or bug under a story or epic",
  },
  {
    id: "start-work",
    slash: "/start-work",
    skill: "start-work",
    purpose: "Open a billable work session on an item",
  },
  {
    id: "complete-work",
    slash: "/complete-work",
    skill: "complete-work",
    purpose: "Close the session and recompute Actual",
  },
  {
    id: "commit-all",
    slash: "/commit-all",
    skill: "commit-all",
    purpose: "Commit every dirty linked repo with simple messages",
  },
  {
    id: "log-commits",
    slash: "/log-commits",
    skill: "log-commits",
    purpose: "Append git SHAs to an item Commits table",
  },
  {
    id: "sync-status",
    slash: "/sync-status",
    skill: "sync-status",
    purpose: "Recompute status, actuals, INDEX, and README",
  },
  {
    id: "sync-repos",
    slash: "/sync-repos",
    skill: "sync-taskmark-repos",
    purpose: "Ensure board location and refresh REPOS.md",
  },
  {
    id: "sync-plugin-local",
    slash: "/sync-plugin-local",
    skill: "sync-plugin-local",
    purpose: "Rsync plugin package into local Cursor install",
  },
  {
    id: "velocity",
    slash: "/velocity",
    skill: "taskmark-velocity",
    purpose: "Report Current Speed and delivery ETA",
  },
  {
    id: "board-status",
    slash: "/board-status",
    skill: "taskmark-overview",
    purpose: "Summarize board by status and effort",
  },
] as const
