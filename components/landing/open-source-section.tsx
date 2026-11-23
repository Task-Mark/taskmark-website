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
          <Badge variant="outline">Works with any AI agent</Badge>
        </div>
        <h2
          id="open-source-heading"
          className="max-w-2xl font-head text-3xl tracking-tight sm:text-4xl"
        >
          MIT-licensed. Any agent. Plain markdown in git.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Boards are plain markdown in git, so Claude Code, Codex, Cursor,
          Copilot, Gemini, or any other agent can read them with a short project
          instruction. The Cursor plugin adds slash commands, and the GitHub
          and Bitbucket App keeps the board in step with every push and merged
          pull request.
        </p>
      </div>
    </section>
  )
}
