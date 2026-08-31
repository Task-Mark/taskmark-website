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
    "Taskmark leaf-only writes, shelving, work logs, actual minutes, and when to plan, save, save-do, plan-do, report, or commit.",
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
            smallest useful hierarchy from prose (new files only)
          </li>
          <li>
            After Cursor Plan mode, <code>/tkmd-save</code> to turn that plan
            into epic/story/task/bug items and keep diagrams on them — never
            commits, never implements
          </li>
          <li>
            <code>/tkmd-save-do</code> when you want that Cursor plan saved and
            the newly created items implemented immediately. Prefer save-only
            then <code>/tkmd-do</code> later when you want to review the board
            first
          </li>
          <li>
            <code>/tkmd-plan-do</code> when you want the prose plan and
            immediate implementation of only the newly created items. Prefer
            plan-only then <code>/tkmd-do</code> later when you want to review
            the board first
          </li>
          <li>
            Implement existing targets with <code>/tkmd-do</code> in product
            repos — never commits; does not set <code>in_progress</code>;
            finished leaves are <code>done</code>
          </li>
          <li>
            If planned work will never be implemented, use{" "}
            <code>/tkmd-shelf</code> — eligible leaves become{" "}
            <code>shelved</code> without changing parent markdown or committing
          </li>
          <li>
            <code>/tkmd-changelog</code> when you want Unreleased notes in board{" "}
            <code>CHANGELOG.md</code>; <code>/tkmd-version</code> when you are
            ready to promote them and set that SemVer on every linked product.
            Neither commits, and neither writes a README changelog
          </li>
          <li>
            <code>/tkmd-reportme</code> when you want a personal report of work
            you finished since the last report (gitignored{" "}
            <code>.reports/</code>; never commits)
          </li>
          <li>
            <code>/tkmd-commit</code> when you want git commits (simple
            one-liners; no push by default)
          </li>
        </ol>

        <h2 id="shelving">Shelve discarded work</h2>
        <p>
          <code>/tkmd-shelf</code> closes work without claiming it was
          implemented. A leaf receives <code>status: shelved</code> and a{" "}
          <code>completed_at</code> timestamp, while acceptance criteria,
          resolvers, and <code>cancelled: false</code> remain unchanged. Story
          and epic targets cascade to their eligible task/bug descendants only.
        </p>
        <p>
          Shelved work is visually distinct from done, is terminal for parent
          rollups, and is removed by Hide completed. The command never commits
          or pushes.
        </p>

        <h2 id="overall">Overall tree</h2>
        <p>
          The local board’s default view is <strong>Overall</strong>: one nested
          list, not three stacked tables. Expand an epic to see its stories and
          epic-direct tasks/bugs; expand a story to see its tasks and bugs.
          At each level, incomplete items sort before complete ones, then newest
          first. Hide completed treats <code>done</code>, <code>shelved</code>,
          and <code>cancelled</code> as complete — including bug leaves — and
          keeps an ancestor visible while it still has incomplete descendants.
        </p>
        <p>
          <strong>Work items</strong> stays a flat list (legacy{" "}
          <code>All</code> / <code>Stories</code> / <code>Tasks</code> query
          values open that same flat view). Search, hide-completed, timeframe,
          pagination, and deep links apply to Overall:{" "}
          <code>?epic=</code> expands that epic, <code>?story=</code> expands
          the story under it, and <code>?item=</code> opens detail.
        </p>
        <p>
          Parent status, points, Actual, implementers, lifecycle dates, and
          aggregated Prompt &amp; feedback / Commits / Work log are read-time
          views over descendant leaves. Commands write only new item files or
          the executed leaf — never parent rollups.
        </p>

        <h2 id="leaf-only">Leaf-only writes</h2>
        <p>
          Two people can create and finish different tasks without merging parent
          files. <code>/tkmd-plan</code>, <code>/tkmd-save</code>,{" "}
          <code>/tkmd-save-do</code>, <code>/tkmd-plan-do</code>, and{" "}
          <code>/tkmd-do</code> change only new
          or target item markdown — not parent <code>epic.md</code> /{" "}
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
          <code>/tkmd-plan</code>, <code>/tkmd-save</code>,{" "}
          <code>/tkmd-save-do</code>, <code>/tkmd-plan-do</code>,{" "}
          <code>/tkmd-do</code>,{" "}
          <code>/tkmd-changelog</code>, <code>/tkmd-version</code>, and{" "}
          <code>/tkmd-reportme</code> do not commit.
        </p>
        <p>
          Related: <Link href="/docs/commands">Commands</Link>,{" "}
          <Link href="/docs/structure">Structure</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
