import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Workflows",
  description:
    "Taskmark leaf-only writes, work logs, actual minutes, and the create → do → commit loop.",
}

export default function DocsWorkflowsPage() {
  return (
    <DocsShell currentPath="/docs/workflows">
      <DocsTitle
        eyebrow="Workflows"
        title="Core workflows"
        lead="How create and do stay on leaf files, how sessions become Actual, and how multi-repo days work."
      />
      <DocsProse>
        <h2 id="daily-loop">Create, do, commit</h2>
        <ol>
          <li>
            Canonical board in <code>&lt;common&gt;-taskmark</code> (or{" "}
            <code>taskmark/</code> in single mode)
          </li>
          <li>
            <code>/tsmk-create</code> to add an epic, story, task/bug, or tree
            (new files only)
          </li>
          <li>
            Implement with <code>/tsmk-do</code> in product repos — never
            commits; does not set <code>in_progress</code>; finished leaves are{" "}
            <code>done</code>
          </li>
          <li>
            <code>/tsmk-commit</code> when you want git commits (simple
            one-liners; no push by default)
          </li>
        </ol>

        <h2 id="leaf-only">Leaf-only writes</h2>
        <p>
          Two people can create and finish different tasks without merging parent
          files. <code>/tsmk-create</code> and <code>/tsmk-do</code> change only
          new or target item markdown — not parent <code>epic.md</code> /{" "}
          <code>story.md</code> lists, rollups, or generated board files.
        </p>
        <p>
          At read time the UI derives parent child lists, status, points,
          implementers, lifecycle dates, Prompt &amp; feedback, Commits, and
          Work log from descendant leaves.
        </p>

        <h2 id="work-logs">Work logs and Actual</h2>
        <p>
          Leaves keep a Work log. <strong>Actual</strong> is billable session
          minutes — never <code>completed_at − started_at</code>.
        </p>
        <ul>
          <li>
            Open session: Ended is <code>—</code>; billable end uses now until
            closed
          </li>
          <li>
            Idle deadline = <strong>12:00 UTC on the UTC day after Started</strong>
          </li>
          <li>
            Session cap default <code>session_cap_minutes: 480</code>
          </li>
          <li>
            Billable end = min(Ended, idle deadline, Started + cap)
          </li>
          <li>
            Never hand-set <code>actual_minutes</code> / <code>actual_ms</code>
          </li>
        </ul>
        <h3 id="shared-batch">Shared-batch</h3>
        <p>
          When one sitting delivers many leaves, measure one batch span and
          allocate milliseconds by points. Same Started on each leaf; Ended =
          Started + allocated slice. Do not copy the full batch onto every task.
        </p>

        <h2 id="prompt-feedback">Prompt &amp; feedback log</h2>
        <p>
          Written on leaves: append a <code>prompt</code> row when the user asks
          for work; append <code>feedback</code> when they accept, reject, or
          give final notes. Author comes from git identity when available.
          Parent views aggregate descendant rows.
        </p>

        <h2 id="commits-log">Commits log</h2>
        <p>
          Append-only table on the leaf: SHA | Repo | Date (UTC) | Author |
          Message. In multi-repo workspaces the Repo column is the short folder
          name from local <code>REPOS.md</code>.{" "}
          <code>/tsmk-commit</code> is how commits land;{" "}
          <code>/tsmk-do</code> does not commit.
        </p>
        <p>
          Related: <Link href="/docs/commands">Commands</Link>,{" "}
          <Link href="/docs/structure">Structure</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
