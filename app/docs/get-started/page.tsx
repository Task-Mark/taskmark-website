import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Get started",
  description:
    "Set up Taskmark with one command: npx taskmark init creates the board, registers the project without an account, connects the GitHub or Bitbucket App, saves the AI key, installs the commit hook, writes the agent instructions, and reconciles an existing project.",
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm whitespace-pre">
      {children}
    </pre>
  )
}

type Row = { what: React.ReactNode; detail: React.ReactNode }

const QUESTIONS: Row[] = [
  {
    what: <>Code repositories</>,
    detail: (
      <>
        Only when it finds several git repositories next to each other: which
        ones belong to this project
      </>
    ),
  },
  {
    what: <>Board location</>,
    detail: (
      <>
        <code>&lt;project&gt;/taskmark/</code> inside the code repository for
        one repository, or a sibling <code>&lt;common&gt;-taskmark</code>{" "}
        repository for several (inside one of the code repos, or another
        folder, are also offered). An existing board is kept where it is
      </>
    ),
  },
  {
    what: <>Board writing language</>,
    detail: (
      <>
        Any language, default English. Saved as{" "}
        <code>taskmark.writingLanguage</code>
      </>
    ),
  },
  {
    what: <>GitHub or Bitbucket</>,
    detail: (
      <>
        Where the code is, then which code repositories to connect, then a
        check of the board repository (the board&apos;s git{" "}
        <code>origin</code>). If the board has no remote yet, init tells you
        how to push it and waits
      </>
    ),
  },
  {
    what: <>Install or authorize the App</>,
    detail: (
      <>
        Opens the GitHub App install page or the Bitbucket authorization page
        in your browser and waits (up to 10 minutes) until it is done
      </>
    ),
  },
  {
    what: <>Claude or OpenAI, and the key</>,
    detail: (
      <>
        The AI the App uses to reconcile the board, the model (default{" "}
        <code>claude-opus-5-5</code> or <code>gpt-4o-mini</code>), and the key
        at a hidden prompt (or from <code>TASKMARK_AI_KEY</code>). Taskmark
        Cloud checks the key with the provider before saving it
      </>
    ),
  },
  {
    what: <>Agent instructions</>,
    detail: (
      <>
        Shows the Taskmark section for <code>AGENTS.md</code> and{" "}
        <code>CLAUDE.md</code> of each connected code repository and asks
        before writing it
      </>
    ),
  },
  {
    what: <>Existing project only</>,
    detail: (
      <>
        Whether to migrate a legacy <code>epics/</code> board, and whether to
        run the first reconciliation
      </>
    ),
  },
]

const WRITES: Row[] = [
  {
    what: <>Board scaffold</>,
    detail: (
      <>
        <code>requests/</code>, <code>meetings/</code>,{" "}
        <code>package.json</code> (with <code>@taskmark/ui</code>, scripts,
        and the <code>taskmark</code> block with <code>writingLanguage</code>{" "}
        and <code>repos</code>), and <code>.gitignore</code>. Existing files
        are never overwritten: <code>package.json</code> and{" "}
        <code>.gitignore</code> only get missing fields and lines, after you
        confirm. A board folder that is not in git yet becomes its own
        repository with a first commit
      </>
    ),
  },
  {
    what: (
      <>
        <code>.config</code>
      </>
    ),
    detail: (
      <>
        The project secret, as <code>TASKMARK_SYNC_TOKEN=tmk_...</code>.
        Created with file mode 600, and git ignores it
      </>
    ),
  },
  {
    what: (
      <>
        <code>taskmark.projectId</code>
      </>
    ),
    detail: (
      <>
        The project id from Taskmark Cloud, in the board{" "}
        <code>package.json</code>. It is not secret and is committed
      </>
    ),
  },
  {
    what: <>Commit hook</>,
    detail: (
      <>
        <code>prepare-commit-msg</code> in the local clone of each connected
        code repository. It adds <code>Task: &lt;id&gt;</code> to commits made
        on a task branch. A hook you wrote yourself is left alone
      </>
    ),
  },
  {
    what: <>Agent instructions</>,
    detail: (
      <>
        The Taskmark section in <code>AGENTS.md</code> and{" "}
        <code>CLAUDE.md</code> of each connected code repository, between{" "}
        <code>&lt;!-- taskmark:begin --&gt;</code> and{" "}
        <code>&lt;!-- taskmark:end --&gt;</code>. When <code>CLAUDE.md</code>{" "}
        already imports <code>@AGENTS.md</code>, only <code>AGENTS.md</code>{" "}
        is written. Left uncommitted. See{" "}
        <Link href="/docs/agents#snippet">Any AI agent</Link>
      </>
    ),
  },
]

export default function DocsGetStartedPage() {
  return (
    <DocsShell currentPath="/docs/get-started">
      <DocsTitle
        eyebrow="Get started"
        title="Set up a project with npx taskmark init"
        lead="One command sets up everything: the board, the project on Taskmark Cloud, the GitHub or Bitbucket App, the AI key, the commit hook, and the instructions for your coding agents. No Taskmark account needed."
      />
      <DocsProse>
        <h2 id="run">Run it</h2>
        <p>
          From the product repository, or from the folder that holds the
          project&apos;s repositories side by side:
        </p>
        <CodeBlock>{`npx taskmark init`}</CodeBlock>
        <p>
          When <code>@taskmark/ui</code> is not installed in that folder yet,
          run <code>npx @taskmark/ui init</code> instead. It is the same
          command; the bare <code>taskmark</code> name on npm belongs to a
          different package.
        </p>
        <p>
          It asks one question at a time and writes each step&apos;s files as
          soon as that step is done. Stop at any point (Ctrl+C) and run it
          again later: finished steps are kept.
        </p>

        <h2 id="questions">What it asks</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Question</th>
                <th className="px-3 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {QUESTIONS.map((row, i) => (
                <tr key={i} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2 text-foreground">{row.what}</td>
                  <td className="px-3 py-2">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          A new connection starts in <strong>write mode</strong>: the App
          updates the board on every push. To have it only propose changes
          first, run <code>npx taskmark app mode shadow</code>. See{" "}
          <Link href="/docs/app#modes">shadow and write mode</Link>.
        </p>

        <h2 id="writes">What it writes</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">File</th>
                <th className="px-3 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {WRITES.map((row, i) => (
                <tr key={i} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2 text-foreground">{row.what}</td>
                  <td className="px-3 py-2">{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          At the end it syncs the board to Taskmark Cloud and prints a summary
          of what is configured and the command to change each part. If the
          board has no <code>node_modules</code> yet, run{" "}
          <code>npm install</code> in the board folder, then{" "}
          <code>npx taskmark</code> to open it.
        </p>

        <h2 id="no-account">No Taskmark account needed</h2>
        <p>
          A project is an <strong>id and a secret</strong>. Init generates the
          secret on your machine, registers the project on Taskmark Cloud with
          it, and keeps it in the board <code>.config</code>. The server only
          stores a hash of it. Every CLI command that talks to Taskmark Cloud (
          <code>sync</code>, <code>app</code>, <code>ai</code>,{" "}
          <code>reconcile</code>) reads it from there.
        </p>
        <ul>
          <li>
            <strong>Keep the secret out of git.</strong> Init adds{" "}
            <code>.config</code> to the board <code>.gitignore</code>. Anyone
            with the secret can change the project
          </li>
          <li>
            <strong>Share it privately</strong> with the teammates who change
            the configuration (App, AI key, reconciliation). People who only
            read the board and push code do not need it
          </li>
          <li>
            <strong>Rotate it</strong> if it leaks, or when someone leaves:
            <CodeBlock>{`npx taskmark secret rotate`}</CodeBlock>
            The new secret replaces the old one in <code>.config</code> and the
            old one stops working at once. Share the new <code>.config</code>{" "}
            with your team
          </li>
          <li>
            <strong>Lost it?</strong> Taskmark Cloud can replace the secret for
            someone who proves, by signing in with GitHub or Bitbucket, that
            they can write to one of the project&apos;s connected repositories
            (a code repository or the board repository). The CLI has no command
            for this yet
          </li>
        </ul>
        <p>
          Taskmark Cloud accepts 5 new projects per hour from one network. A
          project that has neither synced a board file nor connected a code
          repository 7 days after registration is removed.
        </p>

        <h2 id="existing">Existing projects</h2>
        <p>On a project that already has a board, init also:</p>
        <ol>
          <li>
            <strong>Migrates a legacy board.</strong> If the board still has{" "}
            <code>epics/</code>, it shows a preview (each epic and the request
            it becomes) and, after you confirm, moves it to{" "}
            <code>requests/</code> and commits it in the board repository. See{" "}
            <Link href="/docs/requests#migrate">Request boards</Link>
          </li>
          <li>
            <strong>Regroups related requests.</strong> Migration makes one
            request per epic. Right after a migration (or on a board with more
            than 8 requests), init offers to have the project&apos;s AI propose
            which requests belong together. You accept or skip each proposal,
            and the merge is committed. Run it later with{" "}
            <code>npx taskmark requests regroup</code>. See{" "}
            <Link href="/docs/requests#regroup">regroup requests</Link>
          </li>
          <li>
            <strong>Runs the first reconciliation.</strong> The App reads the
            last 30 commits of each stage branch (<code>develop</code>,{" "}
            <code>quality</code>, <code>main</code>, and their aliases) of every
            connected code repository and works out where each task is
          </li>
        </ol>

        <h3 id="results">Reconciliation results</h3>
        <p>
          The results come in three blocks, each task with the branches it was
          found on:
        </p>
        <CodeBlock>{`In development (2)
  T-MM-1a2b3c4d  Search filters  (develop)
  ...
In quality (1)
  T-MM-457b0290  Login mockup  (develop, quality)
Shipped (14)
  ...`}</CodeBlock>
        <ul>
          <li>
            <strong>Applied without asking:</strong> links (commits and work
            log rows on the tasks the commits name) and stage moves. These are
            facts read from the commits
          </li>
          <li>
            <strong>Reviewed by you:</strong> proposed closes and new tasks.
            Accept all, choose one by one, or leave them for later in the{" "}
            <Link href="/docs/app#review-inbox">review inbox</Link> (the
            default)
          </li>
        </ul>
        <p>
          Everything is written to the board repository in one bot commit.
          Commits are grouped by merged pull request. With the project&apos;s
          own AI key, the most recent groups (up to 60) are also matched by
          content; without one, only task ids in branches, pull requests, and
          commits are used. The reconciliation never comments on pull requests
          or commits.
        </p>
        <p>Run it again at any time, for example after a busy week:</p>
        <CodeBlock>{`npx taskmark reconcile                     # last 30 commits per stage branch
npx taskmark reconcile --last 100          # up to 200
npx taskmark reconcile --branch quality    # only these stage branches (repeatable)`}</CodeBlock>

        <h2 id="rerun">Change an answer</h2>
        <p>
          Run <code>npx taskmark init</code> again. It finds the board and the
          project, keeps the secret, and offers your current answers as
          defaults: a different provider or set of repositories, a new AI key
          (or keep the saved one), the agent instructions updated to the
          current text. Parts that did not change are skipped. If the secret in{" "}
          <code>.config</code> is rejected, init registers the project again.
        </p>
        <p>Each part also has its own command:</p>
        <CodeBlock>{`npx taskmark app connect github|bitbucket   # repositories, board repository
npx taskmark app mode shadow|write
npx taskmark ai set --provider anthropic|openai
npx taskmark hooks install
npx taskmark secret rotate`}</CodeBlock>

        <h2 id="ci">Without questions (CI)</h2>
        <p>
          With <code>--yes</code>, init asks nothing and takes the answers as
          flags. Without a terminal, <code>--yes</code> is required.{" "}
          <code>--provider</code> and <code>--ai</code> are required
          unless the project already has them, and the AI key is read from{" "}
          <code>TASKMARK_AI_KEY</code>:
        </p>
        <CodeBlock>{`TASKMARK_AI_KEY=sk-ant-... npx taskmark init --yes \\
  --provider github --ai anthropic \\
  --repo acme/api --repo acme/web \\
  --board-repo github:acme/acme-taskmark@main`}</CodeBlock>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Flag</th>
                <th className="px-3 py-2">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--yes, -y", "No questions"],
                ["--provider github|bitbucket", "Git provider of the code repositories"],
                ["--repo <owner>/<repo>", "Code repository to connect (repeatable). Default: the detected repositories on that provider"],
                ["--board-repo <provider>:<owner>/<repo>[@branch][:root]", "Where the board lives. Default: the board's git origin"],
                ["--ai anthropic|openai", "AI provider; the key comes from TASKMARK_AI_KEY"],
                ["--model <id>", "AI model (needs --ai). Default: claude-opus-5-5 or gpt-4o-mini"],
                ["--language <name>", "Board writing language. Default: English"],
                ["--skip-backfill", "Skip the first reconciliation"],
                ["--last <n>", "Commits to read per stage branch (default 30, up to 200)"],
                ["--board <path>", "Board folder. Default: detected"],
                ["--no-open", "Print links instead of opening the browser"],
              ].map(([flag, meaning]) => (
                <tr key={flag} className="border-b border-border/60 align-top">
                  <td className="px-3 py-2 text-foreground">
                    <code>{flag}</code>
                  </td>
                  <td className="px-3 py-2">{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Every other question takes its default: the scaffold is updated, the
          agent instructions are written, a legacy board is migrated, the
          first reconciliation runs (unless <code>--skip-backfill</code>), and
          its proposals wait in the review inbox. Regrouping is skipped; run{" "}
          <code>npx taskmark requests regroup --yes</code> for it.
        </p>
        <p>
          The App still has to be installed (GitHub) or authorized (Bitbucket)
          in a browser once. Until then, init waits up to 10 minutes and exits
          with an error. <code>npx taskmark init --help</code> lists every
          option.
        </p>
        <p>
          Next: <Link href="/docs/agents">Any AI agent</Link> for how agents
          work from the board, and{" "}
          <Link href="/docs/app">GitHub and Bitbucket App</Link> for what
          happens on each push.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
