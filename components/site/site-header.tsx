import Link from "next/link"

import { BrandLogo } from "@taskmark/components"
import { MobileNav } from "@/components/site/mobile-nav"
import { ThemeToggle } from "@taskmark/components"
import { Button } from "@taskmark/components/ui/button"
import { SITE } from "@/lib/site"
import { SITE_NAV } from "@/lib/site-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-card/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 pt-3.5 pb-4">
        <Link
          href="/"
          className="group flex min-w-0 flex-1 items-center gap-3 transition-[gap] duration-200 hover:gap-4"
        >
          <BrandLogo
            alt=""
            width={40}
            height={45}
            className="mb-0.5 h-10 w-auto shrink-0 origin-center select-none object-contain transition-transform duration-200 group-hover:scale-110"
          />
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="w-fit font-head text-2xl leading-none tracking-tight">
              <span className="relative inline-block transition-transform duration-200 group-hover:-rotate-2">
                Taskmark
                <svg
                  aria-hidden
                  viewBox="0 0 120 10"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute -bottom-1.5 -left-1 h-2.5 w-[calc(100%+1rem)] origin-left text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  {/* Linear hand stroke: thin at start, thicker at end */}
                  <path
                    fill="currentColor"
                    d="M1 5.2 L119 3.2 L119 8.8 L1 5.9 Z"
                  />
                </svg>
              </span>
            </p>
            <p className="truncate text-xs text-muted-foreground transition-transform duration-200 group-hover:translate-y-1">
              Product memory for agent work
            </p>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex lg:gap-2"
          aria-label="Primary"
        >
          {SITE_NAV.map((item) => (
            <Button
              key={item.href}
              nativeButton={false}
              render={<Link href={item.href} />}
              variant="ghost"
              size="sm"
            >
              {item.label}
            </Button>
          ))}
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={<Link href={SITE.startPath} />}
            size="sm"
          >
            Start now
          </Button>
        </nav>

        <MobileNav className="lg:hidden" />
      </div>
    </header>
  )
}
