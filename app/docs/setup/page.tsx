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
    "Set up a Taskmark board with npx taskmark init, where the board lives in single- or multi-repo workspaces, open the local UI, and optionally install the Cursor plugin.",
}

export default function DocsSetupPage() {
  return (
    <DocsShell currentPath="/docs/setup">
      <DocsTitle
        eyebrow="Setup"
        title="Install and first board"
        lead="A board is a folder of markdown in git. Create it with npx taskmark init, then open it in the local UI and point your agent at it."
      />
      <DocsProse>
        <h2 id="init">Set up with npx taskmark init</h2>
        <p>
          The usual way to start is one command, run from the product
          repository or from the folder that holds the project&apos;s
          repositories:
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark init        # or npx @taskmark/ui init when it is not installed yet`}
        </pre>
        <p>
          It creates the board, registers the project on Taskmark Cloud
          without an account, connects the GitHub or Bitbucket App, saves the
          AI key, installs the commit hook, and writes the agent instructions.
          On an existing project it also migrates a legacy board and runs the
          first reconciliation. Run it again to change any answer. Every step
          is described in <Link href="/docs/get-started">Get started</Link>.
        </p>

        <h2 id="where">Where the board lives</h2>
        <ul>
          <li>
            <strong>Single git project:</strong> the board lives at{" "}
            <code>&lt;project&gt;/taskmark/</code>
          </li>
          <li>
            <strong>Multiple git projects:</strong> the board is a sibling{" "}
            <code>&lt;common&gt;-taskmark</code> repository, with the board at
            its root (no nested <code>taskmark/</code>)
          </li>
        </ul>
        <p>
          The board is never copied into every product repo.{" "}
          <code>REPOS.md</code> is generated locally, gitignored, and lists
          linked roots with machine paths; it is not pushed. See{" "}
          <Link href="/docs/structure">folder structure</Link>.
        </p>

        <h2 id="by-hand">Create a board by hand</h2>
        <p>
          Without npm, you can still create a board yourself. A folder counts
          as a board as soon as it has a <code>requests/</code> (or legacy{" "}
          <code>epics/</code>) folder:
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`mkdir -p taskmark/requests/first-request taskmark/meetings
printf 'REPOS.md\n.reports/\n' > taskmark/.gitignore
# then write taskmark/requests/first-request/brief.md`}
        </pre>
        <p>
          Follow <Link href="/docs/requests">Request boards</Link> for the
          brief and <Link href="/docs/specification">File specification</Link>{" "}
          for epics, stories, tasks, and bugs. Commit the board, then tell
          your agent about it:{" "}
          <Link href="/docs/agents">Use Taskmark with any AI agent</Link>.
        </p>

        <h2 id="cursor-plugin">Optional: the Cursor plugin</h2>
        <p>
          The Cursor plugin adds <code>/tkmd-*</code> slash commands that
          create boards and items and implement them. It is one integration,
          not a requirement.
        </p>
        <h3 id="install">Install the plugin</h3>
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

        <h3 id="plugin-init">Initialize a board with the plugin</h3>
        <ol>
          <li>Install the plugin (above).</li>
          <li>
            Run <code>/tkmd-init</code> in a product workspace. It runs{" "}
            <code>npx taskmark init</code> in your terminal, and you answer
            its questions there. It only writes the request board scaffold by
            hand when npm is not available
          </li>
          <li>
            Run <code>/tkmd-verify</code> on an older board to repair scaffold,
            delete leftover generated files, and strip retired frontmatter and
            parent child lists (never commits)
          </li>
        </ol>

        <h3 id="first-commands">First commands</h3>
        <ol>
          <li>
            <code>/tkmd-verify</code>: migrate an existing board to the current
            layout (scaffold like init, delete leftover generated files, strip
            retired frontmatter and parent child lists). Never commits;{" "}
            <code>/tkmd-commit</code> remains the only commit command
          </li>
          <li>
            <code>/tkmd-plan</code>: fit an epic, story, task/bug, or full tree
            to existing board work from prose (creates new items only)
          </li>
          <li>
            <code>/tkmd-save</code>: after Cursor Plan mode, turn that plan
            into board items and keep diagrams/visuals on them
          </li>
          <li>
            <code>/tkmd-save-do</code>: same save as{" "}
            <code>/tkmd-save</code>, then implement the newly created items
            immediately on a task-id branch (never commits, never edits the
            board)
          </li>
          <li>
            <code>/tkmd-plan-do</code>: same planning as{" "}
            <code>/tkmd-plan</code>, then implement the newly created items
            immediately on a task-id branch (never commits, never edits the
            board)
          </li>
          <li>
            <code>/tkmd-do</code>: implement an item on a branch named after
            its id; never edits the board and never commits. The App marks it
            done after the merge
          </li>
          <li>
            <code>/tkmd-changelog</code>: rebuild Unreleased notes in board{" "}
            <code>CHANGELOG.md</code> from recent done work
          </li>
          <li>
            <code>/tkmd-version</code>: promote Unreleased into a dated version
            and set that SemVer on every linked product
          </li>
          <li>
            <code>/tkmd-reportme</code>: write a personal report of my done
            work since the last report into gitignored <code>.reports/</code>
          </li>
          <li>
            <code>/tkmd-commit</code>: commit linked repos when you are ready
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
          locally: a different npm package owns the bare <code>taskmark</code>{" "}
          name. Details live in the <code>taskmark-frontend</code> README.
        </p>
        <h2 id="hooks">Add the task id to commits</h2>
        <p>
          <code>npx taskmark init</code> installs this hook for you. To install
          it again, or on a board set up by hand, list your code repositories
          in the board <code>package.json</code>{" "}
          (<code>&quot;taskmark&quot;: {"{"} &quot;repos&quot;: [&quot;../my-api&quot;] {"}"}</code>
          ) or pass <code>--repo</code>, then install the git hook that adds{" "}
          <code>Task: &lt;id&gt;</code> to commits made on a task branch:
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark hooks install`}
        </pre>
        <p>
          Next: <Link href="/docs/cloud">Taskmark Cloud</Link> for a hosted
          team view of the same board,{" "}
          <Link href="/docs/app">GitHub and Bitbucket App</Link> for how the
          board updates itself from git, and the{" "}
          <Link href="/docs/commands">Commands reference</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
