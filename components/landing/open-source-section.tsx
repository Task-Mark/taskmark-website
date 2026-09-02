import { Badge } from "@taskmark/components/ui/badge"

export function OpenSourceSection() {
  return (
    <section
      id="open-source"
      className="border-b-2 border-border bg-background"
      aria-labelledby="open-source-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:py-20">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Open source</Badge>
          <Badge variant="outline">Built for Cursor</Badge>
        </div>
        <h2
          id="open-source-heading"
          className="max-w-2xl font-head text-3xl tracking-tight sm:text-4xl"
        >
          MIT-licensed. Cursor-first. Local by default.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Taskmark ships as a Cursor plugin marketplace package — skills, rules,
          and scripts that live next to your repos. Boards stay on disk in git;
          there is no hosted backlog to sync against. IDE support beyond Cursor
          is intentionally out of scope for now.
        </p>
      </div>
    </section>
  )
}
