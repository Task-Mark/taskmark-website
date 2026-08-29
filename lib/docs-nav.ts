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
    description:
      "Slash commands: init, plan, save, plan-do, do, shelf, changelog, version, and commit.",
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
    description: "Static t-shirt sizes and points; parent rollups in the UI.",
  },
  {
    href: "/docs/workflows",
    title: "Workflows",
    description:
      "Overall tree, leaf-only writes, work logs, and when to plan, save, plan-do, or commit.",
  },
]

export const DOCS_COMMANDS = [
  {
    id: "tkmd-init",
    slash: "/tkmd-init",
    purpose: "Initialize a Taskmark board in the workspace",
  },
  {
    id: "tkmd-plan",
    slash: "/tkmd-plan",
    purpose: "Fit the smallest useful hierarchy to existing board work from prose",
  },
  {
    id: "tkmd-save",
    slash: "/tkmd-save",
    purpose:
      "After Cursor Plan mode, turn the plan into epic/story/task/bug items and carry plan visuals into those items",
  },
  {
    id: "tkmd-plan-do",
    slash: "/tkmd-plan-do",
    purpose:
      "Plan like /tkmd-plan, then implement the newly created items like /tkmd-do",
  },
  {
    id: "tkmd-do",
    slash: "/tkmd-do",
    purpose: "Implement work; never commits; executed leaves become done",
  },
  {
    id: "tkmd-shelf",
    slash: "/tkmd-shelf",
    purpose: "Discard never-implemented work as shelved; never commits",
  },
  {
    id: "tkmd-changelog",
    slash: "/tkmd-changelog",
    purpose:
      "Rebuild CHANGELOG Unreleased from recent done work; never commits",
  },
  {
    id: "tkmd-version",
    slash: "/tkmd-version",
    purpose:
      "Promote Unreleased into a dated SemVer section and set the board package.json version",
  },
  {
    id: "tkmd-commit",
    slash: "/tkmd-commit",
    purpose: "Commit dirty linked repos (the only commit command)",
  },
] as const
