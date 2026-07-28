import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { Separator } from "@/components/ui/separator"
import { SITE } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-2 border-border bg-card">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo
              alt=""
              width={32}
              height={36}
              className="h-8 w-auto select-none object-contain"
            />
            <div>
              <p className="font-head text-lg leading-none tracking-tight">
                Taskmark
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Local boards. Clear backlog.
              </p>
            </div>
          </div>
          <nav
            className="flex flex-wrap gap-4 text-sm text-muted-foreground"
            aria-label="Footer"
          >
            <Link
              href="/#features"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Features
            </Link>
            <Link
              href="/docs"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Docs
            </Link>
            <Link
              href="/#contact"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Contact
            </Link>
            <a
              href={SITE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              GitHub
            </a>
            <Link
              href={SITE.startPath}
              className="underline-offset-2 hover:text-foreground hover:underline"
            >
              Start now
            </Link>
          </nav>
        </div>
        <Separator />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Taskmark. Open source · MIT · Built for
          Cursor.
        </p>
      </div>
    </footer>
  )
}
