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
    "How Taskmark epic, story, task, and bug markdown files are structured — frontmatter, sections, images, and manual editing for the board UI.",
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
          The local board UI parses these files by scanning{" "}
          <code>requests/*/epics/</code> and the legacy <code>epics/</code>{" "}
          folder, not a generated index. The Cursor plugin&apos;s{" "}
          <code>/tkmd-plan</code> and <code>/tkmd-save</code> write the same
          shape, and the <Link href="/docs/app">GitHub and Bitbucket App</Link>{" "}
          edits it when it records work. Request briefs, request logs, and
          meetings are described in{" "}
          <Link href="/docs/requests">Request boards</Link>.
        </p>
        <p>That means you may:</p>
        <ul>
          <li>Create items with the Cursor plugin&apos;s slash commands</li>
          <li>Hand-write or tweak a file in your editor</li>
          <li>Fix typos, AC checkboxes, or copy without running a command</li>
        </ul>
        <p>
          Coding agents treat existing items as read-only: they read them as
          the spec and never edit them (see{" "}
          <Link href="/docs/agents">Use Taskmark with any AI agent</Link>).
        </p>
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
            New IDs are unique board-wide:{" "}
            <code>E|S|T|B-&lt;identity&gt;-&lt;random&gt;</code> (for example{" "}
            <code>T-MM-a8f31c2d</code>). Legacy sequential IDs such as{" "}
            <code>T-001</code> already on disk remain valid
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
            <strong>Work log</strong> tables (even if empty), which the App
            fills, plus a <strong>Prompt &amp; feedback</strong> table that
            agents no longer write to (see{" "}
            <a href="#prompt-table">below</a>)
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
id: T-MM-a8f31c2d
type: task          # epic | story | task | bug
title: Add login API endpoint
status: backlog     # backlog | blocked | in_progress | done | shelved | cancelled
priority: medium    # critical | high | medium | low
size: M             # XS | S | M | L | XL | XXL | null (null on parents with children)
points: 5           # 1 | 3 | 5 | 8 | 13 | 21 | null
parent: S-MM-n4q8w1a2    # null on epics; story/epic id otherwise
epic: E-MM-k7m2p9b3      # null on epics; ancestor epic otherwise
reporters: []       # [{name, email, initials}, ...]
resolvers: []
blocked: false
cancelled: false
tags: []
created: 2026-07-21
updated: 2026-07-21T15:02:00Z
started_at: null
completed_at: null
stage: null         # development | testing | production (written by the App)
shipped_at: null    # set by the App the first time the task reaches production
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
                  <code>status</code>, <code>completed_at</code>,{" "}
                  <code>resolvers</code>, <code>stage</code>, and{" "}
                  <code>shipped_at</code> (the App writes them; a person may
                  still set <code>blocked</code> / <code>cancelled</code>{" "}
                  latches or <code>status: shelved</code>), Actual (the UI
                  derives it from closed leaf Work log intervals)
                </td>
              </tr>
              <tr className="border-b border-border/60 align-top">
                <td className="px-3 py-2 text-foreground">
                  Leaf <code>size</code> / <code>points</code> from the static
                  map (do not add estimate or owner fields)
                </td>
                <td className="px-3 py-2">
                  Parent points, status, people, and dates (UI queries children)
                </td>
              </tr>
              <tr className="align-top">
                <td className="px-3 py-2 text-foreground">
                  Notes and Description of a leaf (Commits and Work log rows
                  are written by the App)
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
          latch outcome. Backlog, blocked, and in-progress work is incomplete.
          The App sets <code>done</code> when it closes a task (on its own or
          after a person accepts a likely close) and moves a reverted task
          back to <code>in_progress</code>. Agents never change status. To
          shelve work that will never be implemented, a person sets{" "}
          <code>status: shelved</code> and <code>completed_at</code> on the
          task or bug, keeping its criteria unchecked and{" "}
          <code>cancelled: false</code>. Parent status, implementers, and lifecycle dates are inferred from
          leaves in the UI: a terminal mix containing done rolls up to done;
          without done, any shelved descendant rolls up to shelved; all-cancelled
          rolls up to cancelled. Hide completed treats all three terminal
          outcomes as complete.
        </p>

        <h2 id="epic">Epic — <code>epic.md</code></h2>
        <p>
          Path: <code>requests/{"{request-slug}"}/epics/{"{id}-{slug}"}/epic.md</code>{" "}
          on a <Link href="/docs/requests">request board</Link>, or{" "}
          <code>epics/{"{id}-{slug}"}/epic.md</code> on a legacy board. Paths
          below start at the epic folder.
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
        <CodeBlock>{`# E-MM-k7m2p9b3: Title here

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
            creates a new epic only when the initiative fits nowhere. There is
            no reserved General epic to soft-attach to
          </li>
          <li>
            Tasks live in this story’s <code>items/</code>; the UI lists them
            without a maintained Tasks section
          </li>
        </ul>
        <CodeBlock>{`# S-MM-n4q8w1a2: Title here

## User story

As a …, I want … so that ….

## Acceptance criteria

- [ ] Criterion one
- [ ] Criterion two`}</CodeBlock>
        <p>
          The board UI shows unchecked <code>- [ ]</code> and checked{" "}
          <code>- [x]</code> items under <strong>Acceptance criteria</strong>.
          When the App closes a task it ticks the criteria the change covers.
        </p>

        <h2 id="task">Task — <code>T-&lt;identity&gt;-&lt;random&gt;.md</code></h2>
        <p>
          Path (under story):{" "}
          <code>…/stories/…/items/{"{id}-{slug}"}.md</code>
          <br />
          Path (epic-direct):{" "}
          <code>…/epics/{"{epic-id}-{slug}"}/items/{"{id}-{slug}"}.md</code>
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
        <CodeBlock>{`# T-MM-a8f31c2d: Title here

## Description

What to build or change.

## Acceptance criteria

- [ ] Observable outcome one
- [ ] Observable outcome two

## Notes

Optional implementation notes, links, or decisions.

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|`}</CodeBlock>

        <h2 id="bug">Bug — <code>B-&lt;identity&gt;-&lt;random&gt;.md</code></h2>
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
        <CodeBlock>{`# B-MM-f8h1j4c5: Title here

## Description

What is wrong / expected vs actual.

## Repro steps

1. …
2. …

## Fix criteria

- [ ] Failure no longer reproduces
- [ ] Regression covered or noted

## Notes

## Prompt & feedback

| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|

## Commits

| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|

## Work log

| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|`}</CodeBlock>

        <h2 id="images">Images</h2>
        <p>
          Any item can show screenshots, mockups, or diagrams. Save the image
          file inside the board, then reference it with standard markdown image
          syntax and a path <strong>relative to the markdown file</strong> that
          uses it. The board UI resolves the path and shows the image in the
          item detail. Requires <code>@taskmark/ui</code> 1.3.0 or later.
        </p>

        <h3 id="images-where">Where to put the file</h3>
        <p>
          Keep images next to the item they illustrate, for example in an{" "}
          <code>assets/</code> folder. Commit them with the board so everyone
          sees the same thing:
        </p>
        <CodeBlock>{`requests/checkout/epics/E-MM-k7m2p9b3-checkout/
├── epic.md
├── assets/
│   └── flow.png
└── stories/
    └── S-MM-n4q8w1a2-pay-with-card/
        ├── story.md
        ├── assets/
        │   └── card-form.png
        └── items/
            ├── assets/
            │   └── error-state.png
            └── T-MM-a8f31c2d-validate-card.md`}</CodeBlock>

        <h3 id="images-syntax">Reference it from the markdown</h3>
        <p>
          The path starts from the folder of the file you are editing. Tasks
          and bugs live inside <code>items/</code>, so their paths start there:
        </p>
        <CodeBlock>{`<!-- in story.md -->
## User story

As a shopper, I want to pay with a card so that checkout is quick.

![Card form mockup](./assets/card-form.png)

<!-- in items/T-MM-a8f31c2d-validate-card.md -->
## Description

Show an inline error when the card number is invalid.

![Error state](./assets/error-state.png)

Reuse the story mockup from the parent folder:

![Card form](../assets/card-form.png)`}</CodeBlock>
        <ul>
          <li>
            The text in the brackets is the alt text. Describe what the image
            shows
          </li>
          <li>
            <code>../</code> may climb to parent folders, but never above the
            board root
          </li>
          <li>
            Encode spaces as <code>%20</code> or wrap the path in angle
            brackets: <code>![Mockup](&lt;./assets/card form.png&gt;)</code>
          </li>
          <li>
            Reference-style images work too:{" "}
            <code>![Flow][flow]</code> with <code>[flow]: ./assets/flow.png</code>{" "}
            on its own line
          </li>
          <li>
            Absolute URLs (<code>https://…</code>) and{" "}
            <code>data:</code> URIs are shown as-is, without any of the rules
            below
          </li>
        </ul>

        <h3 id="images-rules">Formats and limits</h3>
        <ul>
          <li>
            Formats: <code>.png</code>, <code>.jpg</code>/<code>.jpeg</code>,{" "}
            <code>.gif</code>, <code>.webp</code>, <code>.avif</code>,{" "}
            <code>.svg</code>. Up to 20 MB per file
          </li>
          <li>
            The file must sit inside the board. Hidden folders (names starting
            with <code>.</code>, except <code>.reports</code>),{" "}
            <code>node_modules</code>, <code>out</code>, and <code>.next</code>{" "}
            are never served
          </li>
          <li>
            Put images in prose sections such as Goal, Scope, Description, User
            story, Repro steps, or Notes. Acceptance criteria and Fix criteria
            render as a checklist, and a line that is not a checkbox item is
            not shown there
          </li>
          <li>
            Raw HTML <code>&lt;img&gt;</code> tags are not rendered. Use
            markdown syntax
          </li>
          <li>
            The same rules apply to images in the board <code>CHANGELOG.md</code>{" "}
            and in <code>.reports/</code> reports
          </li>
        </ul>

        <h3 id="images-modes">How each mode serves images</h3>
        <ul>
          <li>
            <code>npx taskmark serve</code> and <code>npx taskmark dev</code>{" "}
            read the image straight from the board folder. A new or changed
            image shows on the next load, without a restart
          </li>
          <li>
            <code>npx taskmark build</code> copies only the images that board
            markdown references into <code>out/board-assets/</code>, so the
            static site (for example on Vercel) works without a server. A
            missing image is reported as a warning in the build output
          </li>
          <li>
            <Link href="/docs/cloud">Taskmark Cloud</Link> does not show
            relative images yet: sync sends markdown only. Use an absolute URL
            if a Cloud board must show the image
          </li>
        </ul>

        <h2 id="tables">Table formats the UI expects</h2>
        <p>
          On a task, both tables below are written by the{" "}
          <Link href="/docs/app">App</Link> when it records a push or merged
          pull request. People may add rows by hand; agents do not.
        </p>
        <h3 id="work-log-table">Work log</h3>
        <CodeBlock>{`| Actor | Started (UTC) | Ended (UTC) | Summary |
|-------|---------------|-------------|---------|
| Marco Mendão | 2026-07-28T10:00:00Z | 2026-07-28T10:40:00Z | PR #214: Added the login route. |`}</CodeBlock>
        <ul>
          <li>
            Open interval = Ended is empty
          </li>
          <li>
            Actual minutes are computed from closed rows on the leaf
          </li>
          <li>
            A legacy <code>Session</code> column still parses if present; new
            files omit it
          </li>
        </ul>

        <h3 id="commits-table">Commits</h3>
        <CodeBlock>{`| SHA | Repo | Date (UTC) | Author | Message |
|-----|------|------------|--------|---------|
| a1b2c3d | taskmark-frontend | 2026-07-28T12:00:00Z | Ada | fix login redirect |`}</CodeBlock>
        <p>
          <strong>Repo</strong> is the name of the code repository the commit
          came from.
        </p>

        <h3 id="prompt-table">Prompt &amp; feedback (legacy)</h3>
        <CodeBlock>{`| When (UTC) | Kind | Author | Summary |
|------------|------|--------|---------|
| 2026-07-28T10:00:00Z | prompt | Marco Mendão | Add login redirect |
| 2026-07-28T11:50:00Z | feedback | Marco Mendão | Looks good |`}</CodeBlock>
        <p>
          <code>Kind</code> is typically <code>prompt</code> or{" "}
          <code>feedback</code>. Before 2.0, agents wrote these rows on every
          session. They no longer do, and new items keep the table empty. The
          only writer left is the App, which adds one row to a task it creates
          when a person accepts a new task from the review inbox. Existing
          rows still show in the UI, and <code>/tkmd-changelog</code> reads
          them as a fallback.
        </p>

        <h2 id="manual-checklist">Manual create / edit checklist</h2>
        <ol>
          <li>
            Mint a collision-resistant id (
            <code>E|S|T|B-&lt;identity&gt;-&lt;random&gt;</code>). Do not take
            “the next number” from a global sequence
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
          <li>
            Leave <code>stage</code> and <code>shipped_at</code> unset; the App
            writes them
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
