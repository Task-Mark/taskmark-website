import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "GitHub and Bitbucket App",
  description:
    "How the Taskmark App reconciles the board on every push and merged pull request: task ids, AI matching, decision rules, stages, shadow and write mode, the review inbox, and what data reaches the AI provider.",
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm whitespace-pre">
      {children}
    </pre>
  )
}

type Row = { when: React.ReactNode; then: React.ReactNode }

const DECISIONS: Row[] = [
  {
    when: (
      <>
        The task id is named directly, the AI model says the change covers
        every unchecked acceptance criterion (or, for a task without criteria,
        that it completes the task), CI is green, and the change reached
        production (a push to a production branch, or a pull request merged
        into one)
      </>
    ),
    then: (
      <>
        <strong>Closes the task on its own.</strong> Sets{" "}
        <code>status: done</code> and <code>completed_at</code>, fills{" "}
        <code>started_at</code> and <code>resolvers</code> when they are
        empty, ticks the covered criteria, and adds Commits and Work log rows
      </>
    ),
  },
  {
    when: <>The task id is named, but any of the conditions above is missing</>,
    then: (
      <>
        <strong>Records the work.</strong> Adds Commits rows and a Work log row.
        The task stays open
      </>
    ),
  },
  {
    when: <>A story id is named</>,
    then: (
      <>
        Records the work on each open task of the story. These tasks are never
        closed on their own: a confident completing match becomes a{" "}
        <strong>likely close</strong> in the review inbox
      </>
    ),
  },
  {
    when: (
      <>
        No id, and the model matches an open task with 80% confidence or more
      </>
    ),
    then: (
      <>
        Records the work (marked as matched by content). If the model says the
        change completes the task, adds a <strong>likely close</strong> to the
        review inbox
      </>
    ),
  },
  {
    when: <>No id, and the model is less than 80% sure</>,
    then: <>Nothing</>,
  },
  {
    when: (
      <>
        The model finds substantial work that fits no task but belongs to a
        known story (80% confidence or more)
      </>
    ),
    then: (
      <>
        Adds a <strong>new task</strong> proposal to the review inbox
      </>
    ),
  },
  {
    when: <>A revert undoes work of a done task</>,
    then: (
      <>
        <strong>Reopens the task:</strong> <code>status: in_progress</code>{" "}
        and <code>completed_at</code> cleared
      </>
    ),
  },
  {
    when: <>A done task is named again</>,
    then: (
      <>
        Records new commits only. It is never closed a second time, but its
        stage can still move forward
      </>
    ),
  },
  {
    when: <>A shelved or cancelled task is named</>,
    then: <>Records the commits only</>,
  },
  {
    when: (
      <>Only lockfiles, formatting, or docs changed, and no id is named</>
    ),
    then: <>Nothing. The model is not called</>,
  },
]

export default function DocsAppPage() {
  return (
    <DocsShell currentPath="/docs/app">
      <DocsTitle
        eyebrow="App"
        title="GitHub and Bitbucket App"
        lead="Agents and people write code. The Taskmark App reads every push and merged pull request and keeps the board true: commits, work log, done status, and delivery stage."
      />
      <DocsProse>
        <h2 id="what-it-does">What the App does</h2>
        <p>
          In Taskmark 2.0 the board is a read-only reference for agents.
          Reconciliation, the work of turning code changes into board updates,
          belongs to the Taskmark App for GitHub and Bitbucket Cloud. It runs
          inside the Taskmark API, listens to the code repositories you
          connect, and writes to the board repository.
        </p>
        <p>
          It reacts to three kinds of events from the code repositories:
        </p>
        <ul>
          <li>A push to any branch</li>
          <li>A merged pull request</li>
          <li>
            A finished CI run (GitHub check suites and commit statuses,
            Bitbucket commit statuses), used to apply a close that was waiting
            for green CI
          </li>
        </ul>
        <p>
          A push waits about 20 seconds before it is analysed, so the merged
          pull request that caused it is handled first. Commits already
          recorded with their pull request are not recorded twice. The App
          ignores its own commits and pull requests.
        </p>

        <h2 id="steps">What happens on each change</h2>
        <ol>
          <li>
            <strong>Read the change.</strong> Commits, changed files with their
            diffs, the pull request title and description, and the CI state
            of the head commit.
          </li>
          <li>
            <strong>Find task ids.</strong> The App looks in the pull request
            source branch, title, and body, in every commit message (including
            the <code>Task: &lt;id&gt;</code> trailer added by{" "}
            <Link href="/docs/commands#cli-hooks">the git hook</Link>), and,
            for a direct push, in the branch name. Only ids that exist on the
            board count. A story id stands for the open tasks of that story.
          </li>
          <li>
            <strong>Pick candidates.</strong> Named tasks first, then the open
            tasks whose title, description, and criteria share the most words
            with the change (up to 40 tasks), plus up to 20 stories.
          </li>
          <li>
            <strong>Ask the AI model.</strong> The model gets a summary of the
            change and the candidates, and answers which tasks the change works
            on, with a confidence, which acceptance criteria it covers, whether
            it completes the task, and whether there is new work that fits no
            task. Without an AI key the App only uses explicit ids.
          </li>
          <li>
            <strong>Decide</strong> with the rules below.
          </li>
          <li>
            <strong>Report and write.</strong> Comment on the pull request (or
            on the commit, for a push), store proposals in the review inbox,
            and, in write mode, make one bot commit to the board repository.
          </li>
        </ol>

        <h2 id="decision-rules">Decision rules</h2>
        <p>
          The App closes a task on its own only when it is sure. Everything
          else either records the work and leaves the task open, or waits for
          a person.
        </p>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">When</th>
                <th className="px-3 py-2">The App</th>
              </tr>
            </thead>
            <tbody>
              {DECISIONS.map((row, i) => (
                <tr key={i} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2 text-foreground">{row.when}</td>
                  <td className="px-3 py-2">{row.then}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          When a change names a task, CI is still running, and nothing could
          close yet, the analysis waits. When CI finishes green, the App runs
          it once more so the close can apply. A red CI never closes anything.
        </p>
        <p>
          A Work log row looks like{" "}
          <code>PR #214: Added the login redirect.</code> with the person who
          merged or pushed as Actor, the first commit time as Started, and the
          merge or push time as Ended. The summary is written by the model; it
          falls back to the pull request title or the last commit message.
        </p>

        <h2 id="stages">Stages from branches</h2>
        <p>
          Each task also has a delivery <code>stage</code>, read from the
          branch the work landed on:
        </p>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Stage</th>
                <th className="px-3 py-2">Default branches</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 text-foreground">
                  <code>development</code>
                </td>
                <td className="px-3 py-2">
                  <code>develop</code>, <code>dev</code>,{" "}
                  <code>development</code>
                </td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2 text-foreground">
                  <code>testing</code>
                </td>
                <td className="px-3 py-2">
                  <code>quality</code>, <code>qa</code>, <code>staging</code>,{" "}
                  <code>test</code>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-foreground">
                  <code>production</code>
                </td>
                <td className="px-3 py-2">
                  <code>main</code>, <code>master</code>,{" "}
                  <code>production</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            When a push to one of these branches (or a pull request merged into
            one) records or closes a task, the task moves to that stage. Work
            on other branches is recorded but sets no stage
          </li>
          <li>
            When the commits of a merged pull request later reach{" "}
            <code>quality</code> or <code>main</code>, the App moves the same
            tasks forward, using the ids of that pull request, without adding
            the commits again
          </li>
          <li>
            Stages only move forward. The first time a task reaches production
            the App sets <code>shipped_at</code>
          </li>
          <li>
            <strong>Only production counts as shipped.</strong> Forecasts,
            Client status, and People only count work that reached{" "}
            <code>main</code>
          </li>
          <li>
            Branch names are configurable per code repository (
            <code>stageBranches</code>, see{" "}
            <Link href="/docs/app-setup#connect">Set up the App</Link>). A
            branch listed under two stages counts as the less advanced one
          </li>
        </ul>
        <p>
          Locally, <code>npx taskmark stages</code> shows the stage each task
          has reached in your clones, without writing anything. See{" "}
          <Link href="/docs/commands#cli-stages">CLI commands</Link>.
        </p>

        <h2 id="modes">Shadow mode and write mode</h2>
        <p>
          A new connection starts in <strong>shadow mode</strong> unless you
          create it in write mode. The App
          runs the full analysis and comments on the pull request (or the
          commit) with what it would do, but writes nothing to the board:
        </p>
        <CodeBlock>{`Taskmark reconciled PR #214 with the board.

Closed:
- T-MM-457b0290 Login mockup: All acceptance criteria covered, CI green, shipped

Moved to a stage:
- T-MM-457b0290 Login mockup: production

Shadow mode: nothing was written to the board. In write mode this would update 1 file.`}</CodeBlock>
        <p>
          Use shadow mode to check the App&apos;s judgement on real work. When
          you trust it, switch the connection to <strong>write mode</strong>.
          From then on each change becomes{" "}
          <strong>one bot commit</strong> to the board repository, for example{" "}
          <code>Taskmark: update the board for acme/api#214</code>, authored by
          Taskmark. If the board branch moved in the meantime, the App reads it
          again and retries. The same edits are applied to the{" "}
          <Link href="/docs/cloud">Taskmark Cloud</Link> copy of the board, so
          the hosted view updates right away.
        </p>
        <p>
          Connecting and switching modes are one CLI command each, run from the
          board folder: <code>npx taskmark app connect github|bitbucket</code>,{" "}
          <code>npx taskmark app mode write</code>, and{" "}
          <code>npx taskmark app status</code>. See{" "}
          <Link href="/docs/app-setup#connect">Set up the App</Link>.
        </p>

        <h2 id="review-inbox">Review inbox</h2>
        <p>
          Anything the App is not sure enough to do on its own waits for a
          person in the project&apos;s review inbox:
        </p>
        <ul>
          <li>
            <strong>Likely closes</strong>: the model thinks a change completes
            a task, but the task was not named directly. Accepting closes the
            task the same way an automatic close does
          </li>
          <li>
            <strong>New tasks</strong>: substantial work that fits no task but
            belongs to a known story. Accepting writes a new done task under
            that story, with the commits and a work log row
          </li>
        </ul>
        <p>
          A task has at most one pending close proposal. Proposals are stored
          in shadow mode too; accepting one in shadow mode records the decision
          without changing the board.
        </p>
        <p>The inbox is part of the Taskmark API:</p>
        <CodeBlock>{`GET  /v1/projects/:projectId/review-inbox?status=pending   # pending | accepted | rejected | all
POST /v1/review-inbox/:id/accept
POST /v1/review-inbox/:id/reject                          # body: { "note": "optional" }

# every analysis, to judge the App while in shadow mode
GET  /v1/projects/:projectId/reconcile/analyses?review=unreviewed
POST /v1/reconcile/analyses/:id/review                    # body: { "correct": true, "note": "..." }
GET  /v1/projects/:projectId/reconcile/stats`}</CodeBlock>

        <h2 id="board-source">Where the App reads the board</h2>
        <p>
          The App reads the board from the project&apos;s{" "}
          <Link href="/docs/cloud">Taskmark Cloud</Link> copy, which the local
          CLI keeps in sync (<code>npx taskmark dev</code>,{" "}
          <code>serve</code>, or <code>sync</code> with the board sync token).
          It writes to the board repository you connect and mirrors the same
          edits into Cloud. Keep the board synced, or the App will not see new
          tasks.
        </p>
        <p>
          Both request boards and legacy <code>epics/</code> boards work. See{" "}
          <Link href="/docs/requests">Request boards</Link>.
        </p>

        <h2 id="ai-data">What data goes to the AI provider</h2>
        <p>
          Each project brings its own AI key: Claude (Anthropic) or OpenAI. The
          key is stored encrypted and is used only for that project&apos;s
          reconciliation. See{" "}
          <Link href="/docs/app-setup#ai-key">Set up the App</Link>.
        </p>
        <p>
          The model never gets the whole repository. For each change it gets:
        </p>
        <ul>
          <li>
            A summary of the change: repository and branch names, the pull
            request number, title, and description (first 3,000 characters),
            up to 60 commit messages, and up to 200 changed file paths with
            their added and removed line counts
          </li>
          <li>
            Diff excerpts, cut to fit about 24,000 characters for the whole
            summary. Each file&apos;s diff is first capped at 20 KB, and 200 KB
            in total, when it is fetched from GitHub or Bitbucket
          </li>
          <li>
            The candidate tasks (id, title, status, description up to 700
            characters, and acceptance criteria) and candidate story titles.
            Not the rest of the board
          </li>
        </ul>
        <p>Some files are filtered out before anything is sent:</p>
        <ul>
          <li>
            <strong>Secrets never reach the model, not even by name:</strong>{" "}
            <code>.env</code> and <code>.env.*</code>, keys and certificates (
            <code>.pem</code>, <code>.key</code>, <code>.p12</code>,{" "}
            <code>.pfx</code>, <code>.jks</code>, <code>.crt</code>, and
            similar), SSH keys (<code>id_rsa</code>, <code>id_ed25519</code>,
            ...), <code>credentials.*</code>, <code>secrets.*</code>,{" "}
            <code>.npmrc</code>, <code>.pypirc</code>, and <code>.netrc</code>.
            The summary only says how many sensitive files were left out
          </li>
          <li>
            <strong>Lockfiles</strong> (<code>package-lock.json</code>,{" "}
            <code>yarn.lock</code>, <code>pnpm-lock.yaml</code>,{" "}
            <code>go.sum</code>, <code>Cargo.lock</code>, and others), minified
            and source map files, and binaries (images, fonts, archives,
            documents) never send their diff
          </li>
          <li>
            Generated folders (<code>dist/</code>, <code>build/</code>,{" "}
            <code>out/</code>, <code>vendor/</code>,{" "}
            <code>node_modules/</code>) never send their diff
          </li>
        </ul>
        <p>
          Next: <Link href="/docs/app-setup">Set up the App</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
