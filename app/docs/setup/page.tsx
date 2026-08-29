import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Setup",
  description:
    "Install the Taskmark Cursor plugin and initialize a board in single- or multi-repo workspaces.",
}

export default function DocsSetupPage() {
  return (
    <DocsShell currentPath="/docs/setup">
      <DocsTitle
        eyebrow="Setup"
        title="Install and first board"
        lead="Add the plugin in Cursor, then initialize a Taskmark board in your workspace."
      />
      <DocsProse>
        <h2 id="install">Install the plugin</h2>
        <ol>
          <li>
            Open <strong>Customize → Plugins</strong>.
          </li>
          <li>
            Remove any broken <strong>taskmark</strong> entry first.
          </li>
          <li>
            <strong>Add local</strong> → select the{" "}
            <code>taskmark-cursor</code> repo root (the folder that contains{" "}
            <code>.cursor-plugin/marketplace.json</code>).
          </li>
          <li>
            Enable <strong>taskmark</strong>, then run{" "}
            <strong>Developer: Reload Window</strong>.
          </li>
        </ol>
        <p>
          After layout changes in the plugin package, commit before re-adding
          (Cursor packages from git). Clear stale caches if the marketplace
          entry looks broken.
        </p>

        <h2 id="init">Initialize a board</h2>
        <ol>
          <li>Install the plugin (above).</li>
          <li>
            Run <code>/tkmd-init</code> in a product workspace.
          </li>
          <li>
            <strong>Single git project:</strong> board lives at{" "}
            <code>&lt;project&gt;/taskmark/</code>.
          </li>
          <li>
            <strong>Multiple git projects:</strong> board lives at a sibling{" "}
            <code>&lt;common&gt;-taskmark</code> repo root (flat — no nested{" "}
            <code>taskmark/</code>).
          </li>
        </ol>
        <p>
          The board is never copied into every product repo.{" "}
          <code>REPOS.md</code> is generated locally, gitignored, and lists
          linked roots with machine paths — it is not pushed.
        </p>

        <h2 id="first-commands">First commands</h2>
        <ol>
          <li>
            <code>/tkmd-plan</code> — fit an epic, story, task/bug, or full tree
            to existing board work
          </li>
          <li>
            <code>/tkmd-do</code> — implement; leaves you finished become{" "}
            <code>done</code> (no commit, no <code>in_progress</code>)
          </li>
          <li>
            <code>/tkmd-shelf</code> — discard planned work that will never be
            implemented; eligible leaves become <code>shelved</code> without a
            commit
          </li>
          <li>
            <code>/tkmd-commit</code> — commit linked repos when you are ready
          </li>
        </ol>
        <p>
          Next: <Link href="/docs/commands">Commands reference</Link> and{" "}
          <Link href="/docs/structure">folder structure</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
