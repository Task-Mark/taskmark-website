import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Install Taskmark for Cursor, initialize a board, and use the core slash commands.",
}

export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:py-16">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Documentation
      </p>
      <h1 className="mt-2 font-head text-4xl tracking-tight sm:text-5xl">
        Get started with Taskmark
      </h1>
      <p className="mt-4 text-base text-muted-foreground sm:text-lg">
        Taskmark is a Cursor plugin for hierarchical product planning as
        markdown: epics → stories → tasks/bugs under a board in your
        project(s).
      </p>

      <section id="install" className="scroll-mt-28 mt-12 space-y-4">
        <h2 className="font-head text-2xl tracking-tight sm:text-3xl">
          Install
        </h2>
        <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>
            Open <strong className="text-foreground">Customize → Plugins</strong>.
          </li>
          <li>
            Remove any broken <strong className="text-foreground">taskmark</strong>{" "}
            entry first.
          </li>
          <li>
            <strong className="text-foreground">Add local</strong> → select the{" "}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm text-foreground">
              taskmark-cursor
            </code>{" "}
            repo root (folder with{" "}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm text-foreground">
              .cursor-plugin/marketplace.json
            </code>
            ).
          </li>
          <li>
            Enable <strong className="text-foreground">taskmark</strong>, then{" "}
            <strong className="text-foreground">Developer: Reload Window</strong>.
          </li>
        </ol>
        <p className="text-sm text-muted-foreground">
          For local development copies, use the plugin{" "}
          <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-foreground">
            rsync-plugin-local.sh
          </code>{" "}
          script (Cursor rejects external symlinks).
        </p>
      </section>

      <section id="quick-start" className="scroll-mt-28 mt-12 space-y-4">
        <h2 className="font-head text-2xl tracking-tight sm:text-3xl">
          Quick start
        </h2>
        <ol className="list-decimal space-y-3 pl-5 text-muted-foreground">
          <li>Install the plugin.</li>
          <li>
            Run <strong className="text-foreground">taskmark-init</strong> in a
            product repo.
          </li>
          <li>
            Multi-git workspaces: run{" "}
            <strong className="text-foreground">/sync-repos</strong>.
          </li>
          <li>
            Create work with{" "}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm text-foreground">
              /new-epic
            </code>
            ,{" "}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm text-foreground">
              /new-story
            </code>
            ,{" "}
            <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm text-foreground">
              /new-task
            </code>
            .
          </li>
        </ol>
      </section>

      <section id="commands" className="scroll-mt-28 mt-12 space-y-4">
        <h2 className="font-head text-2xl tracking-tight sm:text-3xl">
          Core commands
        </h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <code className="text-foreground">/start-work</code> — open a billable
            session
          </li>
          <li>
            <code className="text-foreground">/complete-work</code> — close session
            + actual minutes
          </li>
          <li>
            <code className="text-foreground">/sync-status</code> — status, actuals,
            INDEX
          </li>
          <li>
            <code className="text-foreground">/velocity</code> — team speed / ETA
          </li>
          <li>
            <code className="text-foreground">/board-status</code> — board overview
          </li>
        </ul>
      </section>

      <div className="mt-14 flex flex-wrap gap-3 border-t-2 border-border pt-8">
        <Button nativeButton={false} render={<Link href="/" />} size="lg">
          Back to home
        </Button>
        <Button
          nativeButton={false}
          render={
            <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer" />
          }
          variant="outline"
          size="lg"
        >
          GitHub
        </Button>
      </div>
    </div>
  )
}
