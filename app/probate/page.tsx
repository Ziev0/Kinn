import { ProbatePricing } from "@/components/probate-pricing"

export const metadata = {
  title: "Probate Services & Pricing",
  description: "Choose the right probate plan for your needs. From free form filling to white-glove service.",
}

export default function ProbatePage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl font-serif">
            Probate Services & Pricing
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed text-muted-foreground md:text-base">
            Transparent pricing for every probate need. From simple form filling to comprehensive estate administration.
          </p>
        </div>

        <ProbatePricing />
      </section>
    </main>
  )
}

