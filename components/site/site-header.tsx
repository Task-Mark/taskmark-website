import Link from "next/link"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"

const nav = [
  { href: "/#product", label: "Product" },
  { href: "/#docs", label: "Docs" },
] as const

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-card/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-3 px-4 pt-3.5 pb-4">
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
          <span className="font-head text-2xl leading-none tracking-tight">
            Taskmark
          </span>
        </Link>

        <nav
          className="flex flex-wrap items-center gap-1 sm:gap-2"
          aria-label="Primary"
        >
          {nav.map((item) => (
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
          <Button
            nativeButton={false}
            render={<Link href="/#get-started" />}
            size="sm"
          >
            Get started
          </Button>
        </nav>
      </div>
    </header>
  )
}
