export type DocsNavItem = {
  href: string
  title: string
  description: string
  badge?: string
}

/**
 * Documentation information architecture (T-219).
 * Routes under /docs for Taskmark product documentation.
 */
export const DOCS_NAV: DocsNavItem[] = [
  {
    href: "/docs/get-started",
    title: "Get started",
    badge: "New",
    description:
      "One command, npx taskmark init: board, project without an account, GitHub or Bitbucket App, AI key, commit hook, agent instructions, and the first reconciliation.",
  },
  {
    href: "/docs",
    title: "Overview",
    description: "What Taskmark is and how the docs are organized.",
  },
  {
    href: "/docs/setup",
    title: "Setup",
    description:
      "Where the board lives, opening the local UI, creating a board by hand, and the optional Cursor plugin.",
  },
  {
    href: "/docs/agents",
    title: "Any AI agent",
    badge: "New",
    description:
      "Point Claude Code, Codex, Cursor, Copilot, Gemini, or any other agent at the board.",
  },
  {
    href: "/docs/cloud",
    title: "Cloud",
    badge: "New",
    description:
      "Hosted shared board and how a local Taskmark board syncs to it.",
  },
  {
    href: "/docs/app",
    title: "GitHub & Bitbucket App",
    badge: "New",
    description:
      "How the App reconciles the board on every push and merged pull request.",
  },
  {
    href: "/docs/app-setup",
    title: "Set up the App",
    badge: "New",
    description:
      "For users: npx taskmark init. For server operators: the GitHub App, the Bitbucket OAuth client, and the API settings.",
  },
  {
    href: "/docs/commands",
    title: "Commands",
    description:
      "Cursor slash commands (init, verify, plan, save, save-do, plan-do, do, changelog, version, reportme, commit) and the taskmark CLI (init, reconcile, secret, requests regroup, migrate, stages, hooks, app, ai).",
  },
  {
    href: "/docs/requests",
    title: "Request boards",
    badge: "New",
    description:
      "The 2.0 layout: requests with a brief, epics, and a log; meetings; stages; migration.",
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
      "Epic, story, task, and bug markdown shape for the UI and manual edits, including images.",
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
      "Plan, branch, push, and let the App reconcile; review inbox, stages, and the board screens.",
  },
]

export const DOCS_COMMANDS = [
  {
    id: "tkmd-init",
    slash: "/tkmd-init",
    purpose: "Set up the project by running npx taskmark init in the terminal",
  },
  {
    id: "tkmd-verify",
    slash: "/tkmd-verify",
    purpose:
      "Migrate an existing board: repair scaffold, delete leftover generated files, strip retired frontmatter and parent child lists",
  },
  {
    id: "tkmd-plan",
    slash: "/tkmd-plan",
    purpose:
      "Fit the smallest useful hierarchy to existing board work from prose (new items only)",
  },
  {
    id: "tkmd-save",
    slash: "/tkmd-save",
    purpose:
      "After Cursor Plan mode, turn the plan into new epic/story/task/bug items and carry plan visuals into those items",
  },
  {
    id: "tkmd-save-do",
    slash: "/tkmd-save-do",
    purpose:
      "Save like /tkmd-save, then implement the newly created items like /tkmd-do",
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
    purpose:
      "Implement an item on a task-id branch; never edits the board and never commits",
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
      "Promote Unreleased into a dated SemVer section and set that version on every linked product",
  },
  {
    id: "tkmd-reportme",
    slash: "/tkmd-reportme",
    purpose:
      "Report my done work since the last report into gitignored .reports/",
  },
  {
    id: "tkmd-commit",
    slash: "/tkmd-commit",
    purpose: "Commit dirty linked repos (the only commit command)",
  },
] as const
