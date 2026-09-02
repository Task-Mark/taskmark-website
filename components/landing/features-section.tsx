import { FEATURES } from "@/lib/features"
import { cn } from "@taskmark/components"

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="border-b-2 border-border bg-muted/40"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Features
          </p>
          <h2
            id="features-heading"
            className="mt-2 font-head text-3xl tracking-tight sm:text-4xl"
          >
            Work that agents can remember — and teams can see
          </h2>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            A markdown board humans and agents share: context, delivery, and
            release notes without a second tracker.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <li
                key={feature.id}
                id={feature.id}
                className="scroll-mt-24 group flex flex-col gap-3"
              >
                <div
                  className={cn(
                    "flex size-10 items-center justify-center border-2 border-border shadow-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow",
                    feature.accent
                  )}
                >
                  <Icon className="size-5" strokeWidth={2.5} aria-hidden />
                </div>
                <h3 className="font-head text-xl tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {feature.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
