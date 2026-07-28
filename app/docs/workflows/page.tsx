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
    "Taskmark work logs, idle caps, actual minutes, multi-repo day-to-day use, and audit trails.",
}

export default function DocsWorkflowsPage() {
  return (
    <DocsShell currentPath="/docs/workflows">
      <DocsTitle
        eyebrow="Workflows"
        title="Core workflows"
        lead="How sessions become Actual, how multi-repo days work, and what Prompt & Commits tables are for."
      />
      <DocsProse>
        <h2 id="work-logs">Work logs and Actual</h2>
        <p>
          Every epic, story, task, and bug has a Work log.{" "}
          <strong>Actual</strong> is billable session minutes — never{" "}
          <code>completed_at − started_at</code>.
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
            Never hand-set <code>actual_minutes</code> / <code>actual_ms</code> —
            run recompute
          </li>
        </ul>
        <h3 id="shared-batch">Shared-batch</h3>
        <p>
          When one sitting delivers many leaves, measure one batch span and
          allocate milliseconds by points. Same Started on each leaf; Ended =
          Started + allocated slice. Parents hold a 0-minute rollup note, not
          the full batch.
        </p>

        <h2 id="daily-multi-repo">Multi-repo day-to-day</h2>
        <ol>
          <li>
            Canonical board in <code>&lt;common&gt;-taskmark</code> (or{" "}
            <code>taskmark/</code> in single mode)
          </li>
          <li>
            <code>/start-work</code> on the item → implement in product repos
          </li>
          <li>
            <code>/commit-all</code> when ready (simple one-liners; no push by
            default)
          </li>
          <li>
            <code>/complete-work</code> to close Actual and cascade done
          </li>
          <li>
            <code>/sync-repos</code> if board location or REPOS needs refresh
          </li>
        </ol>

        <h2 id="prompt-feedback">Prompt &amp; feedback log</h2>
        <p>
          On stories, tasks, and bugs: append a <code>prompt</code> row when the
          user asks for work; append <code>feedback</code> when they accept,
          reject, or give final notes. Author comes from git identity when
          available.
        </p>

        <h2 id="commits-log">Commits log</h2>
        <p>
          Append-only table: SHA | Repo | Date (UTC) | Author | Message. In
          multi-repo workspaces the Repo column distinguishes roots. Use{" "}
          <code>/log-commits</code> after commits land (or via complete-work /
          commit-all).
        </p>
        <p>
          Related: <Link href="/docs/commands">Commands</Link>,{" "}
          <Link href="/docs/structure">Structure</Link>,{" "}
          <Link href="/docs/readme">README dashboard</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
