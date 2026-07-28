import Link from "next/link"
import { BookOpen, Layers, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#eadffe_0%,_transparent_55%),_linear-gradient(180deg,_#fff_0%,_#f7f4ff_100%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-14 sm:py-20">
        <section
          id="product"
          className="flex flex-col items-start gap-6 sm:max-w-2xl"
        >
          <Badge variant="secondary">Website base</Badge>
          <h1 className="font-head text-4xl tracking-tight text-foreground sm:text-6xl">
            Taskmark
          </h1>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Local boards. Clear backlog. This public site will host product
            information and documentation — for now it proves the shared UI
            stack with <span className="font-medium text-foreground">taskmark-frontend</span>.
          </p>
          <div className="flex flex-wrap gap-3" id="get-started">
            <Button
              nativeButton={false}
              render={<Link href="/#docs" />}
              size="lg"
            >
              Browse docs
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/#docs" />}
              variant="outline"
              size="lg"
            >
              Coming soon
            </Button>
          </div>
        </section>

        <section
          id="docs"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          aria-label="Placeholder sections"
        >
          <Card>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center border-2 border-black bg-violet-400 shadow-[3px_3px_0_0_#000]">
                <Layers className="size-4" strokeWidth={2.5} aria-hidden />
              </div>
              <CardTitle className="font-head">Product</CardTitle>
              <CardDescription>
                Overview of Taskmark boards, epics, and local-first workflow.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Content placeholder — pages land in a later epic.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center border-2 border-black bg-sky-400 shadow-[3px_3px_0_0_#000]">
                <BookOpen className="size-4" strokeWidth={2.5} aria-hidden />
              </div>
              <CardTitle className="font-head">Documentation</CardTitle>
              <CardDescription>
                Guides for the Cursor plugin, board layout, and sizing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Docs structure is intentionally out of scope for this base setup.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="mb-2 flex size-9 items-center justify-center border-2 border-black bg-emerald-400 shadow-[3px_3px_0_0_#000]">
                <Sparkles className="size-4" strokeWidth={2.5} aria-hidden />
              </div>
              <CardTitle className="font-head">Shared UI</CardTitle>
              <CardDescription>
                Same tokens, fonts, and components as the board app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Archivo Black + Space Grotesk, neobrutalist CSS variables, shadcn
                base-nova primitives.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
