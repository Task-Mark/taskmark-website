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
            Run <code>/tkmd-verify</code> on an older board to repair scaffold,
            delete leftover generated files, and strip legacy item markdown
            (never commits)
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
            <code>/tkmd-verify</code> — migrate an existing board to the current
            layout (scaffold like init, delete leftover generated files, strip
            legacy markdown). Never commits; <code>/tkmd-commit</code> remains
            the only commit command
          </li>
          <li>
            <code>/tkmd-plan</code> — fit an epic, story, task/bug, or full tree
            to existing board work from prose (creates items only)
          </li>
          <li>
            <code>/tkmd-save</code> — after Cursor Plan mode, turn that plan
            into board items and keep diagrams/visuals on them
          </li>
          <li>
            <code>/tkmd-save-do</code> — same save as{" "}
            <code>/tkmd-save</code>, then implement the newly created items
            immediately (never commits)
          </li>
          <li>
            <code>/tkmd-plan-do</code> — same planning as{" "}
            <code>/tkmd-plan</code>, then implement the newly created items
            immediately (never commits)
          </li>
          <li>
            <code>/tkmd-do</code> — implement existing targets; leaves you
            finished become <code>done</code> (no commit, no{" "}
            <code>in_progress</code>)
          </li>
          <li>
            <code>/tkmd-shelf</code> — discard planned work that will never be
            implemented; eligible leaves become <code>shelved</code> without a
            commit
          </li>
          <li>
            <code>/tkmd-changelog</code> — rebuild Unreleased notes in board{" "}
            <code>CHANGELOG.md</code> from recent done work
          </li>
          <li>
            <code>/tkmd-version</code> — promote Unreleased into a dated version
            and set that SemVer on every linked product
          </li>
          <li>
            <code>/tkmd-reportme</code> — write a personal report of my done
            work since the last report into gitignored <code>.reports/</code>
          </li>
          <li>
            <code>/tkmd-commit</code> — commit linked repos when you are ready
          </li>
        </ol>

        <h2 id="open-the-board">Open the local board</h2>
        <p>
          The board UI is <code>@taskmark/ui</code>.{" "}
          <strong>Bound</strong> mode opens the board found in or near the
          current directory (a nested <code>taskmark/</code> folder, or a flat{" "}
          <code>*-taskmark</code> root). <strong>Workspace</strong> mode (
          <code>npx @taskmark/ui</code> with no nearby board, or{" "}
          <code>taskmark open</code> / <code>--workspace</code>) shows a setup
          wizard and project picker.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`# inside a board folder
npx taskmark serve

# no local board nearby
npx @taskmark/ui`}
        </pre>
        <p>
          Prefer <code>npx @taskmark/ui</code> when the package is not installed
          locally — a different npm package owns the bare <code>taskmark</code>{" "}
          name. Details live in the <code>taskmark-frontend</code> README.
        </p>
        <p>
          Next: <Link href="/docs/cloud">Taskmark Cloud</Link> if you want a
          hosted team view of the same board, then{" "}
          <Link href="/docs/commands">Commands reference</Link> and{" "}
          <Link href="/docs/structure">folder structure</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
