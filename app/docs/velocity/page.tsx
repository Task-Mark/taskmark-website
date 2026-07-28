import type { Metadata } from "next"
import Link from "next/link"

import {
  DocsProse,
  DocsShell,
  DocsTitle,
} from "@/components/docs/docs-shell"

export const metadata: Metadata = {
  title: "Velocity",
  description:
    "How Taskmark Current Speed, ETA, and median minutes-per-point estimates work.",
}

export default function DocsVelocityPage() {
  return (
    <DocsShell currentPath="/docs/velocity">
      <DocsTitle
        eyebrow="Velocity"
        title="Velocity and ETA"
        lead="Current Speed measures throughput. Median minutes per point turns points into suggested estimates."
      />
      <DocsProse>
        <h2 id="current-speed">Current Speed</h2>
        <p>
          <strong>Current Speed</strong> = average weekly story points from done
          tasks/bugs over a 90-day window (anchored at the latest completed
          leaf).
        </p>
        <ul>
          <li>Excludes the <strong>current</strong> ISO week</li>
          <li>Excludes weeks with <strong>0</strong> points</li>
          <li>Same rule as the board UI metrics strip</li>
        </ul>
        <p>
          Values live in board <code>VELOCITY.md</code>, refreshed by{" "}
          <code>recompute-actuals.py</code> / <code>/sync-status</code> /{" "}
          <code>/velocity</code>.
        </p>

        <h2 id="eta">ETA</h2>
        <ul>
          <li>
            <strong>Calendar ETA</strong> ≈ remaining open points ÷ Current
            Speed (weeks)
          </li>
          <li>
            <strong>Effort ETA</strong> ≈ remaining estimate minutes from median
            intensity (or remaining Est column sum)
          </li>
        </ul>

        <h2 id="median-min-pt">Median minutes per point</h2>
        <p>
          Among trustworthy done leaves in the window (
          <code>actual_minutes &gt; 2</code> and <code>points &gt; 0</code>),
          Taskmark takes the median of <code>actual_minutes / points</code>.
        </p>
        <ul>
          <li>
            Suggested Est = <code>round5(points × median)</code> with{" "}
            <code>estimate_basis: [speed:90d:Nmin/pt]</code>
          </li>
          <li>
            Needs ≥3 trustworthy samples; otherwise Est stays 0 unless manual
          </li>
          <li>
            <code>--calibrate</code> refreshes non-manual open leaf estimates
          </li>
        </ul>
        <p>
          Related: <Link href="/docs/sizing">Sizing</Link>,{" "}
          <Link href="/docs/commands#velocity">/velocity</Link>.
        </p>
      </DocsProse>
    </DocsShell>
  )
}
