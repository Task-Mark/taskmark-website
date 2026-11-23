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
    "Taskmark Cursor slash commands (/tkmd-init, /tkmd-verify, /tkmd-plan, /tkmd-save, /tkmd-save-do, /tkmd-plan-do, /tkmd-do, /tkmd-changelog, /tkmd-version, /tkmd-reportme, /tkmd-commit) and the taskmark CLI (init, reconcile, secret rotate, requests regroup, migrate, stages, hooks install, app, ai).",
}

export default function DocsCommandsPage() {
  return (
    <DocsShell currentPath="/docs/commands">
      <DocsTitle
        eyebrow="Commands"
        title="Commands reference"
        lead="Slash commands of the Cursor plugin, and the taskmark CLI that works with any editor. /tkmd-commit is the only slash command that commits."
      />
      <DocsProse>
        <p>
          The slash commands come with the optional Cursor plugin. Other
          agents work from the board with a short project instruction instead:
          see <Link href="/docs/agents">Use Taskmark with any AI agent</Link>.
          No command changes an existing item: status, commits, work logs, and
          stages are written by the{" "}
          <Link href="/docs/app">GitHub and Bitbucket App</Link>.
        </p>
        <h2 id="index">Slash commands index</h2>
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
          Hands over to <Link href="/docs/get-started">npx taskmark init</Link>
          : the agent runs it in your terminal and you answer its questions
          there (board location, GitHub or Bitbucket, the AI key, the agent
          instructions). Keys are typed at the CLI&apos;s hidden prompt, never
          in the chat. Only when npm or npx is not available does it write the
          request board scaffold by hand.
        </p>
        <ul>
          <li>
            <strong>Single git project:</strong> the board lives at{" "}
            <code>&lt;project&gt;/taskmark/</code>.{" "}
            <strong>Multiple git projects:</strong> a sibling{" "}
            <code>&lt;common&gt;-taskmark</code> repository is the board root
          </li>
          <li>
            Running it again is the repair path: init keeps what is configured
            and fills what is missing
          </li>
        </ul>

        <h2 id="tkmd-verify">/tkmd-verify</h2>
        <p>
          Migrates an existing board to the current Taskmark layout.{" "}
          <code>/tkmd-init</code> is first create or light repair;{" "}
          <code>/tkmd-verify</code> is for boards that still have leftover
          generated files or legacy item markdown. It{" "}
          <strong>never commits</strong>.
        </p>
        <ul>
          <li>
            Locates the canonical board, then repairs UI stubs, gitignore
            (including <code>REPOS.md</code> and <code>.reports/</code>),{" "}
            <code>@taskmark/ui</code>, and the static project README using the
            same overwrite rules as init
          </li>
          <li>
            Deletes leftover generated files at the board root (
            <code>INDEX.md</code>, <code>SIZING.md</code>,{" "}
            <code>VELOCITY.md</code>, shared ID counters) and a nested generated
            dashboard README after the static README is in the right place
          </li>
          <li>
            Strips retired frontmatter and parent child lists. It is
            maintainer-only and the only command that rewrites existing item
            files, and it never touches status, dates, resolvers, criteria,
            or Prompt &amp; feedback, Commits, and Work log rows, on leaves or
            parents
          </li>
          <li>
            Extra <code>taskmark/</code> copies in product repos are reported,
            not deleted, unless they are clearly generated duplicates
          </li>
          <li>
            Does not create <code>INDEX.md</code>, <code>SIZING.md</code>,{" "}
            <code>VELOCITY.md</code>, or <code>CHANGELOG.md</code>
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
            If exact or overlapping work exists, creates nothing, reports the
            match, and suggests <code>/tkmd-do</code> on it (for open work or a
            follow-up on done work)
          </li>
          <li>
            Fits tasks/bugs under an existing story or epic, stories under an
            existing epic, and creates a new epic only for a distinct initiative
            that fits nowhere
          </li>
          <li>
            On a request board, writes under{" "}
            <code>requests/&lt;slug&gt;/epics/</code> of the request the work
            serves, or creates a new <code>requests/&lt;slug&gt;/</code> with a{" "}
            <code>brief.md</code> when no request fits. On a legacy board
            without <code>requests/</code>, it keeps writing under{" "}
            <code>epics/</code>
          </li>
          <li>
            Writes <strong>only new item files</strong> (including any new
            parent files in the plan). It never changes an existing epic,
            story, task, or bug. Once written, new items are read-only like any
            other
          </li>
          <li>
            Leaves the Commits and Work log tables of new tasks empty; the App
            fills them
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
            Uses the same search, dedupe, hierarchy, new-files-only, and{" "}
            <code>requests/</code> placement rules as <code>/tkmd-plan</code>,
            and leaves the log tables empty
          </li>
          <li>
            Prefer this after Plan mode instead of retyping the plan as prose
            for <code>/tkmd-plan</code>
          </li>
          <li>
            Then implement with <code>/tkmd-do</code>, or use{" "}
            <code>/tkmd-save-do</code> when you want save-from-plan and
            implementation in one step
          </li>
        </ul>

        <h2 id="tkmd-save-do">/tkmd-save-do</h2>
        <p>
          Saves like <code>/tkmd-save</code>, then implements the newly created
          items like <code>/tkmd-do</code>. It is not a replacement for
          save-only or do-later. It <strong>never commits</strong>.
        </p>
        <ul>
          <li>
            If save creates nothing (exact or overlapping match),
            implementation is skipped and the match is reported
          </li>
          <li>
            If a new epic or story was created, implements that highest new
            parent; otherwise implements each newly created leaf
          </li>
          <li>
            The implementation follows <code>/tkmd-do</code>: it works on a
            branch named after the new item id (the highest new parent when
            several items were created) and changes no board file, not even the
            items it just created. The App marks them done after the work is
            merged
          </li>
          <li>
            Use <code>/tkmd-save</code> when you want to review the board items
            before implementing
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
            The implementation follows <code>/tkmd-do</code>: it works on a
            branch named after the new item id (the highest new parent when
            several items were created) and changes no board file, not even the
            items it just created. The App marks them done after the work is
            merged
          </li>
          <li>
            Use <code>/tkmd-plan</code> when you want to review the board items
            before implementing
          </li>
        </ul>

        <h2 id="tkmd-do">/tkmd-do</h2>
        <p>
          Implements a board item, using it as the spec: the request brief,
          the item description, and its acceptance or fix criteria. It{" "}
          <strong>never edits the board</strong> and{" "}
          <strong>never commits or pushes</strong>. The App marks the item done
          when the work is merged and CI passes.
        </p>
        <ul>
          <li>
            Accepts an id, a markdown path, or an unambiguous title
          </li>
          <li>
            Before changing code in each repository, switches to a branch whose
            name contains the item id: it stays on the current branch if the
            name already has the id, otherwise it creates{" "}
            <code>&lt;id&gt;-&lt;short-slug&gt;</code>, for example{" "}
            <code>T-MM-457b0290-login-mockup</code>. For a story or epic target
            it uses that story or epic id
          </li>
          <li>
            A story or epic target makes every open, non-cancelled, non-shelved
            descendant task or bug mandatory scope
          </li>
          <li>
            A target that is already done is treated as a follow-up: it just
            implements, and logs nothing on the item
          </li>
          <li>
            Never changes status, dates, resolvers, checkboxes, or any log
            table, and never creates items. If nothing fits, it suggests{" "}
            <code>/tkmd-plan-do</code> or <code>/tkmd-plan</code>
          </li>
          <li>
            Commits must keep the id in the branch name or the message.{" "}
            <Link href="#cli-hooks">
              <code>npx taskmark hooks install</code>
            </Link>{" "}
            adds a <code>Task: &lt;id&gt;</code> trailer automatically. Use{" "}
            <Link href="#tkmd-commit">/tkmd-commit</Link> when you want git
            commits
          </li>
        </ul>
        <p>
          <code>/tkmd-shelf</code> was removed in 2.0. To drop work that will
          never be implemented, set <code>status: shelved</code> on the item
          by hand (see{" "}
          <Link href="/docs/specification#hand-edit-vs-derived">
            what to edit by hand
          </Link>
          ).
        </p>

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
            The App records the commits on the matching task after you push.
            On a task branch, the git hook adds the <code>Task:</code> trailer
          </li>
        </ul>

        <h2 id="cli">CLI commands</h2>
        <p>
          The <code>taskmark</code> CLI ships with <code>@taskmark/ui</code>{" "}
          and works with any editor. Besides <code>serve</code>,{" "}
          <code>dev</code>, <code>build</code>, <code>sync</code>, and{" "}
          <code>preview</code> (see <Link href="/docs/setup">Setup</Link> and{" "}
          <Link href="/docs/cloud">Cloud</Link>), it has these commands.
          Run them from the board folder or pass <code>--board &lt;path&gt;</code>.
          Where <code>@taskmark/ui</code> is not installed yet, use{" "}
          <code>npx @taskmark/ui</code> in place of <code>npx taskmark</code>.
        </p>

        <h3 id="cli-init">
          <code>npx taskmark init</code>
        </h3>
        <p>
          Sets up the project step by step: board, Taskmark Cloud project (id
          and secret, no account), GitHub or Bitbucket App, AI key, commit
          hook, agent instructions, migration, and the first reconciliation.
          Run it again to change any answer. See{" "}
          <Link href="/docs/get-started">Get started</Link>.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark init
npx taskmark init --yes --provider github|bitbucket --ai anthropic|openai [options]`}
        </pre>
        <p>
          <code>--yes</code> (or <code>-y</code>) asks nothing and is required
          without a terminal. The AI key is read from{" "}
          <code>TASKMARK_AI_KEY</code>. Other options:{" "}
          <code>--repo &lt;owner&gt;/&lt;repo&gt;</code> (repeatable),{" "}
          <code>--board-repo &lt;provider&gt;:&lt;owner&gt;/&lt;repo&gt;[@branch][:root]</code>
          , <code>--model &lt;id&gt;</code>,{" "}
          <code>--language &lt;name&gt;</code>, <code>--skip-backfill</code>,{" "}
          <code>--last &lt;n&gt;</code> (commits per stage branch, default 30,
          up to 200), <code>--board &lt;path&gt;</code>, and{" "}
          <code>--no-open</code>. See{" "}
          <Link href="/docs/get-started#ci">Without questions (CI)</Link>.
        </p>

        <h3 id="cli-reconcile">
          <code>npx taskmark reconcile</code>
        </h3>
        <p>
          Has the App read the recent commits of each stage branch, shows the
          tasks in development, in quality, and shipped, applies the links and
          stage moves, and lets you review the proposed closes and new tasks
          (accept all, choose, or leave them in the review inbox).
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark reconcile [--last <n>] [--branch <name>]... [--board <path>]`}
        </pre>
        <p>
          <code>--last</code> is the number of commits per stage branch
          (default 30, up to 200). <code>--branch</code> limits the run to
          these stage branches (repeatable). See{" "}
          <Link href="/docs/get-started#results">reconciliation results</Link>.
        </p>

        <h3 id="cli-secret">
          <code>npx taskmark secret rotate</code>
        </h3>
        <p>
          Generates a new project secret, registers it on Taskmark Cloud, and
          saves it in the board <code>.config</code>. The old secret stops
          working at once; share the new <code>.config</code> with your team
          privately. <code>--board &lt;path&gt;</code> picks the board.
        </p>

        <h3 id="cli-regroup">
          <code>npx taskmark requests regroup</code>
        </h3>
        <p>
          After a migration, the project&apos;s AI (its own key) proposes
          merging related requests. You accept all, choose one by one, or
          skip; the CLI moves the folders, keeps the old request ids as
          aliases, and commits after you confirm. See{" "}
          <Link href="/docs/requests#regroup">Request boards</Link>.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark requests regroup [--dry-run] [--yes] [--board <path>]`}
        </pre>
        <p>
          <code>--dry-run</code> shows the plan and writes nothing.{" "}
          <code>--yes</code> asks nothing, accepts the proposals that are at
          least 80% confident, and commits.
        </p>

        <h3 id="cli-migrate">
          <code>npx taskmark migrate</code>
        </h3>
        <p>
          Moves a legacy <code>epics/</code> board to <code>requests/</code>,
          one request per epic. <code>--dry-run</code> shows what would change
          without writing. See{" "}
          <Link href="/docs/requests#migrate">Request boards</Link>.
        </p>

        <h3 id="cli-stages">
          <code>npx taskmark stages</code>
        </h3>
        <p>
          Reads the stage branches (<code>develop</code>, <code>quality</code>,{" "}
          <code>main</code> and their aliases) in your local clones of the code
          repositories and shows the stage each task has reached.{" "}
          <strong>It only shows stages and writes nothing</strong>: the App
          writes stages to the board.
        </p>
        <ul>
          <li>
            Code repositories come from <code>--repo &lt;path&gt;</code>{" "}
            (repeatable), else <code>&quot;taskmark&quot;: {"{"} &quot;repos&quot;: [...] {"}"}</code>{" "}
            in the board <code>package.json</code>, else <code>REPOS.md</code>
          </li>
          <li>
            Branch names can be set in the board <code>package.json</code>{" "}
            under <code>taskmark.branches</code> (<code>development</code>,{" "}
            <code>testing</code>, <code>production</code>)
          </li>
          <li>
            <code>--fetch</code> fetches the repositories first;{" "}
            <code>--quiet</code> prints nothing unless something fails
          </li>
        </ul>

        <h3 id="cli-hooks">
          <code>npx taskmark hooks install</code>
        </h3>
        <p>
          Installs one git hook, <code>prepare-commit-msg</code>, in each code
          repository (the same repository list as <code>stages</code>, or{" "}
          <code>--repo &lt;path&gt;</code>). When the branch name carries a
          task id and the commit message does not mention it yet, the hook
          appends <code>Task: &lt;id&gt;</code>. It skips merge commits, never
          writes to the board, and leaves a hook that Taskmark did not write
          alone. Installing again removes the <code>post-merge</code> hook
          older versions added.
        </p>

        <h3 id="cli-app">
          <code>npx taskmark app</code>
        </h3>
        <p>
          Changes the connection <code>npx taskmark init</code> made to the{" "}
          <Link href="/docs/app">GitHub and Bitbucket App</Link>, using the
          project secret in <code>.config</code>:
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark app status
npx taskmark app connect github|bitbucket [--repo <owner>/<repo>]... [--board-repo <provider>:<owner>/<repo>[@branch][:root]] [--mode shadow|write] [--no-open]
npx taskmark app mode shadow|write
npx taskmark app enable
npx taskmark app disable`}
        </pre>
        <p>
          <code>connect</code> saves the code and board repositories, then
          opens the GitHub App install page or the Bitbucket authorization
          page. By default the code repositories are the board&apos;s repos (
          <code>taskmark.repos</code>, else <code>REPOS.md</code>) on that
          provider, the board repository is the board&apos;s own git origin,
          and a new connection starts in write mode. See{" "}
          <Link href="/docs/app-setup#connect">Set up the App</Link>.
        </p>

        <h3 id="cli-ai">
          <code>npx taskmark ai</code>
        </h3>
        <p>
          Changes the project&apos;s own AI key for the App, using the project
          secret in <code>.config</code>:
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`npx taskmark ai set --provider anthropic|openai [--model <id>] [--key <key>] [--base-url <url>]
npx taskmark ai status
npx taskmark ai clear`}
        </pre>
        <p>
          Without <code>--key</code>, the key is read from{" "}
          <code>TASKMARK_AI_KEY</code> or typed at a hidden prompt.{" "}
          <code>status</code> shows the provider, the model, and the last four
          characters of the key; <code>clear</code> removes it, and the App
          falls back to the server default. Default models are{" "}
          <code>claude-opus-5-5</code> for Claude and <code>gpt-4o-mini</code>{" "}
          for OpenAI. See{" "}
          <Link href="/docs/app-setup#ai-key">Set up the App</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
