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
    "Taskmark leaf-only writes, work logs, actual minutes, and the plan → do → commit loop.",
}

export default function DocsWorkflowsPage() {
  return (
    <DocsShell currentPath="/docs/workflows">
      <DocsTitle
        eyebrow="Workflows"
        title="Core workflows"
        lead="How plan and do stay on leaf files, how sessions become Actual, and how multi-repo days work."
      />
      <DocsProse>
        <h2 id="daily-loop">Plan, do, commit</h2>
        <ol>
          <li>
            Canonical board in <code>&lt;common&gt;-taskmark</code> (or{" "}
            <code>taskmark/</code> in single mode)
          </li>
          <li>
            <code>/tkmd-plan</code> to search existing work and add only the
            smallest useful hierarchy (new files only)
          </li>
          <li>
            Implement with <code>/tkmd-do</code> in product repos — never
            commits; does not set <code>in_progress</code>; finished leaves are{" "}
            <code>done</code>
          </li>
          <li>
            <code>/tkmd-commit</code> when you want git commits (simple
            one-liners; no push by default)
          </li>
        </ol>

        <h2 id="leaf-only">Leaf-only writes</h2>
        <p>
          Two people can create and finish different tasks without merging parent
          files. <code>/tkmd-plan</code> and <code>/tkmd-do</code> change only
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
          Leaves keep a Work log. <strong>Actual</strong> is the sum of closed
          Started → Ended intervals on task/bug leaves. Epics and stories sum
          their descendant leaves. There is no time estimate or owner property.
        </p>
        <ul>
          <li>
            Open or invalid intervals are not counted until they have a valid
            Ended timestamp
          </li>
          <li>
            Never hand-set Actual in frontmatter
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
          Written on leaves whenever an agent does product work. Append a{" "}
          <code>prompt</code> row when the user asks for work; append{" "}
          <code>feedback</code> when they accept, reject, or give later notes.
          Author comes from git identity when available. Prefer an open
          matching task/bug; if the change is follow-up on finished work,
          append to that done leaf; create a new leaf only when nothing fits.
          Never write these rows on <code>epic.md</code> or{" "}
          <code>story.md</code>. Parent views aggregate descendant rows.
        </p>

        <h2 id="commits-log">Commits log</h2>
        <p>
          Append-only table on the leaf: SHA | Repo | Date (UTC) | Author |
          Message. In multi-repo workspaces the Repo column is the short folder
          name from local <code>REPOS.md</code>.{" "}
          <code>/tkmd-commit</code> is how commits land;{" "}
          <code>/tkmd-do</code> does not commit.
        </p>
        <p>
          Related: <Link href="/docs/commands">Commands</Link>,{" "}
          <Link href="/docs/structure">Structure</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
