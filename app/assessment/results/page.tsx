'use client'

import Link from "next/link"

import React, { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TIER_INFO, type Tier } from "@/lib/quiz-data"
import type { ScoringResult } from "@/lib/quiz-scoring"

type TierFeature = {
  includes: string[]
  timeline: string
  nextStep: string
  ctaLabel: string
}

const TIER_FEATURES: Record<Tier, TierFeature> = {
  tier1: {
    includes: [
      "Step-by-step DIY portal with templates",
      "AI-composed court forms you can file yourself",
      "Email support during business hours",
      "Estate checklist + deadline tracker",
    ],
    timeline: "8-10 months (self-paced)",
    nextStep: "Download your starter packet",
    ctaLabel: "Start DIY Probate",
  },
  tier2: {
    includes: [
      "AI generates all required documents in 24 hours",
      "Guided filing instructions for your county",
      "Live chat support for quick questions",
      "Deadline reminders + step-by-step roadmap",
    ],
    timeline: "7-8 months on average",
    nextStep: "Upload will and death certificate",
    ctaLabel: "Start AI-Powered Probate",
  },
  tier3: {
    includes: [
      "AI generates all court documents in 24 hours",
      "Licensed paralegal review + 30-minute prep call",
      "We file everything with the court for you",
      "Hearing preparation coaching and checklists",
      "Phone support throughout business hours",
      "6-month completion guarantee",
    ],
    timeline: "6-7 months from start to finish",
    nextStep: "Upload will and death certificate",
    ctaLabel: "Start My Concierge Probate",
  },
  tier4: {
    includes: [
      "Dedicated case lead + full-service document prep",
      "We manage court filings, deadlines, and logistics",
      "Asset discovery support + creditor coordination",
      "Court hearing attendance where permitted",
      "Weekly progress updates + status dashboard",
    ],
    timeline: "5-6 months from onboarding",
    nextStep: "Schedule onboarding call",
    ctaLabel: "Begin Full Service Probate",
  },
  tier5: {
    includes: [
      "Licensed probate attorney oversight",
      "Litigation support + mediation coordination",
      "Business valuation + multi-state coordination",
      "Estate tax planning (Form 706) when needed",
      "Unlimited strategy sessions",
    ],
    timeline: "Varies by complexity",
    nextStep: "Book attorney consultation",
    ctaLabel: "Start Premium Estate Settlement",
  },
}

const COMPARISON_TIERS: Tier[] = ["tier2", "tier3", "tier4"]

const COMPARISON_ROWS = [
  { label: "Price", values: { tier2: "$999", tier3: "$1,999", tier4: "$3,499" } },
  { label: "AI document generation", values: { tier2: "✓", tier3: "✓", tier4: "✓" } },
  { label: "Paralegal / human review", values: { tier2: "—", tier3: "✓ (30 min call)", tier4: "✓ (unlimited)" } },
  { label: "We file with the court", values: { tier2: "—", tier3: "✓", tier4: "✓" } },
  { label: "Asset discovery", values: { tier2: "You handle", tier3: "You handle (we guide)", tier4: "We handle" } },
  { label: "Creditor management", values: { tier2: "You handle", tier3: "You handle", tier4: "We handle" } },
  { label: "Court hearing support", values: { tier2: "Prep guide", tier3: "We attend (where allowed)", tier4: "We attend" } },
  { label: "Phone support", values: { tier2: "—", tier3: "✓", tier4: "✓" } },
  { label: "Timeline guarantee", values: { tier2: "—", tier3: "6 months", tier4: "6 months" } },
]

const ESTATE_CONTEXT: Record<string, string> = {
  under_100k: "is on the simpler side—perfect for lighter-weight support.",
  "100k_to_184k": "sits just below California's small-estate threshold.",
  "184k_to_500k": "is mid-range and benefits from guided expertise.",
  "500k_to_2m": "is substantial—structure and oversight prevent delays.",
  over_2m: "has higher stakes that deserve professional review.",
  unsure: "needs clarity, and we'll help you confirm exact numbers.",
}

const PAPERWORK_CONTEXT: Record<string, string> = {
  very: "You’re confident handling details once you have a roadmap.",
  somewhat: "You want step-by-step guidance to avoid mistakes.",
  not_really: "You’d prefer experts to tackle the tricky sections.",
  not_at_all: "You want a team to handle the paperwork for you.",
}

const PRIORITY_CONTEXT: Record<string, string> = {
  cost: "Budget matters most—you still get professional guardrails without attorney fees.",
  speed: "Speed is critical—Concierge keeps the process moving week by week.",
  accuracy: "Accuracy is your priority—every document is human-reviewed before filing.",
  hands_off: "You want peace of mind—our team handles the heavy lifting.",
}

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [result, setResult] = useState<ScoringResult | null>(null)
  const [answers, setAnswers] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    const storedResult = sessionStorage.getItem("quizResult")
    const storedAnswers = sessionStorage.getItem("quizAnswers")

    if (storedResult) {
      const parsed: ScoringResult = JSON.parse(storedResult)
      if (parsed.primary === "PROBATE_AUDIT_UPSELL") {
        router.push("/assessment/probate-audit")
        return
      }
      if (parsed.primary === "WAITLIST") {
        router.push("/assessment/waitlist")
        return
      }
      if (parsed.primary === "ATTORNEY_NEEDED") {
        router.push("/assessment/attorney-needed")
        return
      }
      setResult(parsed)
    }
    if (storedAnswers) setAnswers(JSON.parse(storedAnswers))

    const outcome = searchParams.get("outcome")
    if (outcome === "PROBATE_AUDIT_UPSELL") {
      router.push("/assessment/probate-audit")
    } else if (outcome === "WAITLIST") {
      router.push("/assessment/waitlist")
    } else if (outcome === "ATTORNEY_NEEDED") {
      router.push("/assessment/attorney-needed")
    }
  }, [router, searchParams])

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading your personalized plan…</p>
      </div>
    )
  }

  const primaryTier = TIER_INFO[result.primary]
  const tierFeature = TIER_FEATURES[result.primary as Tier] ?? TIER_FEATURES.tier3
  const estateValue = answers?.q1
  const paperworkComfort = answers?.q4
  const hasDisputes = Array.isArray(answers?.q3) && answers?.q3.includes("disputes")
  const topPriority = Array.isArray(answers?.q6) ? answers?.q6[0] : answers?.q6

  const reasons = [
    estateValue ? `Your estate ${ESTATE_CONTEXT[estateValue] ?? "benefits from guided support."}` : null,
    paperworkComfort ? PAPERWORK_CONTEXT[paperworkComfort] : null,
    hasDisputes ? "There may be tension, so professional oversight protects you." : "No disputes flagged—perfect for a streamlined process.",
    topPriority ? PRIORITY_CONTEXT[topPriority] : null,
  ].filter(Boolean) as string[]

  const curatedAlternatives: Array<{ title: string; tier: Tier; body: string; button: string }> = [
    {
      title: "Want to save money?",
      tier: "tier2",
      body: "If you're comfortable filing at the courthouse yourself, AI-Powered Probate keeps costs low while automating paperwork.",
      button: "Choose AI-Powered",
    },
    {
      title: "Want full service?",
      tier: "tier4",
      body: "If you’d rather stay hands-off, Full Service Probate manages filings, creditors, and distributions end-to-end.",
      button: "Choose Full Service",
    },
  ]

  const contextualFaq = useMemo(() => {
    const faqs = [
      {
        question: "What happens at the court hearing?",
        answer:
          "Hearings typically last 15 minutes. The judge confirms you’re willing to serve as executor and that your petition is accurate. We prep you beforehand—and in Concierge and Full Service tiers, we can attend with you where permitted.",
      },
      {
        question: "How do I know if I found all the assets?",
        answer:
          "You’ll get a comprehensive asset discovery checklist covering public records, credit reports, and institution outreach. In Full Service, our team handles that outreach for you.",
      },
    ]

    if (!hasDisputes) {
      faqs.push({
        question: "What if a family member objects later?",
        answer:
          "Based on your answers, disputes seem unlikely. If anything changes, you can upgrade to Premium ($6,999+) for attorney representation and mediation support—your original payment is credited.",
      })
    }

    return faqs
  }, [hasDisputes])

  return (
    <div className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <section className="rounded-3xl border bg-primary/5 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Assessment Complete</p>
          <h1 className="mt-3 text-3xl font-semibold">Here’s your personalized plan.</h1>
          <p className="mt-3 text-base text-muted-foreground">
            We analyzed your answers and matched you with the probate path that balances cost, speed, and support.
          </p>
        </section>

        <section>
          <Card className="border-2 border-primary">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <Badge className="mb-3 bg-primary text-primary-foreground">✓ Best Match For You</Badge>
                <CardTitle className="text-3xl">{primaryTier.name}</CardTitle>
                <p className="text-4xl font-bold text-primary">{primaryTier.price}</p>
                <p className="text-lg text-muted-foreground">“{primaryTier.tagline}”</p>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Timeline:</span> {tierFeature.timeline}
                </p>
                <p>
                  <span className="font-semibold text-foreground">Next step:</span> {tierFeature.nextStep}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <p className="font-semibold">Perfect for your situation because:</p>
                <ul className="mt-3 space-y-2">
                  {reasons.map((reason) => (
                    <li key={reason} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold">What’s included:</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                  {tierFeature.includes.map((item) => (
                    <li key={item} className="rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  {tierFeature.ctaLabel} →
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Prefer to talk it through?{" "}
                  <Link href="/book-call" className="font-semibold text-primary hover:underline">
                    Schedule a free 15-min call
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Compare your options</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {curatedAlternatives.map((alt) => {
              const tier = TIER_INFO[alt.tier]
              return (
                <Card key={alt.tier} className="border">
                  <CardHeader>
                    <p className="text-sm font-semibold text-primary">{alt.title}</p>
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className="text-2xl font-bold text-primary">{tier.price}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{alt.body}</p>
                    <Button variant="outline" className="w-full">
                      {alt.button}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50 text-left">
                      <th className="p-4">Feature</th>
                      {COMPARISON_TIERS.map((tier) => (
                        <th key={tier} className="p-4 text-center">
                          {TIER_INFO[tier].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.label} className="border-b">
                        <td className="p-4 font-medium text-foreground">{row.label}</td>
                        {COMPARISON_TIERS.map((tier) => (
                          <td key={tier} className="p-4 text-center text-muted-foreground">
                            {row.values[tier]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          <p className="text-right text-sm text-muted-foreground">
            Need more detail?{" "}
            <Link href="/pricing" className="font-semibold text-primary hover:underline">
              See all 5 tiers compared →
            </Link>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Questions about your situation?</h2>
          <div className="space-y-4">
            {contextualFaq.map((faq) => (
              <Card key={faq.question}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Real results from families like yours</h2>
          <Card className="overflow-hidden border">
            <CardContent className="grid gap-6 p-6 md:grid-cols-2 md:items-center">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-primary">Video testimonial</p>
                <h3 className="text-xl font-semibold">Sarah settled a $600K estate using Concierge</h3>
                <p className="text-sm text-muted-foreground">
                  “I was quoted $16,000 by an attorney. Kinn charged $1,999 and it was done in 5 months. The paralegal was so
                  patient with all my questions.”
                </p>
                <Button variant="outline" className="w-fit">
                  Watch Sarah’s story
                </Button>
              </div>
              <div className="rounded-3xl bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Outcome snapshot</p>
                <p className="mt-2">• $18,000 saved vs. attorney quote</p>
                <p>• 5-month completion</p>
                <p>• Court hearing prep + filing handled</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border bg-primary/5 p-8">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-semibold">Ready to get started?</h2>
            <p className="text-sm text-muted-foreground">
              $1,999 • 6-Month Guarantee • Full Support • 100% Money-Back Promise (if we don’t beat a traditional attorney quote)
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg">{tierFeature.ctaLabel} →</Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/book-call">Schedule free 15-min consultation</Link>
              </Button>
            </div>
            <div className="mt-4 grid gap-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:grid-cols-3">
              <p>🔒 SOC 2 Certified</p>
              <p>📞 Questions? (555) 123-4567</p>
              <p>✉️ support@kinn.com</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
