import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "README dashboard",
  description:
    "What Taskmark writes into the board README and when the dashboard refresh runs.",
}

export default function DocsReadmePage() {
  return (
    <DocsShell currentPath="/docs/readme">
      <DocsTitle
        eyebrow="README"
        title="README dashboard"
        lead="The board README keeps managed sections between HTML markers so scripts never wipe your intro copy."
      />
      <DocsProse>
        <h2 id="sections">Managed sections</h2>
        <ul>
          <li>
            <strong>Project status</strong> — total / complete work items and
            Current Speed
          </li>
          <li>
            <strong>Open work items</strong> — stories, tasks, and bugs that are
            not done, cancelled, or blocked
          </li>
          <li>
            <strong>Changelog</strong> — recent commits from the{" "}
            <em>board</em> git repo (housekeeping subjects filtered)
          </li>
          <li>
            <strong>Contributors</strong> — people stamped from local git
            identity
          </li>
        </ul>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`<!-- taskmark:project-status:begin -->
## Project status
…
<!-- taskmark:project-status:end -->

<!-- taskmark:open-work:begin -->
## Open work items
…
<!-- taskmark:open-work:end -->

<!-- taskmark:changelog:begin -->
## Changelog
…
<!-- taskmark:changelog:end -->

<!-- taskmark:contributors:begin -->
## Contributors
…
<!-- taskmark:contributors:end -->`}
        </pre>
        <p>
          Do <strong>not</strong> hand-edit inside the markers — your changes
          will be overwritten on the next refresh.
        </p>

        <h2 id="refresh">When it refreshes</h2>
        <ul>
          <li>
            <code>scripts/refresh-readme-dashboard.py &lt;board-root&gt;</code>
          </li>
          <li>
            End of <code>recompute-actuals.py</code> (so{" "}
            <code>/sync-status</code> and <code>/complete-work</code> update it)
          </li>
          <li>
            Before the board-repo commit in <code>/commit-all</code>
          </li>
        </ul>

        <h2 id="changelog-filter">Changelog filtering</h2>
        <p>
          Housekeeping subjects are omitted so the table stays useful — for
          example <code>sync taskmark board</code>,{" "}
          <code>update readme dashboard</code>, and <code>log …</code> commit
          trails.
        </p>
        <p>
          See also <Link href="/docs/velocity">Velocity</Link> and{" "}
          <Link href="/docs/commands#commit-all">/commit-all</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
