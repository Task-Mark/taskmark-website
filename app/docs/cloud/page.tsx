import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Taskmark Cloud",
  description:
    "Why Taskmark Cloud exists and how a local markdown board syncs to the hosted team view.",
}

export default function DocsCloudPage() {
  return (
    <DocsShell currentPath="/docs/cloud">
      <DocsTitle
        eyebrow="Cloud"
        title="Taskmark Cloud"
        lead="A hosted, shared view of the same markdown board you keep in git — not a second backlog."
      />
      <DocsProse>
        <h2 id="purpose">What Cloud is for</h2>
        <p>
          Local Taskmark is the source of truth. Agents and developers write
          epics, stories, tasks, and bugs as files in the board repository.
          Taskmark Cloud exists so the rest of the team can open that board in a
          browser: follow delivery, presence, and work logs without cloning the
          repo or running the local UI.
        </p>
        <p>
          Cloud is a published copy. Planning and implementation still happen
          locally with{" "}
          <Link href="/docs/commands">
            <code>/tkmd-*</code> commands
          </Link>
          . The hosted app does not invent work items; it shows the markdown
          your local process last pushed.
        </p>
        <p>
          The hosted app is{" "}
          <a href={SITE.cloudUrl} target="_blank" rel="noopener noreferrer">
            {SITE.cloudUrl.replace(/^https:\/\//, "")}
          </a>
          .
        </p>

        <h2 id="configuration-guide">Configuration guide</h2>
        <p>
          Each Cloud project has one board sync token. That token selects the
          destination project and authorizes uploads. You commit it on the local
          board as dotenv keys in a board-root <code>.config</code> file (not{" "}
          <code>.env</code>). Clones of the board start syncing as soon as
          someone runs the local UI.
        </p>
        <ol>
          <li>
            Sign in at{" "}
            <a href={SITE.cloudUrl} target="_blank" rel="noopener noreferrer">
              Taskmark Cloud
            </a>{" "}
            and create or open a project.
          </li>
          <li>
            Open <strong>Settings</strong> on that Cloud project and copy the
            board sync token (it starts with <code>tmk_</code>). Treat it like a
            password: anyone with the token can upload to the project.
          </li>
          <li>
            In the local board root, set{" "}
            <code>TASKMARK_SYNC_TOKEN=tmk_…</code> in <code>.config</code>. You
            can copy <code>.config.example</code> if the board ships one.
            Commit <code>.config</code> so every clone uses the same project.
          </li>
          <li>
            From that board folder run <code>npx taskmark dev</code> or{" "}
            <code>npx taskmark serve</code>. Keep the process running. The CLI
            watches board markdown and <code>.config</code>, then pushes
            changed files and a rebuilt snapshot.
          </li>
          <li>
            Refresh the Cloud project board. After the first successful sync,
            local markdown edits keep the hosted board up to date.
          </li>
        </ol>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`# board-root .config
TASKMARK_SYNC_TOKEN=tmk_`}
        </pre>
        <h3 id="configuration-reference">Configuration reference</h3>
        <ul>
          <li>
            <code>TASKMARK_SYNC_TOKEN</code> — the project token copied from
            Taskmark Cloud Settings. That is the only setting the board needs.
          </li>
        </ul>
        <p>
          If <code>.config</code> has no valid token,{" "}
          <code>TASKMARK_SYNC_TOKEN</code> in the environment or a local{" "}
          <code>.env</code> is a fallback. Local UI no longer has a Settings
          tab for the token — edit <code>.config</code>.
        </p>

        <h3 id="verify-sync">Verify the connection</h3>
        <p>
          Keep the local command running and watch its terminal. A healthy
          first sync names the Cloud origin and project, counts local and
          changed files, builds the board snapshot, uploads one or more
          batches, and prints the resulting board version. Later markdown
          edits should normally report only the files that changed.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`[taskmark sync] cloud https://cloud.taskmark.dev
[taskmark sync] My project (my-project) — 42 local file(s), 1 changed, 0 removed
[taskmark sync] building board snapshot
[taskmark sync] uploading 1 file(s)
[taskmark sync] done — board version 2`}
        </pre>

        <h3 id="troubleshooting">Troubleshooting</h3>
        <ul>
          <li>
            <strong>Sync is not configured:</strong> check that{" "}
            <code>.config</code> is at the board root and the token begins with{" "}
            <code>tmk_</code>.
          </li>
          <li>
            <strong>Token rejected:</strong> copy the current token from Cloud
            Settings. If an owner rotated it, update every local clone.
          </li>
          <li>
            <strong>Wrong Cloud project:</strong> the token chooses the
            destination. Replace it with the token from the intended project.
          </li>
        </ul>

        <h2 id="what-gets-pushed">What gets pushed</h2>
        <p>
          Sync uploads board markdown (epics, stories, tasks, bugs) and related
          board files, then a snapshot Cloud uses to render the same UI. The{" "}
          <code>.config</code> file itself is not sent as a board file, so the
          token is not echoed back through the snapshot.
        </p>
        <p>
          Rotate the token in Cloud Settings if it leaks. Every local board must
          put the new value in <code>.config</code> before it can sync again.
        </p>

        <h2 id="local-ui">Open the local board</h2>
        <p>
          Connecting Cloud does not replace the local board UI. After{" "}
          <Link href="/docs/setup">setup</Link>, run the CLI from the board
          folder as usual.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`# inside a board folder
npx taskmark serve
npx taskmark dev`}
        </pre>
        <p>
          Next: <Link href="/docs/setup">Setup</Link> if you still need a local
          board, or <Link href="/docs/commands">Commands</Link> for the daily
          plan/do/commit loop.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
