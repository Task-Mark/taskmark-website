import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"
import { DOCS_NAV } from "@/lib/docs-nav"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Taskmark product documentation — setup, commands, board structure, sizing, and workflows.",
}

export default function DocsOverviewPage() {
  return (
    <DocsShell currentPath="/docs">
      <DocsTitle
        title="Taskmark documentation"
        lead="Local markdown boards for Cursor agents: epics, stories, and tasks with honest sizing and work logs."
      />
      <DocsProse>
        <p>
          Taskmark is a Cursor plugin that keeps product work as hierarchical
          markdown the agent can read and update. The board is product memory —
          not a separate SaaS backlog that drifts from what shipped.
        </p>
        <h2 id="how-docs-are-organized">How docs are organized</h2>
        <ul>
          {DOCS_NAV.filter((item) => item.href !== "/docs").map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.title}</Link> — {item.description}
            </li>
          ))}
        </ul>
        <h2 id="suggested-path">Suggested path</h2>
        <ol>
          <li>
            <Link href="/docs/setup">Setup</Link> — install the plugin and
            initialize a board
          </li>
          <li>
            <Link href="/docs/commands">Commands</Link> — plan, implement,
            shelve, and commit work
          </li>
          <li>
            <Link href="/docs/structure">Folder structure</Link> — know where
            files live
          </li>
          <li>
            <Link href="/docs/workflows">Workflows</Link> — leaf-only writes,
            actuals, and multi-repo
          </li>
        </ol>
        <p>
          User-facing slash commands are exactly{" "}
          <code>/tkmd-init</code>, <code>/tkmd-plan</code>,{" "}
          <code>/tkmd-do</code>, <code>/tkmd-shelf</code>, and{" "}
          <code>/tkmd-commit</code>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
