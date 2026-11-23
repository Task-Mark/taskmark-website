import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Request boards",
  description:
    "The Taskmark 2.0 board layout: requests with a brief, epics, and a log; meetings; delivery stages; the request screens; migration; and npx taskmark requests regroup.",
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm whitespace-pre">
      {children}
    </pre>
  )
}

const SCREENS: { name: string; what: string }[] = [
  {
    name: "Work",
    what: "The default screen: requests and meetings side by side, with the tasks that came out of meetings.",
  },
  {
    name: "Requests",
    what: "Every request, grouped by status, with how many tasks shipped, are in testing, or are in development.",
  },
  {
    name: "Request",
    what: "One request: the brief, the forecast, the tree of epics, stories, and tasks, and the request log.",
  },
  {
    name: "Roadmap",
    what: "One timeline row per request, from first activity to the shipped day (or to the forecast while it is open), plus the tasks agreed in meetings.",
  },
  {
    name: "Client status",
    what: "A view to share with the client, over the last 4 or 12 weeks or all time. Counts only work that reached main.",
  },
  {
    name: "Activity",
    what: "Work sessions from the Work log tables, day by day, with merges, promotions, releases, and decisions from the request logs in between.",
  },
  {
    name: "People",
    what: "Shipped points per person (credited to the task's resolvers), sessions and hours from Work log rows, and commits from Commits rows.",
  },
]

export default function DocsRequestsPage() {
  return (
    <DocsShell currentPath="/docs/requests">
      <DocsTitle
        eyebrow="Requests"
        title="Request boards"
        lead="Taskmark 2.0 groups work under the request it delivers: what the client asked for, with a brief, the epics that deliver it, and a log. Meetings sit next to them."
      />
      <DocsProse>
        <h2 id="layout">Layout</h2>
        <p>
          A request board keeps every request in <code>requests/&lt;slug&gt;/</code>{" "}
          and every meeting in <code>meetings/</code>. Epics, stories, tasks,
          and bugs keep exactly the same files and{" "}
          <Link href="/docs/specification">specification</Link> as before; they
          just live under the request they belong to.
        </p>
        <CodeBlock>{`acme-taskmark/
├── requests/
│   └── careers-page/
│       ├── brief.md              # what was asked, why, and when it is done
│       ├── epics/
│       │   └── E-MM-k7m2p9b3-careers/
│       │       ├── epic.md
│       │       └── stories/
│       │           └── S-MM-n4q8w1a2-job-list/
│       │               ├── story.md
│       │               └── items/
│       │                   └── T-MM-a8f31c2d-list-api.md
│       └── log/
│           └── 2026-11-20-decision-scope.md
└── meetings/
    └── 2026-11-18-kickoff.md`}</CodeBlock>
        <p>
          A folder under <code>requests/</code> counts as a request only when
          it has a <code>brief.md</code>. A board can keep a legacy{" "}
          <code>epics/</code> folder next to <code>requests/</code> while it is
          being migrated; both are read.
        </p>

        <h2 id="brief">The brief</h2>
        <p>
          <code>requests/&lt;slug&gt;/brief.md</code> is the spec of the
          request, written for people and read by agents.
        </p>
        <CodeBlock>{`---
id: R-careers-page
type: request
title: Careers page
status: building      # proposed | ready (or backlog) | building | shipped | shelved | cancelled
requested_by:
  - name: Ana Costa
    email: ana@client.example
owner:
  - name: Marco Mendão
created: 2026-11-10
updated: 2026-11-20
forecast: null        # YYYY-MM-DD when you commit to a date
tags: []
aliases: []           # old ids that still resolve to this request
source_meetings: [M-2026-11-18-kickoff]
links:
  - request: R-brand-refresh
    relation: waits-for   # e.g. waits-for, split-from, relates-to
---

# Careers page

## Goal

Candidates can see open roles and apply.

## Why

Hiring is moving off the old job board.

## Done when

- [ ] Open roles are listed from the HR feed
- [ ] Each role has an apply form

## Out of scope

- Internal referrals

## Open questions

- [ ] Do we need a Portuguese version at launch?`}</CodeBlock>
        <ul>
          <li>
            Without an <code>id</code>, the request is <code>R-&lt;slug&gt;</code>
          </li>
          <li>
            Without a <code>status</code>, it is derived from its tasks: no
            tasks is <code>proposed</code>, all done is <code>shipped</code>,
            any started is <code>building</code>, otherwise{" "}
            <code>ready</code>. The interface shows <code>ready</code> as
            Backlog
          </li>
          <li>
            Section names have fallbacks: <strong>Goal</strong> (or Objective),{" "}
            <strong>Why</strong> (or Context, Background),{" "}
            <strong>Done when</strong> (or Success metrics, Acceptance
            criteria), <strong>Out of scope</strong>, and{" "}
            <strong>Open questions</strong>. Plain bullets work where
            checkboxes are shown
          </li>
        </ul>

        <h2 id="log">The request log</h2>
        <p>
          <code>requests/&lt;slug&gt;/log/</code> holds one small markdown file
          per event, append-only. The frontmatter says what happened; the body
          is the summary.
        </p>
        <CodeBlock>{`---
kind: decision       # push | merge | promote | release | decision | meeting | scope | note
at: 2026-11-20T10:00:00Z
title: Drop referrals from the first release
person:
  name: Marco Mendão
targets: [S-MM-n4q8w1a2]   # task, story, or meeting ids this entry is about
---
Agreed with the client to ship without referrals.`}</CodeBlock>
        <p>
          Entries about code moving between branches can also carry{" "}
          <code>repo</code>, <code>provider</code>, <code>from</code>,{" "}
          <code>to</code>, and <code>shas</code>. An unknown kind is read as{" "}
          <code>note</code>.
        </p>

        <h2 id="meetings">Meetings</h2>
        <p>
          Meetings live in <code>meetings/&lt;date&gt;-&lt;slug&gt;.md</code>.
        </p>
        <CodeBlock>{`---
id: M-2026-11-18-kickoff
title: Kickoff with Acme
date: 2026-11-18
duration_minutes: 45
people:
  - name: Ana Costa
  - name: Marco Mendão
source: call
review_state: needs_review
requests:
  - request: R-careers-page
    relation: created    # created | changed | discussed | raised | accepted
---

## Summary

Scoped the careers page.

## Decisions

| Decision | Request |
|----------|---------|
| Launch in English only | R-careers-page |

## Tasks

| ID | Task | Owner | Due | Request | Item | Status |
|----|------|-------|-----|---------|------|--------|
| 1 | Send the HR feed sample | Ana | 2026-11-22 | R-careers-page | | open |
| 2 | Build the role list | Marco | | R-careers-page | T-MM-a8f31c2d | in_progress |

## Notes`}</CodeBlock>
        <p>
          Task status is <code>open</code>, <code>in_progress</code>,{" "}
          <code>done</code>, or <code>cancelled</code>. When{" "}
          <strong>Item</strong> names a board task, the meeting shows that
          task&apos;s delivery stage. Without an <code>id</code>, a meeting is{" "}
          <code>M-&lt;file name&gt;</code>.
        </p>

        <h2 id="stages">Stages</h2>
        <p>
          Tasks and bugs carry two extra frontmatter fields, written by the{" "}
          <Link href="/docs/app#stages">GitHub and Bitbucket App</Link>, never
          by hand:
        </p>
        <CodeBlock>{`stage: testing          # development | testing | production
shipped_at: null        # set the first time the task reaches production`}</CodeBlock>
        <ul>
          <li>
            <code>development</code>: the work is on a development branch (
            <code>develop</code> by default)
          </li>
          <li>
            <code>testing</code>: it reached <code>quality</code>
          </li>
          <li>
            <code>production</code>: it reached <code>main</code>.{" "}
            <strong>Only production counts as shipped</strong>
          </li>
        </ul>
        <p>
          A task with no commits has no stage. A story, epic, or request is
          only as far along as its least advanced task. Forecasts use the pace
          of shipped points over recent weeks, so work that is done on a
          feature branch or waiting in <code>quality</code> never moves a
          client date.
        </p>

        <h2 id="screens">Screens</h2>
        <p>
          A board with requests or meetings opens on the request screens in the
          local UI (<code>npx taskmark serve</code> or <code>dev</code>):
        </p>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Screen</th>
                <th className="px-3 py-2">What it shows</th>
              </tr>
            </thead>
            <tbody>
              {SCREENS.map((row) => (
                <tr key={row.name} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2 text-foreground">{row.name}</td>
                  <td className="px-3 py-2">{row.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          The earlier views stay available in the sidebar under{" "}
          <strong>Board files</strong>: All epics (the Overall tree), All
          items, Work log, Changelog, and Reports. A board without requests
          keeps opening on the Overall tree.
        </p>

        <h2 id="migrate">Migrate a legacy board</h2>
        <p>
          <code>npx taskmark init</code> offers this migration on a legacy
          board: it shows the preview, migrates after you confirm, and commits
          the result in the board repository. To run it on its own,{" "}
          <code>npx taskmark migrate</code> moves a board from{" "}
          <code>epics/</code> to <code>requests/</code>, one request per epic.
          Run it from the board folder, and preview first:
        </p>
        <CodeBlock>{`npx taskmark migrate --dry-run   # show what would change
npx taskmark migrate             # apply`}</CodeBlock>
        <p>For each legacy epic it:</p>
        <ul>
          <li>
            Creates <code>requests/&lt;slug&gt;/</code>, with the slug taken
            from the epic title. A General epic becomes a{" "}
            <code>maintenance</code> request titled Maintenance
          </li>
          <li>
            Moves the epic folder unchanged to{" "}
            <code>requests/&lt;slug&gt;/epics/</code>, so ids, stories, tasks,
            work logs, and commit tables keep working
          </li>
          <li>
            Writes <code>brief.md</code> with id <code>R-&lt;slug&gt;</code>,
            the epic id as an alias, and the Goal, Scope, Done when (from
            Success metrics), and Out of scope of the epic. The status comes
            from the tasks
          </li>
          <li>
            Gives done tasks without a stage <code>stage: production</code> and{" "}
            <code>shipped_at</code> (their <code>completed_at</code>), since
            there is no branch history to classify them
          </li>
          <li>
            Adds a <code>note</code> to the request log saying it was migrated
            from the epic
          </li>
        </ul>
        <p>
          Nothing is deleted except the empty <code>epics/</code> folder.
          Afterwards, review the briefs and regroup requests that belong
          together (below). <code>npx taskmark migrate</code> leaves the commit
          to you.
        </p>

        <h2 id="regroup">Regroup related requests</h2>
        <p>
          Migration makes one request per epic, but one piece of work often
          spread over several epics. <code>npx taskmark init</code> offers to
          regroup right after a migration (or when the board has more than 8
          requests). To run it on its own, from the board folder:
        </p>
        <CodeBlock>{`npx taskmark requests regroup             # ask, review, merge, commit
npx taskmark requests regroup --dry-run   # show the plan, write nothing
npx taskmark requests regroup --yes       # no questions: accept proposals at least 80% confident`}</CodeBlock>
        <ul>
          <li>
            The project&apos;s AI proposes which requests belong together. It
            needs the project&apos;s own AI key (set by{" "}
            <code>npx taskmark init</code> or <code>npx taskmark ai set</code>)
          </li>
          <li>
            You accept all proposals, choose them one by one, or skip (the
            default)
          </li>
          <li>
            For each accepted merge, the CLI moves the epics and log entries
            into the target request, adds the merged request ids to the
            target brief&apos;s <code>aliases</code> so old links still
            resolve, lists their goals under <code>## Merged requests</code> in
            the brief, keeps each merged brief as a log entry, and removes the
            merged folders
          </li>
          <li>
            Nothing is written if any move would overwrite a file. After you
            confirm, it commits the result in the board repository
          </li>
        </ul>

        <h2 id="plugin">The Cursor plugin on a request board</h2>
        <p>
          The Cursor plugin&apos;s <code>/tkmd-plan</code> and{" "}
          <code>/tkmd-save</code> write new work under{" "}
          <code>requests/</code>: new epics, stories, and tasks go under{" "}
          <code>requests/&lt;slug&gt;/epics/</code> of the request they serve,
          and new work that fits no request gets a new{" "}
          <code>requests/&lt;slug&gt;/</code> folder with a{" "}
          <code>brief.md</code>. On a legacy board without{" "}
          <code>requests/</code> they keep writing under <code>epics/</code>.
        </p>
        <p>
          Related: <Link href="/docs/structure">Folder structure</Link>,{" "}
          <Link href="/docs/specification">File specification</Link>,{" "}
          <Link href="/docs/commands#cli">CLI commands</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
