'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Answers = Record<string, any>

export default function AttorneyNeededPage() {
  const [answers, setAnswers] = useState<Answers | null>(null)

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem("quizAnswers")
    if (storedAnswers) setAnswers(JSON.parse(storedAnswers))
  }, [])

  const q3 = (answers?.q3 as string[]) || []
  const flags = {
    disputes: q3.includes("disputes"),
    business: q3.includes("business"),
    multiState: q3.includes("multiple_states"),
    debts: q3.includes("debts"),
    unclearWill: q3.includes("unclear_will"),
  }

  const riskCards = [
    {
      show: true,
      emoji: "🚨",
      title: "Family Dispute Detected",
      body:
        "You indicated disagreements about the will or distribution. Contested estates demand litigation-ready representation.",
    },
    flags.business && {
      show: true,
      emoji: "🏢",
      title: "Business Interests Involved",
      body:
        "Operating businesses and partnerships require specialized legal and tax expertise to keep things compliant and operational.",
    },
    flags.multiState && {
      show: true,
      emoji: "🗺️",
      title: "Assets in Multiple States",
      body:
        "Multi-jurisdiction estates trigger ancillary probate and added filings. Attorney coordination avoids costly missteps.",
    },
    flags.debts && {
      show: true,
      emoji: "💳",
      title: "Significant Debts or Creditor Claims",
      body:
        "Aggressive creditors can file objections that delay probate. You’ll want legal protection against executor liability.",
    },
    flags.unclearWill && {
      show: true,
      emoji: "📄",
      title: "Will Issues Present",
      body: "A missing or vague will invites challenges. Litigation support ensures the judge accepts your filing.",
    },
  ].filter((card): card is { show: true; emoji: string; title: string; body: string } => Boolean(card && card.show))

  return (
    <div className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <section className="rounded-3xl border bg-amber-50 p-8 text-center text-amber-900">
          <p className="text-4xl">⚠️</p>
          <h1 className="mt-4 text-3xl font-semibold">Your situation requires legal expertise.</h1>
          <p className="mt-2 text-base">
            Contested or complex estates can expose you to personal liability. Let’s loop in our attorney-led team from day one.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Here’s why we flagged this:</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {riskCards.map((card) => (
              <Card key={card.title} className="border border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <div className="text-3xl">{card.emoji}</div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl">Recommended: Premium Estate Settlement</CardTitle>
              <p className="text-4xl font-bold text-primary">Starting at $6,999</p>
              <p className="text-sm text-muted-foreground">Pricing varies based on estate complexity.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold">What’s included:</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>✓ Licensed probate attorney oversight from start to finish</li>
                  <li>✓ Litigation support + mediation if disputes escalate</li>
                  <li>✓ Business valuation coordination & tax planning</li>
                  <li>✓ Protection against executor liability claims</li>
                  <li>✓ Unlimited consultations with your legal team</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-muted/40 p-4 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Your attorney will:</p>
                <p className="mt-2">
                  Represent you in court if contested, negotiate with disputing parties, coordinate expert valuations, and
                  keep every jurisdiction compliant.
                </p>
              </div>
              <Button size="lg" className="w-full">
                Schedule Free Attorney Consultation →
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50/60 p-6 space-y-4">
          <div className="flex items-center gap-3 text-amber-900">
            <span className="text-2xl">⚠️</span>
            <p className="font-semibold uppercase tracking-wide">Proceed with caution</p>
          </div>
          <p className="text-sm text-muted-foreground">
            You can start with Full Service ($3,499) and upgrade later, but disputes often escalate once probate starts. Fixing
            DIY mistakes costs more than doing it right the first time.
          </p>
          <Button variant="outline" asChild className="w-full">
            <Link href="/assessment/results?rec=tier4">Start with Full Service ($3,499)</Link>
          </Button>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How Premium pricing works</h2>
          <div className="grid gap-4 text-sm text-muted-foreground">
            <p>• Base fee: $6,999 for estates $1M–$5M</p>
            <p>• Estates over $5M: 2% of gross estate value</p>
            <p>• Litigation (if needed): $300/hr</p>
            <p>• Third-party business valuations: $2,000–$10,000</p>
            <p>• Expert witnesses (rare): billed at cost</p>
          </div>
        </section>

        <section className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Testimonial</p>
          <blockquote className="text-lg italic">
            “There was a dispute over mom&apos;s will. Kinn&apos;s attorney helped us mediate before it went to court. Worth every
            penny for the peace of mind.”
          </blockquote>
          <p className="text-sm font-semibold text-muted-foreground">— The Chen Family, Sacramento</p>
        </section>

        <section className="rounded-3xl border bg-primary/5 p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold">Let’s discuss your situation</h2>
          <p className="text-sm text-muted-foreground">30-minute call • No obligation • Custom proposal delivered same day</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg">Schedule Free Attorney Consultation</Button>
            <Button asChild variant="outline" size="lg">
              <Link href="tel:5551234567">Call us: (555) 123-4567</Link>
            </Button>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Licensed in CA • FL • TX</p>
        </section>
      </div>
    </div>
  )
}
