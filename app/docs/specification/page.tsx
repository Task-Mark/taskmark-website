import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "File specification",
  description:
    "How Taskmark epic, story, task, and bug markdown files are structured — frontmatter, sections, and manual editing for the board UI.",
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm whitespace-pre">
      {children}
    </pre>
  )
}

export default function DocsSpecificationPage() {
  return (
    <DocsShell currentPath="/docs/specification">
      <DocsTitle
        eyebrow="Specification"
        title="Epic, story, task & bug files"
        lead="The board UI and agent commands read the same markdown files. Commands generate them; you can also create or edit them by hand — as long as you keep the specification below."
      />
      <DocsProse>
        <h2 id="why-this-matters">Why this matters</h2>
        <p>
          Taskmark stores product memory as plain markdown under the board root.
          The local board UI parses these files by scanning <code>epics/</code>{" "}
          — not a generated index. Cursor commands (<code>/tkmd-plan</code>,{" "}
          <code>/tkmd-do</code>) generate the same shape.
        </p>
        <p>That means you may:</p>
        <ul>
          <li>Let the agent create items via slash commands</li>
          <li>Hand-write or tweak a file in your editor</li>
          <li>Fix typos, AC checkboxes, or copy without running a command</li>
        </ul>
        <p>
          If frontmatter keys or <strong>exact section headings</strong> drift,
          parsers can miss status or work logs. Treat this page as the contract
          between you, the UI, and the agent.
        </p>

        <h2 id="common-rules">Common rules for every item</h2>
        <ul>
          <li>
            File starts with YAML frontmatter between <code>---</code> fences
          </li>
          <li>
            First markdown heading is <code># {"{ID}"}: {"{Title}"}</code>
          </li>
          <li>
            New IDs are unique board-wide: type prefix <code>E</code>,{" "}
            <code>S</code>, <code>T</code>, or <code>B</code> plus a
            collision-resistant token. Sequential IDs already on disk remain
            valid
          </li>
          <li>
            Folder slug: <code>{"{id}-{kebab-title}"}</code> (see{" "}
            <Link href="/docs/structure">folder structure</Link>)
          </li>
          <li>
            Keep section headings <strong>exact</strong> (spelling and level)
          </li>
          <li>
            Tasks and bugs have <strong>Commits</strong> and{" "}
            <strong>Work log</strong> tables (even if empty), plus{" "}
            <strong>Prompt &amp; feedback log</strong>
          </li>
          <li>
            Do not maintain child lists, rollups, or logs on parent files —
            the UI derives those at read time from descendant leaves
          </li>
        </ul>

        <h2 id="frontmatter">Frontmatter fields</h2>
        <p>
          Shared shape (types differ on <code>size</code> / parents — see below):
        </p>
        <CodeBlock>{`---
id: T-a3c9d2
type: task          # epic | story | task | bug
title: Add login API endpoint
status: backlog     # backlog | blocked | in_progress | done | shelved | cancelled
priority: medium    # critical | high | medium | low
size: M             # XS | S | M | L | XL | XXL (null on epics)
size_source: suggested   # suggested | manual
size_basis: []
points: 5           # 1 | 3 | 5 | 8 | 13 | 21
points_source: suggested # suggested | manual
parent: S-n4q8w1    # null on epics; story/epic id otherwise
epic: E-k7m2p9      # null on epics; ancestor epic otherwise
reporters: []       # [{name, email, initials}, ...]
resolvers: []
blocked: false
cancelled: false
tags: []
created: 2026-07-21
updated: 2026-07-21T15:02:00Z
started_at: null
completed_at: null
---`}</CodeBlock>

        <h3 id="hand-edit-vs-derived">What to edit by hand vs leave alone</h3>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Safe to edit</th>
                <th className="px-3 py-2">Leave to commands / UI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  <code>title</code>, <code>priority</code>, <code>tags</code>,{" "}
                  body copy, AC checkboxes{" "}
                  <code>[ ]</code>/<code>[x]</code>, Notes
                </td>
                <td className="px-3 py-2">
                  <code>status</code> (use <code>blocked</code> /{" "}
                  <code>cancelled</code> latches or <code>/tkmd-shelf</code>{" "}
                  instead), Actual (the UI derives it from closed leaf Work log
                  intervals)
                </td>
              </tr>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  Manual size/points with{" "}
                  <code>*_source: manual</code> when you override the static map
                </td>
                <td className="px-3 py-2">
                  Parent points, status, people, and dates (UI queries children)
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-3 py-2 text-foreground">
                  Leaf Prompt &amp; feedback, Commits, and Work log tables
                </td>
                <td className="px-3 py-2">
                  Child lists on <code>epic.md</code> / <code>story.md</code> —
                  do not maintain them; <code>/tkmd-plan</code> does not write
                  them
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Status</strong> on a leaf: <code>done</code> means
          implemented; <code>shelved</code> means deliberately discarded
          without implementation; <code>cancelled</code> is a separate terminal
          latch outcome. Backlog, blocked, and in-progress work is incomplete.{" "}
          <code>/tkmd-do</code> does not transition through{" "}
          <code>in_progress</code>; when it finishes, executed leaves are{" "}
          <code>done</code>. <code>/tkmd-shelf</code> changes only eligible
          task/bug leaves to <code>shelved</code>, sets{" "}
          <code>completed_at</code>, preserves acceptance criteria and{" "}
          <code>cancelled: false</code>, and never edits parent markdown.
          Parent status, implementers, and lifecycle dates are inferred from
          leaves in the UI: a terminal mix containing done rolls up to done;
          without done, any shelved descendant rolls up to shelved; all-cancelled
          rolls up to cancelled. Hide completed treats all three terminal
          outcomes as complete.
        </p>

        <h2 id="epic">Epic — <code>epic.md</code></h2>
        <p>
          Path: <code>epics/{"{id}-{slug}"}/epic.md</code>
        </p>
        <ul>
          <li>
            <code>type: epic</code>, <code>parent: null</code>,{" "}
            <code>epic: null</code>
          </li>
          <li>
            <code>size: null</code> — epics have <strong>no</strong> t-shirt size
          </li>
          <li>
            Points / Actual / logs / child lists are read-time views over
            descendant files — do not write rollups or story lists here
          </li>
        </ul>
        <p>Required body sections (keep headings exact):</p>
        <CodeBlock>{`# E-k7m2p9: Title here

## Goal

## Scope

## Out of scope

## Success metrics`}</CodeBlock>

        <h2 id="story">Story — <code>story.md</code></h2>
        <p>
          Path:{" "}
          <code>
            epics/…/stories/{"{id}-{slug}"}/story.md
          </code>
        </p>
        <ul>
          <li>
            <code>type: story</code>, <code>parent</code> = epic id,{" "}
            <code>epic</code> = same epic id
          </li>
          <li>
            <code>/tkmd-plan</code> attaches to an existing fitting epic; it
            creates a new epic only when the initiative fits nowhere
          </li>
          <li>
            Tasks live in this story’s <code>items/</code>; the UI lists them
            without a maintained Tasks section
          </li>
        </ul>
        <CodeBlock>{`# S-n4q8w1: Title here

## User story

As a …, I want … so that ….

## Acceptance criteria

- [ ] Criterion one
- [ ] Criterion two`}</CodeBlock>
        <p>
          The board UI treats unchecked <code>- [ ]</code> vs checked{" "}
          <code>- [x]</code> under <strong>Acceptance criteria</strong> as the
          source of leaf completion (together with Work log state on the item).
        </p>

        <h2 id="task">Task — <code>T-*-*.md</code></h2>
        <p>
          Path (under story):{" "}
          <code>…/stories/…/items/{"{id}-{slug}"}.md</code>
          <br />
          Path (epic-direct):{" "}
          <code>epics/{"{epic-id}-{slug}"}/items/{"{id}-{slug}"}.md</code>
        </p>
        <ul>
          <li>
            Under story: <code>parent</code> = story id, <code>epic</code> =
            ancestor epic
          </li>
          <li>
            Epic-direct: <code>parent</code> and <code>epic</code> both = epic
            id (never leave <code>parent: null</code>)
          </li>
        </ul>
        <CodeBlock>{`# T-a3c9d2: Title here

## Description

What to build or change.

## Acceptance criteria

- [ ] Observable outcome one
- [ ] Observable outcome two

## Notes

Optional implementation notes, links, or decisions.

## Prompt & feedback log

| # | When (UTC) | Kind | Author | Summary |
|---|------------|------|--------|---------|

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|`}</CodeBlock>

        <h2 id="bug">Bug — <code>B-*-*.md</code></h2>
        <p>
          Same location rules as tasks. Differences:
        </p>
        <ul>
          <li>
            <code>type: bug</code>, id prefix <code>B</code>
          </li>
          <li>
            Prefer sections <strong>Description</strong>,{" "}
            <strong>Repro steps</strong>, and <strong>Fix criteria</strong>{" "}
            (checkboxes under Fix criteria drive done, like AC on tasks)
          </li>
          <li>
            Still include Prompt &amp; feedback, Commits, and Work log
          </li>
        </ul>
        <CodeBlock>{`# B-f8h1j4: Title here

## Description

What is wrong / expected vs actual.

## Repro steps

1. …
2. …

## Fix criteria

- [ ] Failure no longer reproduces
- [ ] Regression covered or noted

## Notes

## Prompt & feedback log

| # | When (UTC) | Kind | Author | Summary |
|---|------------|------|--------|---------|

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|`}</CodeBlock>

        <h2 id="tables">Table formats the UI expects</h2>
        <h3 id="work-log-table">Work log</h3>
        <CodeBlock>{`| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
| 1 | Marco Mendão | 2026-07-28T10:00:00Z | 2026-07-28T10:40:00Z | Implemented route |`}</CodeBlock>
        <ul>
          <li>
            Open session = Ended is <code>—</code> or empty
          </li>
          <li>
            Session numbers are sequential integers starting at 1
          </li>
          <li>
            Actual minutes are computed from these rows on the leaf
          </li>
        </ul>

        <h3 id="commits-table">Commits</h3>
        <CodeBlock>{`| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|
| a1b2c3d | taskmark-frontend | 2026-07-28T12:00:00Z | Ada | fix login redirect |`}</CodeBlock>
        <p>
          In multi-repo workspaces, <strong>Repo</strong> is the short folder
          name from local <code>REPOS.md</code>.
        </p>

        <h3 id="prompt-table">Prompt &amp; feedback</h3>
        <CodeBlock>{`| # | When (UTC) | Kind | Author | Summary |
|---|------------|------|--------|---------|
| 1 | 2026-07-28T10:00:00Z | prompt | Marco Mendão | Add login redirect |
| 2 | 2026-07-28T11:50:00Z | feedback | Marco Mendão | Looks good |`}</CodeBlock>
        <p>
          <code>Kind</code> is typically <code>prompt</code> or{" "}
          <code>feedback</code>. Agents write a prompt row on every product-work
          session: an open matching leaf, a done leaf that still covers the
          change, or a newly created task/bug. Never on epic or story parents.
        </p>

        <h2 id="manual-checklist">Manual create / edit checklist</h2>
        <ol>
          <li>
            Mint a collision-resistant id (type prefix + unique token). Do not
            take “the next number” from a global sequence
          </li>
          <li>
            Create the folder/file in the correct place (
            <Link href="/docs/structure">structure</Link>)
          </li>
          <li>Copy the matching template above; fill title and body</li>
          <li>
            Set <code>parent</code> / <code>epic</code> correctly. Do not add
            the child to a parent Stories/Tasks list
          </li>
          <li>
            Do not add estimate or owner fields. Actual comes only from real,
            closed Work log intervals
          </li>
        </ol>
        <p>
          Related: <Link href="/docs/sizing">Sizing</Link>,{" "}
          <Link href="/docs/commands">Commands</Link>,{" "}
          <Link href="/docs/workflows">Workflows</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
