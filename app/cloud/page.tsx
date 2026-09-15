import type { Metadata } from "next"
import Link from "next/link"
import {
  Activity,
  Cloud,
  GitBranch,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react"

import { ContactForm } from "@/components/landing/contact-form"
import { SITE } from "@/lib/site"
import { Button } from "@taskmark/components/ui/button"

export const metadata: Metadata = {
  title: "Taskmark Cloud",
  description:
    "Publish a local Taskmark markdown board to a shared hosted view for your team.",
}

const features = [
  {
    title: "One shared team view",
    description:
      "Give product, engineering, and stakeholders a browser view of the board without requiring repository access.",
    icon: Users,
  },
  {
    title: "Local-first source of truth",
    description:
      "Epics, stories, tasks, and bugs stay as markdown in git. Cloud publishes the board; it does not replace it.",
    icon: GitBranch,
  },
  {
    title: "Automatic incremental sync",
    description:
      "Taskmark watches markdown, uploads only changed files, and rebuilds the hosted snapshot as work changes.",
    icon: RefreshCw,
  },
  {
    title: "Live delivery visibility",
    description:
      "Follow board progress, work logs, contributor presence, and delivery from the same UI as the local board.",
    icon: Activity,
  },
  {
    title: "Project-scoped access",
    description:
      "A Cloud project issues its own sync token, which selects the destination and authorizes local uploads.",
    icon: ShieldCheck,
  },
  {
    title: "Simple team rollout",
    description:
      "Commit one board .config file so every clone connects to the same Cloud project when Taskmark starts.",
    icon: Cloud,
  },
] as const

const faqs = [
  {
    question: "Does Taskmark Cloud replace the local board?",
    answer:
      "No. The local markdown board remains the source of truth. Cloud is the hosted team view of the latest synced files and snapshot.",
  },
  {
    question: "Where do I configure synchronization?",
    answer:
      "Copy the token from the Cloud project's Settings page and set TASKMARK_SYNC_TOKEN in the board-root .config file. There is no token Settings page in the local UI.",
  },
  {
    question: "When does the board synchronize?",
    answer:
      "taskmark dev and taskmark serve sync on startup and continue watching board markdown and .config while the process runs.",
  },
  {
    question: "Is the .config file uploaded to Cloud?",
    answer:
      "No. Taskmark uses .config locally for credentials and excludes it from board file uploads.",
  },
  {
    question: "What happens when a token is rotated?",
    answer:
      "The previous token stops working immediately. Replace it in each board clone's .config file before syncing again.",
  },
] as const

export default function CloudPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b-2 border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_#bae6fd_0%,_transparent_45%),_radial-gradient(ellipse_at_90%_20%,_#eadffe_0%,_transparent_40%),_linear-gradient(180deg,_#ffffff_0%,_#f7f4ff_100%)] dark:bg-[radial-gradient(ellipse_at_20%_0%,_#18374a_0%,_transparent_45%),_linear-gradient(180deg,_#0f0f0f_0%,_#1a1524_100%)]"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:py-24">
          <div className="flex size-12 items-center justify-center border-2 border-border bg-sky-400 shadow-sm">
            <Cloud className="size-6" aria-hidden />
          </div>
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Taskmark Cloud
          </p>
          <h1 className="max-w-3xl font-head text-4xl leading-tight tracking-tight sm:text-6xl">
            Your local product memory, visible to the whole team
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Keep planning and delivery in git-backed markdown. Publish the same
            board to a secure hosted view so everyone can follow what agents
            and developers are shipping.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              nativeButton={false}
              render={
                <a
                  href={SITE.cloudLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="lg"
            >
              Sign in to Taskmark Cloud
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/docs/cloud#configuration-guide" />}
              variant="outline"
              size="lg"
            >
              Read the configuration guide
            </Button>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="border-b-2 border-border bg-background"
        aria-labelledby="cloud-features-heading"
      >
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Features
          </p>
          <h2
            id="cloud-features-heading"
            className="mt-2 max-w-2xl font-head text-3xl tracking-tight sm:text-4xl"
          >
            Share the board without moving the work
          </h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <li
                key={title}
                className="border-2 border-border bg-card p-5 shadow-sm"
              >
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 font-head text-xl tracking-tight">
                  {title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="configuration"
        className="border-b-2 border-border bg-accent/30"
        aria-labelledby="cloud-configuration-heading"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              Configuration
            </p>
            <h2
              id="cloud-configuration-heading"
              className="mt-2 font-head text-3xl tracking-tight sm:text-4xl"
            >
              From local board to Cloud in four steps
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              One project token connects the board. Taskmark then watches local
              markdown and publishes updates while the local process runs.
            </p>
          </div>
          <div>
            <ol className="space-y-4">
              {[
                "Create or open a project in Taskmark Cloud.",
                "Copy its board sync token from Cloud Settings.",
                "Put TASKMARK_SYNC_TOKEN=tmk_… in the board-root .config file.",
                "Run npx taskmark dev or npx taskmark serve from the board folder.",
              ].map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 border-2 border-border bg-card p-4 shadow-sm"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center bg-primary font-head text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="pt-1 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
            <Button
              nativeButton={false}
              render={<Link href="/docs/cloud#configuration-guide" />}
              variant="outline"
              className="mt-6"
            >
              Open the detailed guide
            </Button>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-b-2 border-border bg-background"
        aria-labelledby="cloud-faq-heading"
      >
        <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            FAQ
          </p>
          <h2
            id="cloud-faq-heading"
            className="mt-2 font-head text-3xl tracking-tight sm:text-4xl"
          >
            Common questions
          </h2>
          <div className="mt-8 divide-y-2 divide-border border-y-2 border-border">
            {faqs.map(({ question, answer }) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none font-head text-lg tracking-tight marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {question}
                    <span
                      className="text-2xl transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactForm
        id="cloud-contact"
        title="Bring Taskmark Cloud to your team"
        description="Need help connecting repositories, onboarding contributors, or rolling Taskmark Cloud out across your team? Tell us about your workflow."
        source="taskmark-cloud-integration"
      />

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-head text-3xl tracking-tight">
              Ready to share your board?
            </h2>
            <p className="mt-2 max-w-xl opacity-85">
              Sign in, create a Cloud project, and connect your local markdown
              with one token.
            </p>
          </div>
          <Button
            nativeButton={false}
            render={
              <a
                href={SITE.cloudLoginUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="secondary"
            size="lg"
          >
            Sign in to Taskmark Cloud
          </Button>
        </div>
      </section>
    </div>
  )
}
