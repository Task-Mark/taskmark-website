import { LayoutDashboard } from "lucide-react"

import { Button } from "@taskmark/components/ui/button"
import { SITE } from "@/lib/site"

export function LiveBoardSection() {
  return (
    <section
      id="live-board"
      className="scroll-mt-24 border-b-2 border-border bg-background"
      aria-labelledby="live-board-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:py-20">
        <div className="flex size-10 items-center justify-center border-2 border-border bg-primary shadow-sm">
          <LayoutDashboard className="size-5" aria-hidden />
        </div>
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Built with Taskmark
          </p>
          <h2
            id="live-board-heading"
            className="mt-2 font-head text-3xl tracking-tight sm:text-4xl"
          >
            We ship Taskmark on a Taskmark board
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every epic, story, and task behind this product lives on the same
            kind of markdown board you would keep in your own workspace. The
            hosted board is the real backlog we use to plan, implement, and
            commit — not a mock screenshot.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Open it to see a working example of the UI, the hierarchy, and how
            work looks after months of agent sessions.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={
            <a
              href={SITE.boardUrl}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
          size="lg"
        >
          Open the live product board
        </Button>
      </div>
    </section>
  )
}
