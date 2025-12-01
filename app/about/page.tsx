// about-page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                About Kinn Consultancy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Modern legal solutions for the probate process
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              {/* Left Column - Story */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
                    How It All Started
                  </h2>
                  <div className="mt-4 h-1 w-12 bg-primary/60"></div>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p className="leading-relaxed">
                    Kinn Consultancy was established in Los Angeles, California on the principle that with the help of modern technology a small law firm should be able to offer the same level of legal advice as an outdated big law firm at a more affordable cost and in less then half the time.
                  </p>
                  
                  <p className="leading-relaxed">
                    At Kinn, we believe that all of our clients are equally valuable and we work towards assisting each client on an individual basis to ensure we can obtain an optimal outcome.
                  </p>
                  
                  <p className="leading-relaxed">
                    Our unique combination of legal experience and technocreativity allows us to come up with creative, practical and fast solutions to a variety of probate problems. We embrace technology and keep our overhead low to ensure our clients receive the maximum value for their dollar.
                  </p>
                </div>
              </div>

              {/* Right Column - Values & Approach */}
              <div className="space-y-8">
                {/* Mission Card */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold">Our Mission</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    To democratize access to quality probate legal services through technology, making the process faster, more affordable, and less stressful for executors and families.
                  </p>
                </div>

                {/* Values Card */}
                <div className="rounded-lg border bg-card p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg">💡</span>
                  </div>
                  <h3 className="text-xl font-semibold">Our Approach</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Technology-driven solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Personalized client service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Transparent pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span>
                      <span>Continuous innovation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">500+</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">Estates Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">40%</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">Faster Processing</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">$2M+</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">Client Savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary md:text-3xl">50+</div>
                <div className="mt-1 text-xs text-muted-foreground md:text-sm">Counties Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/40 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Ready to Simplify Your Probate Process?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start with our free assessment to see how we can help you navigate probate with confidence.
            </p>
            <div className="mt-8">
              <a
                href="/assessment/quiz"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Start Free Assessment
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
