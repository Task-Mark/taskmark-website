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

        <h2 id="local-dev-copy">Local development copy</h2>
        <p>
          Cursor rejects external symlinks. For a local install under{" "}
          <code>~/.cursor/plugins/local/taskmark</code>, copy the plugin package
          with the repo script or <code>/sync-plugin-local</code> after editing
          skills, rules, or scripts.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`plugins/taskmark/scripts/rsync-plugin-local.sh
# or:
rsync -a --delete /path/to/taskmark-cursor/plugins/taskmark/ \\
  ~/.cursor/plugins/local/taskmark/`}
        </pre>

        <h2 id="init">Initialize a board</h2>
        <ol>
          <li>Install the plugin (above).</li>
          <li>
            Run <strong>taskmark-init</strong> (skill) in a product workspace.
          </li>
          <li>
            <strong>Single git project:</strong> board lives at{" "}
            <code>&lt;project&gt;/taskmark/</code>.
          </li>
          <li>
            <strong>Multiple git projects:</strong> board lives at a sibling{" "}
            <code>&lt;common&gt;-taskmark</code> repo root (flat — no nested{" "}
            <code>taskmark/</code>). Run <code>/sync-repos</code> so{" "}
            <code>REPOS.md</code> lists linked roots.
          </li>
        </ol>
        <p>
          The board is never copied into every product repo.{" "}
          <code>REPOS.md</code> is the map of board + product roots.
        </p>

        <h2 id="first-commands">First commands</h2>
        <ol>
          <li>
            <code>/new-epic</code> — create an initiative
          </li>
          <li>
            <code>/new-story</code> / <code>/new-task</code> — break down work
          </li>
          <li>
            <code>/start-work</code> → implement → <code>/complete-work</code>
          </li>
          <li>
            <code>/sync-status</code> when acceptance criteria or sessions
            change outside that loop
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
