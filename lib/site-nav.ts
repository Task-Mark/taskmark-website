import { SITE } from "@/lib/site"

/** Header destinations shared by the desktop bar and the mobile menu. */
export const SITE_NAV = [
  { href: "/#features", label: "Features" },
  { href: "/cloud", label: "Cloud", badge: "New" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/commands", label: "Commands" },
  { href: "/#contact", label: "Contact" },
  {
    href: SITE.boardUrl,
    label: "Development board",
    external: true,
  },
] as const
