import Link from "next/link"

import { Button } from "@taskmark/components/ui/button"
import { SITE } from "@/lib/site"

export function DocsCtaSection() {
  return (
    <section
      id="docs"
      className="border-b-2 border-border bg-accent/40"
      aria-labelledby="docs-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-4 py-16 sm:flex-row sm:items-center sm:justify-between sm:py-20">
        <div className="max-w-xl">
          <h2
            id="docs-heading"
            className="font-head text-3xl tracking-tight sm:text-4xl"
          >
            Read the docs
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Install the plugin, initialize a board, and learn the slash commands
            that keep work sessions billable and honest.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            nativeButton={false}
            render={<Link href={SITE.docsPath} />}
            size="lg"
          >
            Open documentation
          </Button>
          <Button
            nativeButton={false}
            render={<Link href={SITE.startPath} />}
            variant="outline"
            size="lg"
          >
            Jump to install
          </Button>
        </div>
      </div>
    </section>
  )
}
