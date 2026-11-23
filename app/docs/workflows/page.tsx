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
    "The Taskmark 2.0 loop: plan on the board, implement on a task-id branch with any agent, push, let the GitHub and Bitbucket App reconcile, review its proposals, and ship through stages.",
}

export default function DocsWorkflowsPage() {
  return (
    <DocsShell currentPath="/docs/workflows">
      <DocsTitle
        eyebrow="Workflows"
        title="Core workflows"
        lead="Agents read the board, code moves through branches, and the App writes what happened back to the board."
      />
      <DocsProse>
        <h2 id="daily-loop">Plan, branch, push, reconcile</h2>
        <ol>
          <li>
            <strong>Plan.</strong> Write the request brief and its epics,
            stories, and tasks (see{" "}
            <Link href="/docs/requests">Request boards</Link>), by hand or with
            the Cursor plugin: <code>/tkmd-plan</code> from prose,{" "}
            <code>/tkmd-save</code> after Cursor Plan mode. Planning only adds
            new files
          </li>
          <li>
            <strong>Implement.</strong> Point any agent at the task (see{" "}
            <Link href="/docs/agents">Use Taskmark with any AI agent</Link>) or
            run <code>/tkmd-do</code> in Cursor. The work happens on a branch
            named <code>&lt;task-id&gt;-&lt;slug&gt;</code>. The agent never
            edits the board. <code>/tkmd-save-do</code> and{" "}
            <code>/tkmd-plan-do</code> plan and implement in one step
          </li>
          <li>
            <strong>Commit and push.</strong> Keep the task id in the branch
            name or the commit message. <code>npx taskmark hooks install</code>{" "}
            adds a <code>Task: &lt;id&gt;</code> trailer for you. In Cursor,{" "}
            <code>/tkmd-commit</code> commits every dirty repository with a
            one-line message
          </li>
          <li>
            <strong>Open and merge a pull request.</strong> On every push and
            merged pull request the{" "}
            <Link href="/docs/app">GitHub and Bitbucket App</Link> records the
            commits and a work log row on the task, and closes it when the id
            is explicit, every acceptance criterion is covered, CI is green,
            and the work reached production
          </li>
          <li>
            <strong>Review.</strong> Likely closes and new tasks the App is not
            sure about wait in the{" "}
            <Link href="/docs/app#review-inbox">review inbox</Link> for a person
            to accept or reject
          </li>
          <li>
            <strong>Ship.</strong> As the work moves from <code>develop</code>{" "}
            to <code>quality</code> to <code>main</code>, the App moves the
            task to development, testing, and production. Only production
            counts as shipped in forecasts and the client view
          </li>
          <li>
            <strong>Release notes.</strong> <code>/tkmd-changelog</code> builds
            Unreleased notes in board <code>CHANGELOG.md</code> from done work;{" "}
            <code>/tkmd-version</code> promotes them and sets that SemVer on
            every linked product. <code>/tkmd-reportme</code> writes a personal,
            gitignored report of work you finished since the last one
          </li>
        </ol>
        <p>
          On a board created before 2.0, run <code>/tkmd-verify</code> once to
          repair the scaffold and <code>npx taskmark migrate</code> to move to
          request boards.
        </p>

        <h2 id="who-writes-what">Who writes what</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Who</th>
                <th className="px-3 py-2">Writes</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">People</td>
                <td className="px-3 py-2">
                  Briefs, meetings, request log entries, new items, edits to
                  titles and descriptions, shelving, and decisions in the
                  review inbox
                </td>
              </tr>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  <code>/tkmd-plan</code>, <code>/tkmd-save</code>
                </td>
                <td className="px-3 py-2">New item files only</td>
              </tr>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  Coding agents, <code>/tkmd-do</code>
                </td>
                <td className="px-3 py-2">
                  Product code only. Never board files
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-3 py-2 text-foreground">The App</td>
                <td className="px-3 py-2">
                  On tasks and bugs: <code>status</code>, dates, resolvers,
                  checked criteria, <code>stage</code>,{" "}
                  <code>shipped_at</code>, Commits and Work log rows, and new
                  tasks a person accepted
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="shelving">Shelve discarded work</h2>
        <p>
          <code>/tkmd-shelf</code> was removed in 2.0. To close work without
          claiming it was implemented, a person sets{" "}
          <code>status: shelved</code> and a <code>completed_at</code>{" "}
          timestamp on the task or bug, leaving its acceptance criteria and{" "}
          <code>cancelled: false</code> as they are. Shelved work is visually
          distinct from done, is terminal for parent rollups, and is removed by
          Hide completed. If a shelved task is later named in a change, the
          App only records the commits.
        </p>

        <h2 id="overall">Overall tree</h2>
        <p>
          A request board opens on the{" "}
          <Link href="/docs/requests#screens">request screens</Link>. The
          Overall tree is still there under <strong>Board files</strong> as All
          epics, and it is the default view of a board without requests. It is
          one nested list, not three stacked tables. Expand an epic to see its stories and
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
          views over descendant leaves. Nothing writes parent rollups.
        </p>

        <h2 id="leaf-only">Leaf-only writes</h2>
        <p>
          Two people can create and finish different tasks without merging
          parent files. Planning adds only new item files, and the App writes
          only the task and bug files a change touches. Nothing edits parent{" "}
          <code>epic.md</code> / <code>story.md</code> lists, rollups, or
          generated board files.
        </p>
        <p>
          At read time the UI derives parent child lists, status, points,
          implementers, lifecycle dates, Prompt &amp; feedback, Commits, and
          Work log from descendant leaves.
        </p>

        <h2 id="work-logs">Work logs and Actual</h2>
        <p>
          Leaves keep a Work log, filled by the App: one row per push or merged
          pull request that touches the task, from the first commit time to the
          merge or push time. <strong>Actual</strong> is the sum of closed
          Started to Ended intervals on task/bug leaves. Epics and stories sum
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
        <h2 id="prompt-feedback">Prompt &amp; feedback log</h2>
        <p>
          Before 2.0, agents appended <code>prompt</code> and{" "}
          <code>feedback</code> rows on leaves during every session. They no
          longer write to the board, so the table stays empty on new items.
          Existing rows still show in the UI.
        </p>

        <h2 id="commits-log">Commits log</h2>
        <p>
          Append-only table on the leaf: SHA | Repo | Date (UTC) | Author |
          Message. The App adds the commits of each change that belong to the
          task, skipping merge commits and its own commits, and never adds the
          same SHA twice. <code>/tkmd-commit</code> is the only slash command
          that commits; the others never do.
        </p>
        <p>
          Related: <Link href="/docs/commands">Commands</Link>,{" "}
          <Link href="/docs/structure">Structure</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
