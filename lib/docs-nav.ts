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
    description: "The four slash commands: init, create, do, and commit.",
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
    description: "Leaf-only writes, work logs, and the create → do → commit loop.",
  },
]

export const DOCS_COMMANDS = [
  {
    id: "tsmk-init",
    slash: "/tsmk-init",
    purpose: "Initialize a Taskmark board in the workspace",
  },
  {
    id: "tsmk-create",
    slash: "/tsmk-create",
    purpose: "Create an epic, story, task/bug, or a full tree from a description",
  },
  {
    id: "tsmk-do",
    slash: "/tsmk-do",
    purpose: "Implement work; never commits; executed leaves become done",
  },
  {
    id: "tsmk-commit",
    slash: "/tsmk-commit",
    purpose: "Commit dirty linked repos (the only commit command)",
  },
] as const
