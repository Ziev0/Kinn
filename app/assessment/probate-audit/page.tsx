'use client'

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Answers = Record<string, any>

export default function ProbateAuditPage() {
  const [answers, setAnswers] = useState<Answers | null>(null)

  useEffect(() => {
    const storedAnswers = sessionStorage.getItem("quizAnswers")
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers))
    }
  }, [])

  const estateValue = answers?.q1
  const q2 = (answers?.q2 as string[]) || []

  const reasonCards = [
    {
      show: estateValue === "under_100k" || estateValue === "100k_to_184k",
      emoji: "💰",
      title: "Estate Under $184,500",
      body:
        "California’s small-estate affidavit can release funds in 6-8 weeks with no court hearing—far faster than probate.",
    },
    {
      show: q2.includes("living_trust"),
      emoji: "🏦",
      title: "Living Trust Detected",
      body: "Assets titled in a revocable or irrevocable trust transfer directly to beneficiaries—no probate required.",
    },
    {
      show:
        q2.includes("pod_accounts") ||
        q2.includes("joint_accounts") ||
        q2.includes("life_insurance") ||
        q2.includes("retirement_accounts"),
      emoji: "👥",
      title: "Beneficiary Designations In Place",
      body: "POD/TOD accounts, joint ownership, life insurance, and retirement accounts bypass probate automatically.",
    },
  ].filter((card) => card.show)

  return (
    <div className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <section className="rounded-3xl border bg-primary/5 p-8 text-center">
          <p className="text-4xl">🎉</p>
          <h1 className="mt-4 text-3xl font-semibold">Great news! You might avoid probate entirely.</h1>
          <p className="mt-3 text-base text-muted-foreground">
            Based on your answers, full probate may not be required. Let’s confirm the fastest, cheapest path forward.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Here’s why we flagged this:</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {reasonCards.map((card) => (
              <Card key={card.title} className="border">
                <CardHeader>
                  <div className="text-4xl">{card.emoji}</div>
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
              <CardTitle className="text-2xl">Get certainty with a Probate Avoidance Audit</CardTitle>
              <p className="text-4xl font-bold text-primary">$499 one-time</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="font-semibold">You’ll receive:</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>✓ Asset-by-asset review (probate vs. non-probate)</li>
                  <li>✓ Written plan outlining exact forms and steps</li>
                  <li>✓ 30-minute consultation call with our specialists</li>
                  <li>✓ $499 credit toward any service tier if probate is still required</li>
                </ul>
              </div>
              <Button size="lg" className="w-full">
                Get Probate Audit ($499) →
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                If probate isn’t needed, you save thousands. If it is, we’ll apply your audit fee to the right service tier.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Or skip the audit if you&#39;re certain</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Small Estate Affidavit Service</CardTitle>
                <p className="text-2xl font-bold text-primary">$799</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>We prepare and file the affidavit, contact every institution, and facilitate direct transfers.</p>
                <p>Timeline: 6-8 weeks • No court hearing required.</p>
                <Button className="w-full" variant="outline">
                  Start Small Estate Process
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Living Trust Transfer Service</CardTitle>
                <p className="text-2xl font-bold text-primary">$1,499</p>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>We work with the successor trustee to move every asset into the trust and complete distributions.</p>
                <p>Timeline: 8-12 weeks • Avoid probate entirely.</p>
                <Button className="w-full" variant="outline">
                  Start Trust Transfer
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-3xl border bg-muted/40 p-6">
          <h3 className="text-lg font-semibold">What if we discover probate is still required?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            No problem. Your audit delivers a definitive answer and a clear recommendation. If probate is needed, we’ll tell you
            which tier to choose and credit your $499 toward that service—so you never pay twice.
          </p>
        </section>

        <section className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Testimonial</p>
          <blockquote className="text-lg italic">
            “I almost paid for full probate service. The audit showed me I could use the small estate process instead. Saved me
            $1,500 and 4 months!”
          </blockquote>
          <p className="text-sm font-semibold text-muted-foreground">— Maria G., San Jose</p>
        </section>

        <section className="rounded-3xl border bg-primary/5 p-8 text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to get clarity?</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg">Get Probate Audit ($499) →</Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book-call">Talk to someone first (free call)</Link>
            </Button>
          </div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">No obligation • 48-hour turnaround</p>
        </section>
      </div>
    </div>
  )
}
