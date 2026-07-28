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
        lead="The board UI and agent skills read the same markdown files. Skills generate them; you can also create or edit them by hand — as long as you keep the specification below."
      />
      <DocsProse>
        <h2 id="why-this-matters">Why this matters</h2>
        <p>
          Taskmark stores product memory as plain markdown under the board root.
          The local board UI (<code>taskmark-frontend</code>) parses these files
          to list epics, open detail sheets, show acceptance criteria, and
          compute metrics. Cursor skills (<code>/new-epic</code>,{" "}
          <code>/new-task</code>, …) generate the same shape.
        </p>
        <p>
          That means you may:
        </p>
        <ul>
          <li>Let the agent create items via slash commands</li>
          <li>Hand-write or tweak a file in your editor</li>
          <li>Fix typos, AC checkboxes, or copy without running a skill</li>
        </ul>
        <p>
          If frontmatter keys or <strong>exact section headings</strong> drift,
          parsers and sync scripts can miss status, rollups, or work logs. Treat
          this page as the contract between you, the UI, and the agent.
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
            IDs are unique board-wide: <code>E-NNN</code>, <code>S-NNN</code>,{" "}
            <code>T-NNN</code>, <code>B-NNN</code> (zero-padded)
          </li>
          <li>
            Folder slug: <code>{"{id}-{kebab-title}"}</code> (see{" "}
            <Link href="/docs/structure">folder structure</Link>)
          </li>
          <li>
            Keep section headings <strong>exact</strong> (spelling and level)
          </li>
          <li>
            Every item has <strong>Commits</strong> and <strong>Work log</strong>{" "}
            tables (even if empty)
          </li>
          <li>
            Stories, tasks, and bugs also have <strong>Prompt &amp; feedback
            log</strong>
          </li>
          <li>
            After meaningful hand edits, run <code>/sync-status</code> so INDEX,
            status, and Actual stay correct
          </li>
        </ul>

        <h2 id="frontmatter">Frontmatter fields</h2>
        <p>
          Shared shape (types differ on <code>size</code> / parents — see below):
        </p>
        <CodeBlock>{`---
id: T-001
type: task          # epic | story | task | bug
title: Add login API endpoint
status: backlog     # derived — do not hand-set except via latches
priority: medium    # critical | high | medium | low
size: M             # XS | S | M | L | XL (null on epics)
size_source: suggested   # suggested | manual | rolled_up
size_basis: []
points: 3           # 1 | 2 | 3 | 5 | 8 | 13
points_source: suggested # suggested | manual | rolled_up
estimate_minutes: 0
actual_minutes: 0   # never hand-set — from Work log via recompute
estimate_source: suggested
estimate_basis: []
session_cap_minutes: 480
parent: S-001       # null on epics; story/epic id otherwise
epic: E-001         # null on epics; ancestor epic otherwise
owner: ""
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
                <th className="px-3 py-2">Usually script/skill owned</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  <code>title</code>, <code>priority</code>, <code>tags</code>,{" "}
                  <code>owner</code>, body copy, AC checkboxes{" "}
                  <code>[ ]</code>/<code>[x]</code>, Notes
                </td>
                <td className="px-3 py-2">
                  <code>status</code> (use <code>blocked</code> /{" "}
                  <code>cancelled</code> latches instead),{" "}
                  <code>actual_minutes</code> / <code>actual_ms</code>, Work log
                  Actual math
                </td>
              </tr>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  Manual size/points with{" "}
                  <code>*_source: manual</code> when you override suggestions
                </td>
                <td className="px-3 py-2">
                  Rolled-up <code>points</code>/<code>size</code>/Est on
                  stories/epics (recompute from children)
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-3 py-2 text-foreground">
                  Linking children under <code>## Stories</code> /{" "}
                  <code>## Tasks</code>
                </td>
                <td className="px-3 py-2">
                  <code>started_at</code> / <code>completed_at</code> cascades
                  (prefer start-work / complete-work)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Status</strong> is derived by sync: cancelled latch → blocked
          latch → all AC checked + no open session → <code>done</code>; else
          in progress / backlog. Parents become <code>done</code> when all
          children are terminal. See{" "}
          <Link href="/docs/workflows">workflows</Link> for Work log rules.
        </p>

        <h2 id="epic">Epic — <code>epic.md</code></h2>
        <p>
          Path: <code>epics/{"{E-NNN}-{slug}"}/epic.md</code>
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
            Points / Est / Actual roll up from child stories{" "}
            <em>and</em> epic-direct tasks/bugs
          </li>
        </ul>
        <p>Required body sections (keep headings exact):</p>
        <CodeBlock>{`# E-NNN: Title here

## Goal

## Scope

## Out of scope

## Success metrics

## Stories

- [S-001: Login](stories/S-001-login/story.md)

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|`}</CodeBlock>
        <p>
          Optional: Prompt &amp; feedback on epics when useful; Stories list
          should link every child story the UI/agent should discover as part of
          this epic.
        </p>

        <h2 id="story">Story — <code>story.md</code></h2>
        <p>
          Path:{" "}
          <code>
            epics/…/stories/{"{S-NNN}-{slug}"}/story.md
          </code>
        </p>
        <ul>
          <li>
            <code>type: story</code>, <code>parent</code> = epic id,{" "}
            <code>epic</code> = same epic id
          </li>
          <li>
            Soft-attach under <strong>General</strong> when no clearer epic fits
          </li>
          <li>
            With children: points = sum of task/bug points; size from child
            t-shirt weights
          </li>
        </ul>
        <CodeBlock>{`# S-NNN: Title here

## User story

As a …, I want … so that ….

## Acceptance criteria

- [ ] Criterion one
- [ ] Criterion two

## Tasks

- [T-001: Add login API](items/T-001-add-login-api.md)

## Prompt & feedback log

| # | When (UTC) | Kind | Author | Summary |
|---|------------|------|--------|---------|

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|`}</CodeBlock>
        <p>
          The board UI treats unchecked <code>- [ ]</code> vs checked{" "}
          <code>- [x]</code> under <strong>Acceptance criteria</strong> as the
          source of leaf completion (together with Work log open/closed state).
        </p>

        <h2 id="task">Task — <code>T-NNN-*.md</code></h2>
        <p>
          Path (under story):{" "}
          <code>…/stories/…/items/T-NNN-{"{slug}"}.md</code>
          <br />
          Path (epic-direct):{" "}
          <code>epics/{"{E-NNN}-{slug}"}/items/T-NNN-{"{slug}"}.md</code>
        </p>
        <ul>
          <li>
            Under story: <code>parent: S-NNN</code>, <code>epic: E-NNN</code>
          </li>
          <li>
            Epic-direct: <code>parent</code> and <code>epic</code> both = epic
            id (never leave <code>parent: null</code>)
          </li>
        </ul>
        <CodeBlock>{`# T-NNN: Title here

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

        <h2 id="bug">Bug — <code>B-NNN-*.md</code></h2>
        <p>
          Same location rules as tasks. Differences:
        </p>
        <ul>
          <li>
            <code>type: bug</code>, id <code>B-NNN</code>
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
        <CodeBlock>{`# B-NNN: Title here

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

        <h2 id="tables">Table formats the UI and scripts expect</h2>
        <h3 id="work-log-table">Work log</h3>
        <CodeBlock>{`| Session | Actor | Started (UTC) | Ended (UTC) | Summary |
|---------|-------|---------------|-------------|---------|
| 1 | Marco Mendão | 2026-07-28T10:00:00Z | — | In progress: … |
| 2 | Marco Mendão | 2026-07-28T11:00:00Z | 2026-07-28T11:40:00Z | Implemented route |`}</CodeBlock>
        <ul>
          <li>
            Open session = Ended is <code>—</code> or empty
          </li>
          <li>
            Session numbers are sequential integers starting at 1
          </li>
          <li>
            Actual minutes are computed from these rows — do not invent tiny
            closed sessions just to mark done
          </li>
        </ul>

        <h3 id="commits-table">Commits</h3>
        <CodeBlock>{`| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|
| a1b2c3d | taskmark-frontend | 2026-07-28T12:00:00Z | Ada | fix login redirect |`}</CodeBlock>
        <p>
          In multi-repo workspaces, <strong>Repo</strong> is the short folder
          name from <code>REPOS.md</code>.
        </p>

        <h3 id="prompt-table">Prompt &amp; feedback</h3>
        <CodeBlock>{`| # | When (UTC) | Kind | Author | Summary |
|---|------------|------|--------|---------|
| 1 | 2026-07-28T10:00:00Z | prompt | Marco Mendão | Add login redirect |
| 2 | 2026-07-28T11:50:00Z | feedback | Marco Mendão | Looks good |`}</CodeBlock>
        <p>
          <code>Kind</code> is typically <code>prompt</code> or{" "}
          <code>feedback</code>.
        </p>

        <h2 id="manual-checklist">Manual create / edit checklist</h2>
        <ol>
          <li>
            Pick the next free id (scan the board; do not reuse)
          </li>
          <li>
            Create the folder/file in the correct place (
            <Link href="/docs/structure">structure</Link>)
          </li>
          <li>Copy the matching template above; fill title and body</li>
          <li>
            Set <code>parent</code> / <code>epic</code> correctly; link from the
            parent’s Stories or Tasks list
          </li>
          <li>
            Leave <code>actual_minutes: 0</code>; do not invent Work log rows
            unless you truly worked
          </li>
          <li>
            Run <code>/sync-status</code> (or reload the board UI after sync) so
            INDEX and status match disk
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
