# Taskmark website

Public Taskmark product site (landing + docs). Shares the UI component stack
and visual language with `taskmark-frontend`.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Stack

- Next.js 16 / React 19
- Tailwind CSS v4
- shadcn base-nova (`@base-ui/react`)
- Same theme tokens and fonts as the board UI

## Environment

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_GITHUB_URL` | Contributor / GitHub CTA target |
| `CONTACT_WEBHOOK_URL` | POST target for contact form JSON |
| `RESEND_API_KEY` + `CONTACT_TO_EMAIL` | Alternative email delivery via Resend |
| `CONTACT_FROM_EMAIL` | Optional Resend from address |

In development, if neither contact backend is set, submissions are logged to
the server console so the form UX can be tested without secrets.
