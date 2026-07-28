import { BoardVisual } from "@/components/landing/board-visual"

export function PurposeSection() {
  return (
    <section
      id="purpose"
      className="border-b-2 border-border bg-background"
      aria-labelledby="purpose-heading"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Why Taskmark
          </p>
          <h2
            id="purpose-heading"
            className="font-head text-3xl tracking-tight sm:text-4xl"
          >
            Agents forget. Boards remember.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Chat threads are a terrible backlog. Taskmark keeps product work as
            hierarchical markdown the agent already knows how to open, update,
            and complete — with sizes, points, and billable work logs that stay
            honest.
          </p>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            You get a durable trail of decisions and delivery without bolting on
            another SaaS board that drifts from what actually shipped.
          </p>
        </div>
        <BoardVisual className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end" />
      </div>
    </section>
  )
}
