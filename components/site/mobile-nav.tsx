"use client"

import * as React from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { ThemeToggle } from "@taskmark/components"
import { Button } from "@taskmark/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@taskmark/components/ui/sheet"
import { SITE } from "@/lib/site"
import { SITE_NAV } from "@/lib/site-nav"
import { cn } from "@taskmark/components"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Open navigation menu"
            className={cn("shrink-0", className)}
          />
        }
      >
        <MenuIcon className="size-4" />
      </SheetTrigger>
      <SheetContent side="right" className="gap-0">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Taskmark site sections and docs</SheetDescription>
        </SheetHeader>
        <nav
          className="flex flex-col gap-1 px-4 pb-4"
          aria-label="Primary mobile"
        >
          {SITE_NAV.map((item) => (
            "external" in item && item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="border-2 border-transparent px-3 py-2.5 font-head text-base text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
              >
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="ml-2 rounded border-2 border-border bg-amber-300 px-1.5 py-px text-[10px] font-head uppercase leading-none text-foreground">
                    {item.badge}
                  </span>
                ) : null}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-2 border-transparent px-3 py-2.5 font-head text-base text-muted-foreground transition-colors hover:border-border hover:bg-muted hover:text-foreground"
              >
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="ml-2 rounded border-2 border-border bg-amber-300 px-1.5 py-px text-[10px] font-head uppercase leading-none text-foreground">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            )
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3 border-t-2 border-border p-4">
          <ThemeToggle />
          <Button
            nativeButton={false}
            render={
              <Link href={SITE.startPath} onClick={() => setOpen(false)} />
            }
            className="flex-1"
          >
            Start now
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
