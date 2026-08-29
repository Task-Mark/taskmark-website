import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Brain,
  FolderTree,
  ListOrdered,
  Newspaper,
  Users,
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
    id: "feature-memory",
    title: "Product memory for agents",
    description:
      "Chat is not a backlog. The board is the product context agents read and update — so planning survives the session.",
    icon: Brain,
    accent: "bg-violet-400",
  },
  {
    id: "feature-agent-log",
    title: "Agents report their own work",
    description:
      "You cannot pre-write every task in an agentic project. As features land, the agent records what it actually did, so the board stays true without a human tax.",
    icon: Bot,
    accent: "bg-sky-400",
  },
  {
    id: "feature-team",
    title: "Everyone on one board",
    description:
      "People and agents write the same leaves. Status, contributors, and activity roll up so you can see who shipped what.",
    icon: Users,
    accent: "bg-emerald-400",
  },
  {
    id: "feature-changelog",
    title: "Changelogs users can read",
    description:
      "Done work becomes Keep a Changelog notes for each version — user-facing outcomes, not ticket IDs.",
    icon: Newspaper,
    accent: "bg-amber-300",
  },
  {
    id: "feature-pace",
    title: "Priorities and points that steer delivery",
    description:
      "Priority plus a fixed story-point scale sequences work and shows how fast the team is moving — without inventing estimates from the past.",
    icon: ListOrdered,
    accent: "bg-rose-400",
  },
  {
    id: "feature-boards",
    title: "Hierarchical boards",
    description:
      "Epics, stories, tasks, and bugs as markdown — nested product memory the agent can read and update, without a generated dashboard.",
    icon: FolderTree,
    accent: "bg-cyan-400",
  },
]
