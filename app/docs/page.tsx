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
    "Taskmark product documentation: get started with npx taskmark init, setup, any AI agent, the GitHub and Bitbucket App, request boards, commands, structure, sizing, and workflows.",
}

export default function DocsOverviewPage() {
  return (
    <DocsShell currentPath="/docs">
      <DocsTitle
        title="Taskmark documentation"
        lead="Markdown boards in git for teams that build with AI agents: requests, epics, stories, and tasks with honest sizing, kept true by the GitHub and Bitbucket App."
      />
      <DocsProse>
        <p>
          Taskmark keeps product work as hierarchical markdown in a git
          repository. The board is product memory, not a separate SaaS backlog
          that drifts from what shipped. Any coding agent can read it:
          Claude Code, Codex, Cursor, Copilot, Gemini, Windsurf, Aider, or
          another. The{" "}
          <Link href="/docs/app">Taskmark App for GitHub and Bitbucket</Link>{" "}
          reads every push and merged pull request and writes what happened
          back to the board. <Link href="/docs/cloud">Taskmark Cloud</Link> is
          the hosted team view of the same markdown.
        </p>
        <h2 id="how-docs-are-organized">How docs are organized</h2>
        <ul>
          {DOCS_NAV.filter((item) => item.href !== "/docs").map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.title}</Link>: {item.description}
            </li>
          ))}
        </ul>
        <h2 id="suggested-path">Suggested path</h2>
        <ol>
          <li>
            <Link href="/docs/get-started">Get started</Link>: run{" "}
            <code>npx taskmark init</code> to create the board, connect the
            App, and brief your agents
          </li>
          <li>
            <Link href="/docs/setup">Setup</Link>: where the board lives and
            how to open it locally
          </li>
          <li>
            <Link href="/docs/agents">Any AI agent</Link>: how agents work
            from the board
          </li>
          <li>
            <Link href="/docs/app">GitHub and Bitbucket App</Link>: how the
            board updates itself from git
          </li>
          <li>
            <Link href="/docs/requests">Request boards</Link> and{" "}
            <Link href="/docs/structure">Folder structure</Link>: know where
            files live
          </li>
          <li>
            <Link href="/docs/workflows">Workflows</Link>: plan, branch, push,
            and review
          </li>
        </ol>
        <p>
          The optional Cursor plugin adds slash commands:{" "}
          <code>/tkmd-init</code>, <code>/tkmd-verify</code>,{" "}
          <code>/tkmd-plan</code>, <code>/tkmd-save</code>,{" "}
          <code>/tkmd-save-do</code>, <code>/tkmd-plan-do</code>,{" "}
          <code>/tkmd-do</code>, <code>/tkmd-changelog</code>,{" "}
          <code>/tkmd-version</code>, <code>/tkmd-reportme</code>, and{" "}
          <code>/tkmd-commit</code>. <code>/tkmd-plan</code> and{" "}
          <code>/tkmd-save</code> create new items only;{" "}
          <code>/tkmd-do</code> implements an item on a task-id branch and
          never edits the board. <code>/tkmd-commit</code> is the only command
          that commits. The <code>taskmark</code> CLI adds <code>init</code>,{" "}
          <code>reconcile</code>, <code>secret rotate</code>,{" "}
          <code>requests regroup</code>, <code>migrate</code>,{" "}
          <code>stages</code>, <code>hooks install</code>, <code>app</code>,
          and <code>ai</code>. See <Link href="/docs/commands">Commands</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
