import Link from "next/link"

import { ConsoleDemo } from "@/components/landing/console-demo"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { SITE } from "@/lib/site"

export function LandingHero() {
  return (
    <section
      id="product"
      className="relative isolate overflow-hidden border-b-2 border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,_#eadffe_0%,_transparent_45%),_radial-gradient(ellipse_at_90%_10%,_#fff7c2_0%,_transparent_40%),_linear-gradient(180deg,_#ffffff_0%,_#f7f4ff_55%,_#ffffff_100%)] dark:bg-[radial-gradient(ellipse_at_20%_0%,_#2f2542_0%,_transparent_45%),_linear-gradient(180deg,_#0f0f0f_0%,_#1a1524_60%,_#0f0f0f_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-20"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:py-20">
        <div className="flex flex-col items-start gap-5 animate-in-up">
          <div className="flex items-center gap-3">
            <BrandLogo
              alt=""
              width={56}
              height={63}
              className="h-14 w-auto select-none object-contain sm:h-16"
            />
            <p className="font-head text-4xl leading-none tracking-tight sm:text-5xl">
              Taskmark
            </p>
          </div>
          <h1 className="max-w-xl font-head text-3xl leading-[1.05] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            Product memory for agent work
          </h1>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            Local markdown boards that keep epics, stories, and tasks in sync
            with Cursor — so planning survives the chat.
          </p>
          <div className="flex flex-wrap gap-3" id="get-started">
            <Button
              nativeButton={false}
              render={<Link href={SITE.startPath} />}
              size="lg"
            >
              Start now
            </Button>
            <Button
              nativeButton={false}
              render={<Link href={SITE.docsPath} />}
              variant="outline"
              size="lg"
            >
              Read the docs
            </Button>
          </div>
        </div>

        <ConsoleDemo className="animate-in-up animation-delay-150 w-full max-w-xl justify-self-stretch lg:justify-self-end" />
      </div>
    </section>
  )
}
