"use client"

import { useState, type FormEvent } from "react"
import { toast } from "sonner"

import { Button } from "@taskmark/components/ui/button"
import { Input } from "@taskmark/components/ui/input"
import { Label } from "@taskmark/components/ui/label"
import { Textarea } from "@taskmark/components/ui/textarea"

type FieldErrors = {
  name?: string
  email?: string
  message?: string
}

function validate(values: {
  name: string
  email: string
  message: string
}): FieldErrors {
  const errors: FieldErrors = {}
  if (!values.name.trim()) errors.name = "Name is required."
  if (!values.email.trim()) {
    errors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address."
  }
  if (!values.message.trim()) {
    errors.message = "Message is required."
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters."
  }
  return errors
}

type ContactFormProps = {
  id?: string
  title?: string
  description?: string
  source?: string
}

export function ContactForm({
  id = "contact",
  title = "Contact",
  description = "Questions about Taskmark, partnerships, or the board workflow — send a note and we will get back to you.",
  source = "taskmark-website",
}: ContactFormProps = {}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [pending, setPending] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate({ name, email, message })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setPending(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          source,
        }),
      })
      const data = (await res.json().catch(() => ({}))) as {
        error?: string
        ok?: boolean
      }
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Try again.")
      }
      setSent(true)
      setName("")
      setEmail("")
      setMessage("")
      setErrors({})
      toast.success("Message sent — thanks for reaching out.")
    } catch (err) {
      const text =
        err instanceof Error ? err.message : "Something went wrong. Try again."
      toast.error(text)
    } finally {
      setPending(false)
    }
  }

  return (
    <section
      id={id}
      className="border-b-2 border-border bg-muted/40"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <h2
            id={`${id}-heading`}
            className="font-head text-3xl tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
            {description}
          </p>
          {sent ? (
            <p
              className="mt-4 border-2 border-border bg-emerald-100 px-3 py-2 text-sm text-foreground dark:bg-emerald-950"
              role="status"
            >
              Thanks — your message was received.
            </p>
          ) : null}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 border-2 border-border bg-card p-5 shadow-md sm:p-6"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name) || undefined}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              disabled={pending}
            />
            {errors.name ? (
              <p id="contact-name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email) || undefined}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
              disabled={pending}
            />
            {errors.email ? (
              <p id="contact-email-error" className="text-sm text-destructive">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={Boolean(errors.message) || undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              disabled={pending}
            />
            {errors.message ? (
              <p id="contact-message-error" className="text-sm text-destructive">
                {errors.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" size="lg" disabled={pending} className="self-start">
            {pending ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </section>
  )
}
