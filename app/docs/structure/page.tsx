import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Folder structure",
  description:
    "Taskmark board layout for single-repo and multi-repo workspaces, plus epic/story/task file conventions.",
}

export default function DocsStructurePage() {
  return (
    <DocsShell currentPath="/docs/structure">
      <DocsTitle
        eyebrow="Structure"
        title="Board folder structure"
        lead="Where the board lives depends on how many git roots are in the workspace."
      />
      <DocsProse>
        <h2 id="single-repo">Single git project</h2>
        <p>
          Board under the product repo at <code>&lt;project&gt;/taskmark/</code>:
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`my-app/
└── taskmark/
    ├── README.md
    ├── INDEX.md
    ├── SIZING.md
    ├── VELOCITY.md
    ├── REPOS.md
    └── epics/
        └── E-001-user-auth/
            ├── epic.md
            └── stories/
                └── S-001-login/
                    ├── story.md
                    └── items/
                        ├── T-001-api.md
                        └── B-001-token.md`}
        </pre>

        <h2 id="multi-repo">Multiple git projects</h2>
        <p>
          Dedicated sibling <code>&lt;common&gt;-taskmark</code> —{" "}
          <strong>repo root is the board</strong> (no nested{" "}
          <code>taskmark/</code>). Product repos stay clean;{" "}
          <code>REPOS.md</code> lists board + product roots.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`acme-taskmark/
├── README.md
├── INDEX.md
├── SIZING.md
├── VELOCITY.md
├── REPOS.md
├── epics/
└── .git/`}
        </pre>
        <p>
          Run <code>/sync-repos</code> after layout changes. Never copy the board
          into every product repo.
        </p>

        <h2 id="ids-and-files">IDs and file conventions</h2>
        <ul>
          <li>
            IDs: <code>E-NNN</code>, <code>S-NNN</code>, <code>T-NNN</code>,{" "}
            <code>B-NNN</code> (zero-padded, unique board-wide)
          </li>
          <li>
            Folder slug: <code>{"{id}-{kebab-title}"}</code>
          </li>
          <li>
            Tasks/bugs live under a story’s <code>items/</code> or an epic’s{" "}
            <code>items/</code> (epic-direct — no story required)
          </li>
          <li>
            Required sections: acceptance criteria, Work log, Commits; Prompt
            &amp; feedback on stories/tasks/bugs
          </li>
        </ul>

        <h2 id="general">General epic</h2>
        <p>
          Unscoped work soft-attaches to the reserved <strong>General</strong>{" "}
          epic when no better parent is clear. Prefer contextual attach when an
          epic or story is named.
        </p>
        <p>
          Related: <Link href="/docs/specification">File specification</Link>{" "}
          (frontmatter and section templates),{" "}
          <Link href="/docs/workflows">Workflows</Link>,{" "}
          <Link href="/docs/sizing">Sizing</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
