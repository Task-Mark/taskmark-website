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
    "Taskmark slash commands: /tkmd-init, /tkmd-plan, /tkmd-save, /tkmd-plan-do, /tkmd-do, /tkmd-shelf, /tkmd-changelog, /tkmd-version, /tkmd-reportme, and /tkmd-commit.",
}

export default function DocsCommandsPage() {
  return (
    <DocsShell currentPath="/docs/commands">
      <DocsTitle
        eyebrow="Commands"
        title="Slash commands reference"
        lead="Type these in Cursor chat. /tkmd-commit is the only command that commits."
      />
      <DocsProse>
        <h2 id="index">Commands index</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Slash</th>
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
                  <td className="px-3 py-2">{cmd.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="tkmd-init">/tkmd-init</h2>
        <p>
          Bootstraps a board in the workspace.{" "}
          <strong>Single git project:</strong> files live at{" "}
          <code>&lt;project&gt;/taskmark/</code>.{" "}
          <strong>Multiple git projects:</strong> a sibling{" "}
          <code>&lt;common&gt;-taskmark</code> repo is the board root (flat —
          no nested <code>taskmark/</code>).
        </p>
        <ul>
          <li>
            The board is never copied into every product repo
          </li>
          <li>
            <code>REPOS.md</code> is generated locally and gitignored — it maps
            board and product roots on this machine and is not committed
          </li>
          <li>
            A new board is markdown under <code>epics/</code> only; there is no
            generated board index, sizing file, velocity file, or board README
          </li>
        </ul>

        <h2 id="tkmd-plan">/tkmd-plan</h2>
        <p>
          Searches open and done board work, then plans the smallest useful
          hierarchy from prose. New IDs are collision-resistant (type prefix{" "}
          <code>E</code> / <code>S</code> / <code>T</code> / <code>B</code> plus
          a unique token — not a global sequential counter). Existing sequential
          IDs on a board remain valid.
        </p>
        <ul>
          <li>
            If exact or overlapping work exists, creates nothing and reports
            the match for execution or follow-up feedback
          </li>
          <li>
            Fits tasks/bugs under an existing story or epic, stories under an
            existing epic, and creates a new epic only for a distinct initiative
            that fits nowhere
          </li>
          <li>
            Writes <strong>only new item files</strong> (including any new
            parent files in the plan). It does not edit existing parent{" "}
            <code>epic.md</code> / <code>story.md</code> child lists or rollups
          </li>
          <li>
            Splits broad work into cohesive stories and independently executable
            leaves with clear acceptance criteria
          </li>
          <li>
            Leaf size and points come from the{" "}
            <Link href="/docs/sizing">static table</Link> (XS=1 … XXL=21);
            strongly split XL and always refine XXL before execution
          </li>
          <li>
            The UI discovers children and derives parent lists, status, and
            points at read time
          </li>
        </ul>

        <h2 id="tkmd-save">/tkmd-save</h2>
        <p>
          After Cursor Plan mode, reads the approved plan and turns it into
          Taskmark epic, story, task, and bug files. It carries diagrams and
          other visuals from the plan onto the matching new items. It{" "}
          <strong>never commits</strong> and does not implement the work.
        </p>
        <ul>
          <li>
            Locates the plan from an explicit path, the current Plan mode
            artifact, workspace <code>.cursor/plans/</code>, or{" "}
            <code>~/.cursor/plans/</code>
          </li>
          <li>
            Uses the same search, dedupe, hierarchy, and new-files-only rules as{" "}
            <code>/tkmd-plan</code>
          </li>
          <li>
            Prefer this after Plan mode instead of retyping the plan as prose
            for <code>/tkmd-plan</code>
          </li>
          <li>
            Then implement with <code>/tkmd-do</code>, or use{" "}
            <code>/tkmd-plan-do</code> when you want plan-from-prose and
            implementation in one step
          </li>
        </ul>

        <h2 id="tkmd-plan-do">/tkmd-plan-do</h2>
        <p>
          Plans like <code>/tkmd-plan</code>, then implements the newly created
          items like <code>/tkmd-do</code>. It is not a replacement for
          plan-only or do-later. It <strong>never commits</strong>.
        </p>
        <ul>
          <li>
            If planning creates nothing (exact or overlapping match),
            implementation is skipped and the match is reported
          </li>
          <li>
            If a new epic or story was created, implements that highest new
            parent; otherwise implements each newly created leaf
          </li>
          <li>
            Does not set <code>in_progress</code>; executed leaves become{" "}
            <code>done</code>
          </li>
          <li>
            Use <code>/tkmd-plan</code> when you want to review the board items
            before implementing
          </li>
        </ul>

        <h2 id="tkmd-do">/tkmd-do</h2>
        <p>
          Implements the requested work on the board. It{" "}
          <strong>never commits</strong> (no git commit, no multi-repo commit).
          It does <strong>not</strong> move items through{" "}
          <code>in_progress</code>. When the agent stops, leaves it executed
          are <code>done</code>.
        </p>
        <ul>
          <li>
            Mutates only the target leaf markdown (status, acceptance criteria,
            Prompt &amp; feedback, work log on that file)
          </li>
          <li>
            Follow-up on a done task logs Prompt &amp; feedback there; a new
            leaf is created only when nothing fits
          </li>
          <li>
            Cancelled and shelved leaves are terminal and are not mandatory
            implementation scope
          </li>
          <li>
            Does not write parent files or generated indexes
          </li>
          <li>
            Use <Link href="/docs/commands#tkmd-commit">/tkmd-commit</Link> when
            you want git commits
          </li>
        </ul>

        <h2 id="tkmd-shelf">/tkmd-shelf</h2>
        <p>
          Discards planned work that will never be implemented. It marks
          eligible task/bug leaves <code>status: shelved</code> and sets{" "}
          <code>completed_at</code>, while preserving unchecked acceptance
          criteria and keeping the outcome distinct from <code>done</code>.
        </p>
        <ul>
          <li>
            A story or epic target shelves every open, non-cancelled,
            non-shelved descendant leaf
          </li>
          <li>
            Never edits parent markdown; parent status is derived at read time
          </li>
          <li>
            Never sets <code>cancelled: true</code>, commits, or pushes
          </li>
          <li>
            Shelved work is terminal and is hidden by Hide completed
          </li>
        </ul>

        <h2 id="tkmd-changelog">/tkmd-changelog</h2>
        <p>
          Rebuilds the Unreleased section of board-root{" "}
          <code>CHANGELOG.md</code> from recent done task and bug leaves. Notes
          are user-facing, past tense, and contain no work-item IDs. The file
          is created if missing. This is not a README changelog.
        </p>
        <ul>
          <li>
            Cutoff is the newest <code>## x.y.z - YYYY-MM-DD</code> heading;
            shelved and cancelled leaves are ignored
          </li>
          <li>
            Headings follow Portuguese Keep a Changelog style (
            <code>Não publicado</code>, then dated version sections)
          </li>
          <li>
            Never edits epic, story, or leaf markdown; never commits or pushes
          </li>
          <li>
            Not run from <code>/tkmd-do</code> — maintainers run it when they
            want notes
          </li>
        </ul>

        <h2 id="tkmd-version">/tkmd-version</h2>
        <p>
          Cuts a SemVer on the board. It infers major, minor, or patch from
          Unreleased work, or uses an explicit version. It promotes Unreleased
          into <code>## x.y.z - YYYY-MM-DD</code>, clears Unreleased, and writes
          that version to the board <code>package.json</code>, every linked
          product-root <code>package.json</code>, and the Cursor plugin{" "}
          <code>plugin.json</code>.
        </p>
        <ul>
          <li>
            If Unreleased is empty, it collects the same notes as{" "}
            <code>/tkmd-changelog</code>, or stops if nothing is new
          </li>
          <li>
            Does not bump nested example or stub packages
          </li>
          <li>
            Does not create git tags, GitHub Releases, npm publishes,
            commits, or pushes
          </li>
        </ul>

        <h2 id="tkmd-reportme">/tkmd-reportme</h2>
        <p>
          Writes a personal report of work <strong>you</strong> finished since
          the previous report. The file is{" "}
          <code>.reports/report-YYYYMMDD.md</code> on the board, in the board
          writing language. It is gitignored — reports stay local and are never
          committed.
        </p>
        <ul>
          <li>
            Includes only <code>done</code> task and bug leaves whose resolvers
            match the current git identity
          </li>
          <li>
            Cutoff is the newest earlier <code>report-YYYYMMDD.md</code>; a
            first report covers everything so far
          </li>
          <li>
            Bullets are user-facing and past tense, with no work-item IDs —
            the same Keep a Changelog style as{" "}
            <code>/tkmd-changelog</code>
          </li>
          <li>
            Never edits epic, story, or leaf markdown; never writes{" "}
            <code>CHANGELOG.md</code> or the board README
          </li>
          <li>
            Never commits or pushes; not run from <code>/tkmd-do</code>
          </li>
        </ul>

        <h2 id="tkmd-commit">/tkmd-commit</h2>
        <p>
          The <strong>only</strong> commit entrypoint. Commits every dirty
          linked git root with a simple one-line message. Does not push unless
          asked.
        </p>
        <ul>
          <li>Does not replace <code>/tkmd-do</code> — implement first, commit when you choose</li>
          <li>
            Commit SHAs belong on leaf Commits tables; parent commit views are
            aggregated in the UI
          </li>
        </ul>
      </DocsProse>
    </DocsShell>
  )
}
