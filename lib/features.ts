import type { LucideIcon } from "lucide-react"
import {
  FolderTree,
  Gauge,
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
      "T-shirt sizes and Fibonacci points with suggestions calibrated from your history — not guesswork alone.",
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
    id: "feature-velocity",
    title: "Velocity and ETA",
    description:
      "Weekly points throughput and median minutes per point so estimates and delivery dates stay grounded.",
    icon: Gauge,
    accent: "bg-emerald-400",
  },
  {
    id: "feature-multi-repo",
    title: "Multi-repo ready",
    description:
      "One dedicated board for multi-git workspaces, REPOS.md for linked projects, and commit-all across roots.",
    icon: GitBranch,
    accent: "bg-rose-400",
  },
  {
    id: "feature-workflow",
    title: "Agent workflow built in",
    description:
      "Start-work, complete-work, sync-status, and project-memory rules keep Cursor sessions tied to the board.",
    icon: Workflow,
    accent: "bg-cyan-400",
  },
]
