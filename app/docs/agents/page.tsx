import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Use Taskmark with any AI agent",
  description:
    "Point Claude Code, Codex, Cursor, Copilot, Gemini, Windsurf, Aider, or any other coding agent at a Taskmark board with a short project instruction.",
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm whitespace-pre">
      {children}
    </pre>
  )
}

const SNIPPET = `## Taskmark board

This project plans its work on a Taskmark board: plain markdown in git at
\`taskmark/\` (change this to your board path, for example \`../acme-taskmark/\`).
Treat it as a read-only reference.

- Before you change code, find the board item for the work: a task or bug
  file under \`requests/<slug>/epics/**/items/\` (\`epics/**/items/\` on boards
  that were not migrated yet). Search by id, title, or description.
- The spec is the request brief (\`requests/<slug>/brief.md\`), the item's
  \`## Description\`, and its \`## Acceptance criteria\` (\`## Fix criteria\`
  for bugs). Read the parent story and epic for context.
- Never edit, rename, move, or delete any board file. Do not change status,
  dates, people, or checkboxes, and do not add Work log, Commits, or
  Prompt & feedback rows. The Taskmark App updates the board from pushes
  and merged pull requests.
- Work on a branch named \`<task-id>-<short-slug>\`, for example
  \`T-MM-457b0290-login-mockup\`. If the current branch name already contains
  the id, stay on it. For a story with several tasks, use the story id.
- Keep the task id in the branch name or in the commit message, for
  example a \`Task: T-MM-457b0290\` trailer.
- If no item fits the request, say so and ask. Do not invent an item.`

const AGENT_FILES: { agent: string; file: string; note: string }[] = [
  {
    agent: "Claude Code",
    file: "CLAUDE.md",
    note: "At the repository root. Claude Code loads it at the start of every session.",
  },
  {
    agent: "OpenAI Codex",
    file: "AGENTS.md",
    note: "At the repository root.",
  },
  {
    agent: "Cursor",
    file: ".cursor/rules/taskmark.mdc",
    note: "Add alwaysApply: true in the rule frontmatter. Cursor also reads AGENTS.md. With the Taskmark plugin installed, the same rules are already built in.",
  },
  {
    agent: "GitHub Copilot",
    file: ".github/copilot-instructions.md",
    note: "Repository custom instructions, used by Copilot chat and the coding agent.",
  },
  {
    agent: "Gemini CLI",
    file: "GEMINI.md",
    note: "At the repository root.",
  },
  {
    agent: "Windsurf",
    file: ".windsurf/rules/taskmark.md",
    note: "Set the rule to always on.",
  },
  {
    agent: "Aider",
    file: "CONVENTIONS.md",
    note: "Load it with read: CONVENTIONS.md in .aider.conf.yml, or aider --read CONVENTIONS.md.",
  },
  {
    agent: "Any other agent",
    file: "AGENTS.md",
    note: "Many agents read AGENTS.md. Otherwise use whatever file the agent loads as project instructions.",
  },
]

export default function DocsAgentsPage() {
  return (
    <DocsShell currentPath="/docs/agents">
      <DocsTitle
        eyebrow="Agents"
        title="Use Taskmark with any AI agent"
        lead="The board is plain markdown in git, so any coding agent can read it. Add one short instruction to your agent's project file and it will work from the board."
      />
      <DocsProse>
        <h2 id="how-it-works">How it works</h2>
        <p>
          A Taskmark board is a folder of markdown files in a git repository.
          Claude Code, Codex, Cursor, Copilot, Gemini, Windsurf, Aider, or any
          other agent that can read files can use it. Nothing is tied to one
          editor.
        </p>
        <p>The roles are split in three:</p>
        <ul>
          <li>
            <strong>Agents read.</strong> The request brief, the item
            description, and its acceptance criteria are the spec. Agents never
            change existing board files.
          </li>
          <li>
            <strong>The App reconciles.</strong> The{" "}
            <Link href="/docs/app">Taskmark App for GitHub and Bitbucket</Link>{" "}
            reads every push and merged pull request and writes status,
            commits, work log rows, and stages to the board.
          </li>
          <li>
            <strong>People decide.</strong> Likely closes and new tasks the App
            is not sure about wait in a review inbox for a person.
          </li>
        </ul>
        <p>
          The link between code and board is the task id. When the id is in
          the branch name, the pull request, or a commit message, the App knows
          which task the change belongs to. That is why the agent works on a
          branch named after the task.
        </p>
        <p>
          The <Link href="/docs/setup#cursor-plugin">Cursor plugin</Link> is one
          integration, with <code>/tkmd-*</code> commands that plan items and
          implement them. It is not required. Every other agent gets the same
          behaviour from the instruction below.
        </p>

        <h2 id="snippet">Ready-to-paste instruction</h2>
        <p>
          Copy this into your agent&apos;s project instructions file (see the{" "}
          <a href="#agent-files">table below</a>) and set the board path. It
          follows the same rules as the Cursor plugin&apos;s{" "}
          <code>/tkmd-do</code>.
        </p>
        <CodeBlock>{SNIPPET}</CodeBlock>
        <p>
          The board path is relative to the code repository. With one git
          project the board usually sits at <code>taskmark/</code> inside it.
          With several git projects it is a sibling{" "}
          <code>&lt;common&gt;-taskmark</code> repository, so give the agent
          access to that folder too (for example by opening both folders in
          the editor workspace). See{" "}
          <Link href="/docs/structure">folder structure</Link>.
        </p>

        <h2 id="agent-files">Where each agent reads instructions</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Agent</th>
                <th className="px-3 py-2">File</th>
                <th className="px-3 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {AGENT_FILES.map((row) => (
                <tr
                  key={row.agent}
                  className="border-b border-border/60 align-top"
                >
                  <td className="px-3 py-2 text-foreground">{row.agent}</td>
                  <td className="px-3 py-2">
                    <code>{row.file}</code>
                  </td>
                  <td className="px-3 py-2">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          If a team uses several agents, put the instruction in{" "}
          <code>AGENTS.md</code> and point the other files at it, or paste it
          into each one. Commit the file so everyone gets it.
        </p>
        <p>For a Cursor rule file, start with frontmatter:</p>
        <CodeBlock>{`---
description: Work from the Taskmark board
alwaysApply: true
---

## Taskmark board
...`}</CodeBlock>

        <h2 id="task-id">Keep the task id on every commit</h2>
        <p>
          The App finds task ids in the pull request branch, title, and body,
          in commit messages (including a <code>Task:</code> trailer), and, for
          a direct push, in the branch name. A git hook makes this automatic
          for any editor, with or without an agent:
        </p>
        <CodeBlock>{`# from the board folder; installs into every code repo the board lists
npx taskmark hooks install

# or for one repository
npx taskmark hooks install --repo ../my-api`}</CodeBlock>
        <p>
          The hook is <code>prepare-commit-msg</code>. When the branch name
          carries a task id such as <code>T-MM-457b0290</code> and the message
          does not mention it yet, it appends <code>Task: T-MM-457b0290</code>.
          It never writes to the board. See{" "}
          <Link href="/docs/commands#cli-hooks">CLI commands</Link>.
        </p>

        <h2 id="new-work">When nothing on the board fits</h2>
        <p>
          New items are written by people, by the Cursor plugin&apos;s{" "}
          <code>/tkmd-plan</code> and <code>/tkmd-save</code> (which create new
          files only and never change existing ones), or by the App when a
          person accepts a new task from the review inbox. Follow the{" "}
          <Link href="/docs/specification">file specification</Link> if you
          write one by hand. When a change names no task id, the App can still
          match it to open tasks by content (with an AI key set), but only a
          person can then close those tasks.
        </p>
        <p>
          Next: <Link href="/docs/app">GitHub and Bitbucket App</Link> for what
          happens after the push.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
