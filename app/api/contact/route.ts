import { NextResponse } from "next/server"

type ContactBody = {
  name?: unknown
  email?: unknown
  message?: unknown
  source?: unknown
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

export async function POST(request: Request) {
  let body: ContactBody
  try {
    body = (await request.json()) as ContactBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const name = isNonEmptyString(body.name) ? body.name.trim() : ""
  const email = isNonEmptyString(body.email) ? body.email.trim() : ""
  const message = isNonEmptyString(body.message) ? body.message.trim() : ""
  const source = isNonEmptyString(body.source)
    ? body.source.trim().slice(0, 80)
    : "taskmark-website"

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    )
  }
  if (message.length < 10) {
    return NextResponse.json(
      { error: "Message should be at least 10 characters." },
      { status: 400 }
    )
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL
  const resendKey = process.env.RESEND_API_KEY
  const contactTo = process.env.CONTACT_TO_EMAIL
  const contactFrom =
    process.env.CONTACT_FROM_EMAIL ?? "Taskmark <onboarding@resend.dev>"

  if (webhookUrl) {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source,
        receivedAt: new Date().toISOString(),
      }),
    })
    if (!res.ok) {
      return NextResponse.json(
        { error: "Delivery failed. Please try again later." },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true })
  }

  if (resendKey && contactTo) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFrom,
        to: [contactTo],
        reply_to: email,
        subject:
          source === "taskmark-cloud-integration"
            ? `Taskmark Cloud integration request from ${name}`
            : `Taskmark contact from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    })
    if (!res.ok) {
      return NextResponse.json(
        { error: "Delivery failed. Please try again later." },
        { status: 502 }
      )
    }
    return NextResponse.json({ ok: true })
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact]", { name, email, message })
    return NextResponse.json({ ok: true, mode: "dev-log" })
  }

  return NextResponse.json(
    {
      error:
        "Contact delivery is not configured. Set CONTACT_WEBHOOK_URL or RESEND_API_KEY + CONTACT_TO_EMAIL.",
    },
    { status: 503 }
  )
}
