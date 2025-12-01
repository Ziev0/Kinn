import type { ComponentType } from "react"
import Link from "next/link"
import { BrainCircuit, ClipboardCheck, Handshake } from "lucide-react"

import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: ClipboardCheck,
    title: "Answer Questions",
    body:
      "Our AI-powered assessment asks about your situation. Estate size, complexity, and your preferences. It only takes 2 minutes.",
  },
  {
    icon: BrainCircuit,
    title: "Get Your Custom Plan",
    body:
      "Instant recommendations that match your needs—from DIY tools to full-service settlement—with pricing and next steps spelled out.",
  },
  {
    icon: Handshake,
    title: "We Handle the Rest",
    body:
      "Pick your service level. We draft documents, file with the court, manage deadlines, and keep you informed through completion.",
  },
]

const timeline = [
  { week: "Week 1", milestone: "Documents prepared" },
  { week: "Week 4", milestone: "Filed with court" },
  { week: "Week 8", milestone: "Hearing completed" },
  { week: "Week 12", milestone: "Assets discovered" },
  { week: "Week 20", milestone: "Distributions made" },
  { week: "Week 24", milestone: "Estate closed" },
]

export default function HowItWorksPage() {
  return (
    <main className="space-y-16 bg-background pb-24 pt-16 font-sans">
      <section className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">How It Works</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">Three Simple Steps to Settlement</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Probate should be predictable. Our guided process keeps you informed, organized, and moving forward every week.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/assessment/quiz">Start the 2-Minute Assessment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/book-call">Talk with our team</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border bg-card p-6">
              <IconBadge Icon={step.icon} />
              <p className="mt-4 text-sm font-semibold text-primary">Step {index + 1}</p>
              <h2 className="mt-1 text-xl font-semibold">{step.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border bg-secondary/30 p-6 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Visual Timeline</p>
              <h2 className="mt-3 text-2xl font-semibold">Know exactly what happens—and when.</h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/assessment/quiz">See your personalized timeline</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            {timeline.map((entry) => (
              <div key={entry.week} className="rounded-2xl border bg-card p-4 text-center">
                <p className="text-sm font-semibold text-primary">{entry.week}</p>
                <p className="mt-1 text-sm text-muted-foreground">{entry.milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function IconBadge({ Icon }: { Icon: ComponentType<{ className?: string }> }) {
  return (
    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="size-5" />
    </div>
  )
}
