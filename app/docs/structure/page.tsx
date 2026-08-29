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
    ├── .gitignore      # ignores REPOS.md
    ├── REPOS.md        # local only — generated, not committed
    └── epics/
        └── E-MM-k7m2p9b3-user-auth/
            ├── epic.md
            └── stories/
                └── S-MM-n4q8w1a2-login/
                    ├── story.md
                    └── items/
                        ├── T-MM-a8f31c2d-api.md
                        └── B-MM-f8h1j4c5-token.md`}
        </pre>

        <h2 id="multi-repo">Multiple git projects</h2>
        <p>
          Dedicated sibling <code>&lt;common&gt;-taskmark</code> —{" "}
          <strong>repo root is the board</strong> (no nested{" "}
          <code>taskmark/</code>). Product repos stay clean.
        </p>
        <pre className="overflow-x-auto border-2 border-border bg-card p-4 font-mono text-sm text-foreground shadow-sm">
          {`acme-taskmark/
├── .gitignore
├── REPOS.md        # local only
├── epics/
└── .git/`}
        </pre>
        <p>
          Never copy the board into every product repo.{" "}
          <code>/tkmd-init</code> (and local generation) refresh{" "}
          <code>REPOS.md</code> on this machine.
        </p>

        <h2 id="what-is-not-in-git">What is not in git</h2>
        <p>
          The UI scans <code>epics/</code>. Committed boards do not include a
          generated index, sizing seed file, velocity file, or board README.{" "}
          <code>CHANGELOG.md</code> at the board root is optional and is written
          only by <code>/tkmd-changelog</code> and <code>/tkmd-version</code>
          — not into the README. <code>REPOS.md</code> is gitignored because it
          contains absolute local paths.
        </p>

        <h2 id="ids-and-files">IDs and file conventions</h2>
        <ul>
          <li>
            IDs keep a type prefix <code>E</code>, <code>S</code>,{" "}
            <code>T</code>, or <code>B</code> plus a collision-resistant token
            (not a global sequential counter). Historical sequential IDs such as{" "}
            <code>T-001</code> remain valid
          </li>
          <li>
            Folder slug: <code>{"{id}-{kebab-title}"}</code>
          </li>
          <li>
            Tasks/bugs live under a story’s <code>items/</code> or an epic’s{" "}
            <code>items/</code> (epic-direct — no story required)
          </li>
          <li>
            Plan and do write only new or target leaf files. Parent child
            lists, status, points, people, dates, and logs are derived in the UI
            at read time
          </li>
        </ul>

        <h2 id="hierarchy-fit">Hierarchy fit</h2>
        <p>
          <code>/tkmd-plan</code> searches open and done work first. New tasks
          and bugs attach explicitly under the best-fitting existing story or
          epic; new stories attach under a fitting epic. A new epic is created
          only for a distinct initiative that fits nowhere else.
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
