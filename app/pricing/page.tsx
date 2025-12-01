import Link from "next/link"
import { PricingCard } from "@/components/pricing-card"
import { Button } from "@/components/ui/button"

const pricingPlans = [
  {
    name: "DIY Probate Kit",
    description: "Simple estates",
    price: 299,
    period: "one-time",
    features: [
      "Document templates",
      "Form filling guidance",
      "Email support",
      "30-day access",
      "Basic filing checklist",
    ],
    stripePriceId: "price_diy_kit", // Replace with actual Stripe price ID
  },
  {
    name: "AI-Powered Probate",
    description: "Tech-savvy families",
    price: 999,
    period: "one-time",
    features: [
      "All DIY features",
      "AI document generation",
      "Court form automation",
      "Email & chat support",
      "Priority processing",
      "Asset discovery tool",
    ],
    stripePriceId: "price_ai_probate", // Replace with actual Stripe price ID
    isPopular: true,
  },
  {
    name: "Concierge Probate",
    description: "Most families",
    price: 1999,
    period: "one-time",
    features: [
      "All AI features",
      "Paralegal review",
      "Creditor management",
      "Phone support",
      "Document verification",
      "Court filing assistance",
    ],
    stripePriceId: "price_concierge", // Replace with actual Stripe price ID
  },
  {
    name: "Full Service Probate",
    description: "Hands-off service",
    price: 3499,
    period: "one-time",
    features: [
      "All Concierge features",
      "Attorney oversight",
      "Dispute mediation",
      "Estate accounting",
      "Tax guidance",
      "24/7 support",
    ],
    stripePriceId: "price_full_service", // Replace with actual Stripe price ID
  },
  {
    name: "Premium Estate Settlement",
    description: "Complex estates",
    price: 6999,
    period: "custom",
    features: [
      "Everything included",
      "Dedicated attorney",
      "Litigation support",
      "International assets",
      "Trust administration",
      "Custom solutions",
    ],
    stripePriceId: "price_premium", // Replace with actual Stripe price ID
  },
]

export default function PricingPage() {
  return (
    <main className="space-y-16 bg-background pb-24 pt-16 font-sans">
      <section className="mx-auto max-w-5xl px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Pricing</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
          Transparent Pricing. No Hidden Fees.
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Every tier includes document preparation and filing support. Higher tiers add human review, asset discovery,
          creditor management, and attorney oversight.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/assessment/quiz">Take the quiz to find your tier</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/book-call">Schedule a pricing consult</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              isPopular={plan.isPopular}
              stripePriceId={plan.stripePriceId}
            />
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-semibold text-primary">
          <Link href="/probate" className="hover:underline">
            See detailed comparison table
          </Link>
          <Button asChild size="sm">
            <Link href="/assessment/quiz">Take quiz to find your tier</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
