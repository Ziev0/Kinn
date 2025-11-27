import { InsuranceList } from "@/components/insurance-list"

export const metadata = {
  title: "Probate Services & Pricing",
  description: "All probate processing services we offer with transparent pricing.",
}

export default function InsurancesPage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Probate Services & Pricing</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Explore our probate processing services and transparent pricing. Talk to us for tailored recommendations based on your specific situation.
        </p>

        <div className="mt-8">
          <InsuranceList />
        </div>
      </section>
    </main>
  )
}
