import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Sizing & points",
  description:
    "Taskmark static t-shirt sizes, points map, and parent rollups in the UI.",
}

export default function DocsSizingPage() {
  return (
    <DocsShell currentPath="/docs/sizing">
      <DocsTitle
        eyebrow="Sizing"
        title="Sizing and story points"
        lead="Every leaf gets a t-shirt size and matching points from a fixed table. The UI rolls parents up at read time."
      />
      <DocsProse>
        <h2 id="map">Size → points</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Size</th>
                <th className="px-3 py-2">Points</th>
                <th className="px-3 py-2">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">XS</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2 text-muted-foreground">Trivial</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">S</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2 text-muted-foreground">Small</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">M</td>
                <td className="px-3 py-2">5</td>
                <td className="px-3 py-2 text-muted-foreground">Medium</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">L</td>
                <td className="px-3 py-2">8</td>
                <td className="px-3 py-2 text-muted-foreground">Large</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">XL</td>
                <td className="px-3 py-2">13</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Extra large — prefer split
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2">XXL</td>
                <td className="px-3 py-2">21</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Not sprint-ready — not refined for a sprint; prefer split
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Points scale: <code>1 | 3 | 5 | 8 | 13 | 21</code>. Create uses this
          table only — there is no board sizing file and no velocity calibration
          of estimates.
        </p>

        <h2 id="create">Suggestions on create</h2>
        <ul>
          <li>
            Pick a t-shirt from the table; points follow automatically.
          </li>
          <li>
            Override with a manual size when the default does not fit; keep
            points aligned with the map.
          </li>
          <li>
            Epics have no t-shirt size.
          </li>
        </ul>

        <h2 id="rollups">Parent rollups</h2>
        <p>
          Rollups are <strong>not written</strong> into parent markdown. The UI
          derives them when it scans children:
        </p>
        <ul>
          <li>
            <strong>Story points</strong> = sum of child task/bug points when
            children exist
          </li>
          <li>
            <strong>Epic points</strong> = sum of story points + epic-direct
            leaves
          </li>
          <li>
            <strong>Epic size</strong> = none
          </li>
          <li>
            Actual minutes come from leaf work logs, never calendar span
          </li>
        </ul>
        <p>
          See <Link href="/docs/workflows">Workflows</Link> for how create and
          do keep parent files untouched.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
