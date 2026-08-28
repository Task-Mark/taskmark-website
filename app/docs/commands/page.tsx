import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"
import { DOCS_COMMANDS } from "@/lib/docs-nav"

export const metadata: Metadata = {
  title: "Commands",
  description:
    "Taskmark slash commands: /tsmk-init, /tsmk-create, /tsmk-do, and /tsmk-commit.",
}

export default function DocsCommandsPage() {
  return (
    <DocsShell currentPath="/docs/commands">
      <DocsTitle
        eyebrow="Commands"
        title="Slash commands reference"
        lead="Type these in Cursor chat. The plugin exposes exactly these four commands."
      />
      <DocsProse>
        <h2 id="index">Commands index</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Slash</th>
                <th className="px-3 py-2">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {DOCS_COMMANDS.map((cmd) => (
                <tr key={cmd.id} className="border-b border-border/60">
                  <td className="px-3 py-2">
                    <a href={`#${cmd.id}`} className="font-mono">
                      {cmd.slash}
                    </a>
                  </td>
                  <td className="px-3 py-2">{cmd.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="tsmk-init">/tsmk-init</h2>
        <p>
          Bootstraps a board in the workspace.{" "}
          <strong>Single git project:</strong> files live at{" "}
          <code>&lt;project&gt;/taskmark/</code>.{" "}
          <strong>Multiple git projects:</strong> a sibling{" "}
          <code>&lt;common&gt;-taskmark</code> repo is the board root (flat —
          no nested <code>taskmark/</code>).
        </p>
        <ul>
          <li>
            The board is never copied into every product repo
          </li>
          <li>
            <code>REPOS.md</code> is generated locally and gitignored — it maps
            board and product roots on this machine and is not committed
          </li>
          <li>
            A new board is markdown under <code>epics/</code> only; there is no
            generated board index, sizing file, velocity file, or board README
          </li>
        </ul>

        <h2 id="tsmk-create">/tsmk-create</h2>
        <p>
          Creates an epic, a story, a task or bug, or a whole tree from a prose
          description. New IDs are collision-resistant (type prefix{" "}
          <code>E</code> / <code>S</code> / <code>T</code> / <code>B</code> plus
          a unique token — not a global sequential counter). Existing sequential
          IDs on a board remain valid.
        </p>
        <ul>
          <li>
            Writes <strong>only new item files</strong> (and new story/epic
            files when those are part of the create). It does not edit parent{" "}
            <code>epic.md</code> / <code>story.md</code> child lists or rollups
          </li>
          <li>
            Soft-attaches from named parent or context; otherwise the reserved{" "}
            <strong>General</strong> epic
          </li>
          <li>
            Leaf size and points come from the{" "}
            <Link href="/docs/sizing">static table</Link> (XS=1 … XXL=21)
          </li>
          <li>
            The UI discovers children and derives parent lists, status, and
            points at read time
          </li>
        </ul>

        <h2 id="tsmk-do">/tsmk-do</h2>
        <p>
          Implements the requested work on the board. It{" "}
          <strong>never commits</strong> (no git commit, no multi-repo commit).
          It does <strong>not</strong> move items through{" "}
          <code>in_progress</code>. When the agent stops, leaves it executed
          are <code>done</code>.
        </p>
        <ul>
          <li>
            Mutates only the target leaf markdown (status, acceptance criteria,
            work log on that file)
          </li>
          <li>
            Does not write parent files or generated indexes
          </li>
          <li>
            Use <Link href="/docs/commands#tsmk-commit">/tsmk-commit</Link> when
            you want git commits
          </li>
        </ul>

        <h2 id="tsmk-commit">/tsmk-commit</h2>
        <p>
          The <strong>only</strong> commit entrypoint. Commits every dirty
          linked git root with a simple one-line message. Does not push unless
          asked.
        </p>
        <ul>
          <li>Does not replace <code>/tsmk-do</code> — implement first, commit when you choose</li>
          <li>
            Commit SHAs belong on leaf Commits tables; parent commit views are
            aggregated in the UI
          </li>
        </ul>
      </DocsProse>
    </DocsShell>
  )
}
