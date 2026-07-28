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
    "Taskmark slash commands: /new-epic, /new-story, /new-task, /start-work, /commit-all, sync, and velocity.",
}

export default function DocsCommandsPage() {
  return (
    <DocsShell currentPath="/docs/commands">
      <DocsTitle
        eyebrow="Commands"
        title="Slash commands reference"
        lead="Type these in Cursor chat. Slash names are /new-*; matching skills are often create-*."
      />
      <DocsProse>
        <h2 id="index">Commands index</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Slash</th>
                <th className="px-3 py-2">Skill</th>
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
                  <td className="px-3 py-2 font-mono text-xs">{cmd.skill}</td>
                  <td className="px-3 py-2">{cmd.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="new-epic">/new-epic · create-epic</h2>
        <p>
          Creates <code>E-NNN</code> under the board <code>epics/</code>. Epics
          have <strong>no t-shirt size</strong>; points start at 0 and roll up
          from child stories and epic-direct tasks.
        </p>
        <ul>
          <li>Inputs: title, goal, optional scope</li>
          <li>Effects: <code>epic.md</code>, INDEX refresh, reporter stamp</li>
        </ul>

        <h2 id="new-story">/new-story · create-story</h2>
        <p>
          Creates <code>S-NNN</code> under an epic (soft-attach from context, or
          the reserved <strong>General</strong> epic). Suggests size, points,
          and Est from Current Speed when samples exist.
        </p>
        <ul>
          <li>Parent epic is required on disk (never orphan stories)</li>
          <li>Once tasks exist, story points = sum of child points</li>
        </ul>

        <h2 id="new-task">/new-task · create-task</h2>
        <p>
          Creates <code>T-NNN</code> or <code>B-NNN</code> under a story{" "}
          <em>or</em> directly under an epic <code>items/</code>. Soft-attaches
          from named parent or context; otherwise General.
        </p>
        <ul>
          <li>
            Under story: <code>parent</code> = story, <code>epic</code> =
            ancestor
          </li>
          <li>
            Epic-direct: <code>parent</code> and <code>epic</code> = same epic
            id
          </li>
          <li>Reopens a done parent to in progress when a new open child lands</li>
        </ul>

        <h2 id="start-work">/start-work</h2>
        <p>
          Opens one real Work log session on the target item (Started = now UTC,
          Ended = —). Idle-closes stale open sessions first (deadline = next UTC
          day at 12:00). Cascades <code>started_at</code> to parents without
          opening parent sessions.
        </p>
        <ul>
          <li>Appends a prompt row on stories/tasks/bugs</li>
          <li>
            For a whole epic in one sitting: one session on the epic (or first
            leaf), then split on complete — do not clone the full span onto every
            task
          </li>
        </ul>

        <h2 id="complete-work">/complete-work</h2>
        <p>
          Closes the open session at now (or idle/session cap), aligns AC
          checkboxes, stamps resolvers, logs commits when present, and
          recomputes Actual from billable sessions — never calendar span.
        </p>
        <ul>
          <li>
            Shared-batch: allocate batch minutes across leaves by points
          </li>
          <li>Parents get rollup Actual from children, not N × batch</li>
        </ul>

        <h2 id="commit-all">/commit-all</h2>
        <p>
          Commits every dirty linked git root with a <strong>simple one-line</strong>{" "}
          message. Does not push unless asked. Refreshes the board README
          dashboard before the board-repo commit, then{" "}
          <Link href="/docs/commands#log-commits">logs SHAs</Link> on the active
          item when known.
        </p>

        <h2 id="log-commits">/log-commits</h2>
        <p>
          Appends rows to the item Commits table: SHA, Repo, Date (UTC), Author,
          Message. Prefer leaf items; roll notable SHAs to story/epic when useful.
        </p>

        <h2 id="sync-status">/sync-status</h2>
        <p>
          Idle-closes stale sessions, derives status from AC/children/latches,
          recomputes actuals and rollups, refreshes INDEX, VELOCITY, and README
          dashboard.
        </p>

        <h2 id="sync-repos">/sync-repos · sync-taskmark-repos</h2>
        <p>
          Ensures the board is in the correct single- vs multi-repo location and
          refreshes <code>REPOS.md</code>. Never copies the board into every
          product repo.
        </p>

        <h2 id="sync-plugin-local">/sync-plugin-local</h2>
        <p>
          Rsyncs <code>plugins/taskmark</code> into{" "}
          <code>~/.cursor/plugins/local/taskmark</code> after skill/rule/script
          edits.
        </p>

        <h2 id="velocity">/velocity</h2>
        <p>
          Reports Current Speed and ETA from done leaves. See{" "}
          <Link href="/docs/velocity">Velocity</Link>.
        </p>

        <h2 id="board-status">/board-status</h2>
        <p>
          Summarizes the board by status, size, points, and open sessions.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
