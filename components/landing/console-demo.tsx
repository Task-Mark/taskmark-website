"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

const LINES = [
  { prompt: true, text: "/tkmd-plan \"Ship landing page\"" },
  { prompt: false, text: "Planned E-MM-4b9b509e · 6 stories" },
  { prompt: true, text: "/tkmd-do T-MM-f84c1351" },
  { prompt: false, text: "Implemented T-MM-f84c1351 · marked done · no commit" },
  { prompt: true, text: "/tkmd-commit" },
  { prompt: false, text: "Committed linked projects" },
] as const

const CHAR_MS = 28
const LINE_PAUSE_MS = 520
const LOOP_PAUSE_MS = 1800

export function ConsoleDemo({ className }: { className?: string }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const apply = () => setReducedMotion(mq.matches)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    const current = LINES[lineIndex]
    if (!current) return

    if (charIndex < current.text.length) {
      const t = window.setTimeout(
        () => setCharIndex((c) => c + 1),
        CHAR_MS
      )
      return () => window.clearTimeout(t)
    }

    const isLast = lineIndex === LINES.length - 1
    const t = window.setTimeout(
      () => {
        if (isLast) {
          setLineIndex(0)
          setCharIndex(0)
        } else {
          setLineIndex((i) => i + 1)
          setCharIndex(0)
        }
      },
      isLast ? LOOP_PAUSE_MS : LINE_PAUSE_MS
    )
    return () => window.clearTimeout(t)
  }, [charIndex, lineIndex, reducedMotion])

  const visibleCount = reducedMotion ? LINES.length : lineIndex + 1

  return (
    <div
      className={cn(
        "overflow-hidden border-2 border-border bg-[#0f0f0f] text-left shadow-lg",
        className
      )}
      role="img"
      aria-label="Terminal demo typing /tkmd-plan, /tkmd-do, and /tkmd-commit"
    >
      <div className="flex items-center gap-2 border-b-2 border-border bg-[#1a1a1a] px-3 py-2">
        <span className="size-2.5 rounded-full bg-rose-400" aria-hidden />
        <span className="size-2.5 rounded-full bg-amber-300" aria-hidden />
        <span className="size-2.5 rounded-full bg-emerald-400" aria-hidden />
        <span className="ml-2 font-mono text-xs text-zinc-400">
          taskmark · console
        </span>
      </div>
      <div className="min-h-[11.5rem] space-y-1.5 p-4 font-mono text-sm leading-relaxed sm:min-h-[13rem] sm:text-[0.95rem]">
        {LINES.slice(0, visibleCount).map((line, i) => {
          const isActive = !reducedMotion && i === lineIndex
          const shown = reducedMotion
            ? line.text
            : isActive
              ? line.text.slice(0, charIndex)
              : line.text
          return (
            <p
              key={`${line.text}-${i}`}
              className={cn(
                line.prompt ? "text-primary" : "text-zinc-300",
                "whitespace-pre-wrap break-all"
              )}
            >
              {line.prompt ? (
                <span className="text-emerald-400" aria-hidden>
                  ›{" "}
                </span>
              ) : (
                <span className="text-zinc-500" aria-hidden>
                  ·{" "}
                </span>
              )}
              {shown}
              {isActive ? (
                <span
                  className="ml-0.5 inline-block h-[1.1em] w-[0.55ch] translate-y-[0.1em] bg-primary align-baseline animate-pulse"
                  aria-hidden
                />
              ) : null}
            </p>
          )
        })}
      </div>
      <p className="sr-only">
        Example session: plan an epic or task, implement a leaf without
        committing, then commit linked projects explicitly.
      </p>
    </div>
  )
}
