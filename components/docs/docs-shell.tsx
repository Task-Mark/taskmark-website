import Link from "next/link"

import { DOCS_NAV } from "@/lib/docs-nav"
import { cn } from "@taskmark/components"

export function DocsShell({
  children,
  currentPath,
}: {
  children: React.ReactNode
  currentPath: string
}) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:py-14">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="mb-3 font-head text-sm tracking-tight">Documentation</p>
        <nav aria-label="Documentation" className="flex flex-col gap-1">
          {DOCS_NAV.map((item) => {
            const active =
              item.href === "/docs"
                ? currentPath === "/docs"
                : currentPath === item.href ||
                  currentPath.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-2 px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-border bg-primary text-primary-foreground shadow-sm"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            )
          })}
        </nav>
      </aside>
      <div className="min-w-0">{children}</div>
    </div>
  )
}

export function DocsProse({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline-offset-2 hover:[&_a]:underline [&_code]:rounded [&_code]:border [&_code]:border-border [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:text-foreground [&_h2]:scroll-mt-28 [&_h2]:pt-6 [&_h2]:font-head [&_h2]:text-2xl [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:scroll-mt-28 [&_h3]:pt-2 [&_h3]:font-head [&_h3]:text-xl [&_h3]:tracking-tight [&_h3]:text-foreground [&_li]:mt-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      {children}
    </div>
  )
}

export function DocsTitle({
  eyebrow = "Documentation",
  title,
  lead,
}: {
  eyebrow?: string
  title: string
  lead: string
}) {
  return (
    <header className="mb-8 border-b-2 border-border pb-6">
      <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="mt-2 font-head text-3xl tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
        {lead}
      </p>
    </header>
  )
}
