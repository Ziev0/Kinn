import Link from "next/link"

export default function Home() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-5xl px-4 py-16 md:py-24">
        <header className="mb-12">
          <span className="inline-block rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            Independent. Personal. Transparent.
          </span>
          <h1 className="text-balance mt-5 text-4xl font-semibold tracking-tight md:text-6xl font-serif">
            Protect what matters with clarity and confidence.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A small, personal platform offering comprehensive probate support with honest pricing and friendly guidance—so you
           can focus on honoring your loved one.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/insurances"
              className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              View coverages & prices
            </Link>
            <Link
              href="/book-call"
              className="inline-flex items-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Book a call
            </Link>
            <Link
              href="/reviews"
              className="inline-flex items-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Read reviews
            </Link>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Feature title="Clear pricing" desc="Upfront prices for each policy type—no hidden fees." />
          <Feature title="Personal service" desc="Talk to a real person who knows your situation." />
          <Feature title="Fast solutions" desc="Step-by-step guidance to help you complete probate quickly and correctly." />
        </div>
      </section>
    </main>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border p-5">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}
