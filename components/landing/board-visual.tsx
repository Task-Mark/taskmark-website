import { cn } from "@/lib/utils"

const NODES = [
  { id: "E-018", label: "Epic", title: "Website landing", tone: "bg-primary" },
  { id: "S-065", label: "Story", title: "Hero + Start now", tone: "bg-sky-300" },
  { id: "T-207", label: "Task", title: "Console typing demo", tone: "bg-emerald-300" },
] as const

export function BoardVisual({ className }: { className?: string }) {
  return (
    <figure
      className={cn("relative", className)}
      aria-labelledby="board-visual-caption"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_30%_20%,_#eadffe_0%,_transparent_55%)] opacity-80"
      />
      <div className="relative flex flex-col gap-3 border-2 border-border bg-card p-4 shadow-lg sm:p-5">
        <div className="flex items-center justify-between gap-2 border-b-2 border-border pb-3">
          <span className="font-head text-sm tracking-tight">Board</span>
          <span className="rounded border-2 border-border bg-muted px-2 py-0.5 text-xs font-medium">
            in progress
          </span>
        </div>
        <ul className="flex flex-col gap-2.5">
          {NODES.map((node, index) => (
            <li
              key={node.id}
              className="flex items-stretch gap-3"
              style={{ marginLeft: `${index * 1.1}rem` }}
            >
              <span
                className={cn(
                  "mt-1 size-3 shrink-0 border-2 border-border shadow-xs",
                  node.tone
                )}
              />
              <div className="min-w-0 flex-1 border-2 border-border bg-background px-3 py-2 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 hover:shadow">
                <p className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
                  {node.label} · {node.id}
                </p>
                <p className="truncate font-head text-sm tracking-tight">
                  {node.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="board-visual-caption" className="sr-only">
        Diagram of a Taskmark board hierarchy: epic E-018 contains story S-065
        which contains task T-207.
      </figcaption>
    </figure>
  )
}
