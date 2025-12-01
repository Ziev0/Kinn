import type { ComponentType } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const metadata = {
  title: "Probate Assessment | Kinn",
  description: "Answer 8 questions and get a personalized plan to settle an estate faster, cheaper, and with confidence.",
}

const learnings = [
  "Whether you can avoid probate entirely",
  "Estimated cost and timeline for your situation",
  "Which service level matches your needs",
  "Potential challenges to prepare for",
]

export default function AssessmentPage() {
  return (
    <main className="bg-background pb-24 pt-16 font-sans">
      <section className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Assessment Quiz</p>
          <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Find the Right Solution for Your Estate
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Answer 8 quick questions and we&apos;ll recommend the best approach for your situation—from DIY tools to
            full-service settlement backed by attorneys.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground">
            {learnings.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/assessment/quiz">
                Start Assessment
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="size-4" />
              <span>
                Your information is confidential.{" "}
                <Link href="/privacy" className="font-semibold text-primary hover:underline">
                  See our privacy policy.
                </Link>
              </span>
            </div>
          </div>
        </div>

        <Card className="relative overflow-hidden border-2 border-dashed border-primary/30 bg-secondary/40 p-10 text-center">
          <div className="mx-auto max-w-md space-y-4">
            <div className="rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Preview
            </div>
            <p className="text-sm font-semibold text-muted-foreground">Interactive Quiz Interface</p>
            <div className="rounded-2xl border bg-card p-6 text-left shadow-sm">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Question 1 • 12% Complete</p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">What&apos;s the estimated value of the estate?</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="rounded-lg border px-4 py-3">Under $100,000</li>
                <li className="rounded-lg border px-4 py-3">$184,500 - $500,000</li>
                <li className="rounded-lg border px-4 py-3">$500,000 - $2,000,000</li>
              </ul>
            </div>
            <p className="text-xs text-muted-foreground">Swipe-friendly • Works on any device</p>
          </div>
        </Card>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-6 px-4 sm:grid-cols-3">
        <InfoStat icon={Clock} label="Time Commitment" value="2 minutes" />
        <InfoStat icon={Star} label="Number of Questions" value="8 total" />
        <InfoStat icon={CheckCircle2} label="Result" value="Instant personalized plan" />
      </section>

      <section className="mx-auto mt-16 max-w-4xl px-4">
        <Card className="grid gap-8 border p-8 md:grid-cols-[1.25fr_0.75fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Trusted by families</p>
            <blockquote className="mt-4 text-lg italic text-foreground">
              “The quiz helped me realize I could use the small estate process instead of full probate. Saved me $1,500!”
            </blockquote>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">— Maria G., San Jose</p>
          </div>
          <div className="rounded-2xl bg-accent/20 p-6 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">What happens after you finish?</p>
            <ul className="mt-3 space-y-2">
              <li>• You get a clear recommendation within seconds</li>
              <li>• We outline the exact steps to take next</li>
              <li>• You can chat with us or schedule a call anytime</li>
            </ul>
          </div>
        </Card>
      </section>
    </main>
  )
}

function InfoStat({ icon: Icon, label, value }: { icon: ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-center shadow-sm">
      <Icon className="mx-auto size-6 text-primary" />
      <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
    </div>
  )
}
