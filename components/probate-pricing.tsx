"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PricingTier = {
  id: string
  name: string
  subtitle: string
  price: number
  priceLabel: string
  description: string
  features: string[]
  target: string
  popular?: boolean
  cta: string
}

type AddOnService = {
  name: string
  price: string
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: "free",
    name: "Form Filler",
    subtitle: "Free Tier",
    price: 0,
    priceLabel: "$0",
    description: "Lead generation & validation hook. Let them experience the 'magic' of auto-filled forms.",
    features: [
      "Auto-generate probate petition (1 county)",
      "Download filled PDF forms",
      "Basic deceased information entry",
      "State-specific form selection",
      "Educational resources library",
    ],
    target: "Lead generation & validation hook",
    cta: "Get Started Free",
  },
  {
    id: "starter",
    name: "DIY Executor",
    subtitle: "Starter",
    price: 299,
    priceLabel: "$299",
    description: "Perfect for budget-conscious executors handling simple estates (<$100k, no disputes).",
    features: [
      "Everything in Free",
      "Complete form package (all required probate forms for your county)",
      "Basic executor checklist (static, state-specific)",
      "Asset inventory spreadsheet template",
      "Creditor notification letter templates",
      "30-day email support",
    ],
    target: "Budget-conscious executors handling simple estates (<$100k, no disputes)",
    cta: "Choose Starter",
  },
  {
    id: "pro",
    name: "Executor OS",
    subtitle: "Pro",
    price: 849,
    priceLabel: "$849",
    description: "Most popular choice. Full executor dashboard with dynamic progress tracking and asset discovery.",
    features: [
      "Everything in Starter",
      "Full Executor Dashboard (dynamic progress tracking)",
      "Asset Discovery Engine (searches 5+ national databases)",
      "Heir Collaboration Portal (invite up to 5 family members, read-only access)",
      "Smart deadline reminders (based on your state's requirements)",
      "Inventory & Appraisal auto-generator (court-ready PDF)",
      "Unlimited form revisions",
      "Priority email + chat support",
      "Asset Search Report (branded PDF proof of due diligence)",
    ],
    target: "Most executors. This is your core revenue driver.",
    popular: true,
    cta: "Choose Pro",
  },
  {
    id: "premium",
    name: "Guided Probate",
    subtitle: "Premium",
    price: 1799,
    priceLabel: "$1,799",
    description: "For executors of complex estates ($250k+) who want expert guidance but not full representation.",
    features: [
      "Everything in Pro",
      "3 live video consultations with probate specialist (30 min each)",
      "Document review service (we check your forms before filing)",
      "Court filing checklist (county-specific requirements)",
      "Extended asset discovery (we manually research 3 additional leads)",
      "Tax prep guidance (connect to CPA network)",
      "Final distribution calculator (splits assets by intestacy laws or will)",
      "90-day support",
    ],
    target: "Executors of complex estates ($250k+) who want expert guidance but not full representation",
    cta: "Choose Premium",
  },
  {
    id: "enterprise",
    name: "White-Glove Probate",
    subtitle: "Enterprise",
    price: 3999,
    priceLabel: "$3,999",
    description: "High-net-worth estates ($500k+) or executors who want maximum hand-holding.",
    features: [
      "Everything in Premium",
      "Unlimited consultations (phone/video, 6-month access)",
      "Full document preparation (we fill everything for you)",
      "Court filing service (we submit on your behalf via eFiling portal)",
      "Attorney referral network (for disputes/litigation)",
      "Final accounting preparation (court-ready financial reports)",
      "Dedicated success manager",
    ],
    target: "High-net-worth estates ($500k+) or executors who want maximum hand-holding",
    cta: "Choose Enterprise",
  },
]

const ADD_ON_SERVICES: AddOnService[] = [
  { name: "Rush Form Generation (24-hour turnaround)", price: "$99" },
  { name: "Additional County Forms (if deceased owned property in multiple counties)", price: "$149 per county" },
  { name: "Deep Asset Investigation (manual research on specific leads)", price: "$299" },
  { name: "Creditor Claims Management (templates + dispute letters)", price: "$199" },
  { name: "Real Estate Transfer Kit (deeds, title transfer docs)", price: "$249" },
  { name: "Extra Heir Seats (beyond 5 collaborators)", price: "$29 per seat" },
  { name: "Annual Access Extension (keep dashboard active beyond 12 months)", price: "$199/year" },
]

export function ProbatePricing() {
  return (
    <div className="space-y-16">
      {/* Main Pricing Tiers */}
      <div>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Choose Your Plan</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Select the plan that best fits your probate needs
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative flex flex-col",
                tier.popular && "border-primary shadow-lg lg:scale-[1.02]",
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    ⭐ Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription className="text-xs">{tier.subtitle}</CardDescription>
                </div>
                <div className="mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{tier.priceLabel}</span>
                    {tier.price > 0 && (
                      <span className="text-sm text-muted-foreground">one-time</span>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <div>
                  <p className="mb-2 text-xs font-medium">What's Included:</p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="mt-0.5 text-primary">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {tier.target && (
                  <div className="mt-4 rounded-md bg-muted/50 p-2">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Target:</span> {tier.target}
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  <Link href="/book-call">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Add-On Services */}
      <div>
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Add-On Services</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Enhance your plan with these à la carte services
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ADD_ON_SERVICES.map((service, idx) => (
            <Card key={idx} className="flex flex-row items-center justify-between">
              <CardContent className="flex-1 py-4">
                <p className="text-sm font-medium">{service.name}</p>
              </CardContent>
              <CardContent className="py-4">
                <p className="text-sm font-semibold text-primary">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

