import type { LucideIcon } from "lucide-react"
import {
  FolderTree,
  GitBranch,
  ListChecks,
  Timer,
  Workflow,
} from "lucide-react"

export type FeatureItem = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

/** Feature inventory for the landing showcase (T-211). */
export const FEATURES: FeatureItem[] = [
  {
    id: "feature-boards",
    title: "Hierarchical boards",
    description:
      "Epics, stories, tasks, and bugs as markdown — the board is product memory the agent can read and update.",
    icon: FolderTree,
    accent: "bg-violet-400",
  },
  {
    id: "feature-sizing",
    title: "Sizing that sticks",
    description:
      "A fixed XS–XXL scale maps directly to 1, 3, 5, 8, 13, and 21 points across every board.",
    icon: ListChecks,
    accent: "bg-sky-400",
  },
  {
    id: "feature-effort",
    title: "Effort from work logs",
    description:
      "Actual minutes come from billable sessions, not calendar span. Idle and session caps keep numbers honest.",
    icon: Timer,
    accent: "bg-amber-300",
  },
  {
    id: "feature-conflict-free",
    title: "Conflict-free teamwork",
    description:
      "Agents update leaf markdown only; parent status, totals, people, dates, and activity are derived when read.",
    icon: Workflow,
    accent: "bg-emerald-400",
  },
  {
    id: "feature-multi-repo",
    title: "Multi-repo ready",
    description:
      "One dedicated board, a local gitignored REPOS.md, and explicit /tkmd-commit across linked roots.",
    icon: GitBranch,
    accent: "bg-rose-400",
  },
  {
    id: "feature-workflow",
    title: "Agent workflow built in",
    description:
      "Four commands initialize, create, implement without committing, and explicitly commit linked projects.",
    icon: Workflow,
    accent: "bg-cyan-400",
  },
]
