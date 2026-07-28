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
    "Taskmark t-shirt sizes, Fibonacci story points, parent rollups, and estimate suggestions.",
}

export default function DocsSizingPage() {
  return (
    <DocsShell currentPath="/docs/sizing">
      <DocsTitle
        eyebrow="Sizing"
        title="Sizing and story points"
        lead="Every leaf gets a t-shirt size and Fibonacci points. Parents roll up; Est comes from velocity when possible."
      />
      <DocsProse>
        <h2 id="map">Size → default points</h2>
        <div className="overflow-x-auto border-2 border-border bg-card shadow-sm">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="border-b-2 border-border bg-muted/60 font-head text-foreground">
              <tr>
                <th className="px-3 py-2">Size</th>
                <th className="px-3 py-2">Points</th>
                <th className="px-3 py-2">Weight</th>
                <th className="px-3 py-2">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">XS</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2 text-muted-foreground">Trivial</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">S</td>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2 text-muted-foreground">Small</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">M</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2 text-muted-foreground">Medium</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-3 py-2">L</td>
                <td className="px-3 py-2">5</td>
                <td className="px-3 py-2">4</td>
                <td className="px-3 py-2 text-muted-foreground">Large</td>
              </tr>
              <tr>
                <td className="px-3 py-2">XL</td>
                <td className="px-3 py-2">8</td>
                <td className="px-3 py-2">5</td>
                <td className="px-3 py-2 text-muted-foreground">
                  Extra large (prefer split); 13 only for high uncertainty
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Points scale: <code>1 | 2 | 3 | 5 | 8 | 13</code>. Board seeds live in{" "}
          <code>SIZING.md</code>.
        </p>

        <h2 id="suggest">Suggestions on create</h2>
        <ol>
          <li>Find similar done items (same type; prefer tags/epic).</li>
          <li>Size = median t-shirt; points = median points (or size map).</li>
          <li>
            Est = <code>round5(points × median min/pt)</code> when the 90-day
            window has enough trustworthy samples; else Est = 0.
          </li>
          <li>
            Sources: <code>suggested</code> vs <code>manual</code> vs{" "}
            <code>rolled_up</code>.
          </li>
        </ol>

        <h2 id="rollups">Parent rollups</h2>
        <ul>
          <li>
            <strong>Story points</strong> = sum of child task/bug points when
            children exist
          </li>
          <li>
            <strong>Story size</strong> from sum of child t-shirt weights
          </li>
          <li>
            <strong>Epic points</strong> = sum of story points + epic-direct
            leaves
          </li>
          <li>
            <strong>Epic size</strong> = none (<code>null</code> / — in INDEX)
          </li>
          <li>
            Est/Actual roll up from children; Actual is never calendar span
          </li>
        </ul>
        <p>
          See also <Link href="/docs/velocity">Velocity</Link> for how median
          min/point feeds Est.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
