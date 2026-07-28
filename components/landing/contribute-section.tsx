import Link from "next/link"
import { GitPullRequest } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SITE } from "@/lib/site"

export function ContributeSection() {
  return (
    <section
      id="contribute"
      className="border-b-2 border-border bg-background"
      aria-labelledby="contribute-heading"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-16 sm:py-20">
        <h2
          id="contribute-heading"
          className="font-head text-3xl tracking-tight sm:text-4xl"
        >
          Become a contributor
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Ideas, fixes, and new skills are welcome. Open an issue or pull request
          on GitHub — the plugin package and board conventions live in the public
          repos.
        </p>
        <div>
          <Button
            nativeButton={false}
            render={
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="lg"
          >
            <GitPullRequest aria-hidden />
            View on GitHub
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Prefer to talk first?{" "}
          <Link
            href="/#contact"
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            Send a message
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
