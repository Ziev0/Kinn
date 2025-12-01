// app/blog/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Kinn Consultancy Blog
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Learn everything about probate, estate settlement, and inheritance.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="border-b py-8">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="🔍 Search articles..."
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Topics</option>
                  <option>Getting Started</option>
                  <option>Costs & Fees</option>
                  <option>Forms & Documents</option>
                </select>
                <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>States</option>
                  <option>California</option>
                  <option>Florida</option>
                  <option>Texas</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Article */}
              <section className="mb-16">
                <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight">FEATURED ARTICLES</h2>
                <Card className="overflow-hidden">
                  <div className="aspect-video w-full bg-muted" />
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      How Much Does Probate Cost in California? (2025 Update)
                    </CardTitle>
                    <CardDescription>
                      Attorney fees typically range from $10,000-$18,000 for a $500K estate. Here's the complete breakdown of costs—and how to save thousands.
                    </CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>By Sarah Chen</span>
                      <span>•</span>
                      <span>8 min read</span>
                      <span>•</span>
                      <span>Updated Nov 2024</span>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/blog/probate-costs-california">Read Full Guide →</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </section>

              {/* Latest Articles */}
              <section>
                <h2 className="mb-6 font-serif text-2xl font-semibold tracking-tight">LATEST ARTICLES</h2>
                <div className="space-y-8">
                  {/* Article 1 */}
                  <article className="grid gap-6 border-b pb-8 md:grid-cols-3">
                    <div className="aspect-video w-full rounded-lg bg-muted md:col-span-1" />
                    <div className="md:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📅 November 28, 2024</span>
                        <span>•</span>
                        <span>12 min read</span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        <Link href="/blog/california-small-estate-affidavit" className="hover:text-primary">
                          California Small Estate Affidavit: Complete Guide (2025)
                        </Link>
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Estates under $184,500 can skip full probate. Here's how to use the small estate affidavit process to save time and money.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {["California", "Small Estates", "Forms"].map((tag, index) => (
                            <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" asChild>
                          <Link href="/blog/california-small-estate-affidavit">Read More →</Link>
                        </Button>
                      </div>
                    </div>
                  </article>

                  {/* Article 2 */}
                  <article className="grid gap-6 border-b pb-8 md:grid-cols-3">
                    <div className="aspect-video w-full rounded-lg bg-muted md:col-span-1" />
                    <div className="md:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📅 November 25, 2024</span>
                        <span>•</span>
                        <span>8 min read</span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        <Link href="/blog/what-to-do-after-death" className="hover:text-primary">
                          What to Do Immediately After Someone Dies: Week-by-Week Checklist
                        </Link>
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        The first 30 days are critical. This comprehensive checklist covers everything from securing property to notifying agencies.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {["Getting Started", "Checklists", "Executors"].map((tag, index) => (
                            <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" asChild>
                          <Link href="/blog/what-to-do-after-death">Read More →</Link>
                        </Button>
                      </div>
                    </div>
                  </article>

                  {/* Article 3 */}
                  <article className="grid gap-6 border-b pb-8 md:grid-cols-3">
                    <div className="aspect-video w-full rounded-lg bg-muted md:col-span-1" />
                    <div className="md:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📅 November 22, 2024</span>
                        <span>•</span>
                        <span>15 min read</span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        <Link href="/blog/avoid-probate" className="hover:text-primary">
                          Can You Avoid Probate Entirely? 6 Legal Ways
                        </Link>
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Living trusts, TOD accounts, and joint ownership can help assets skip probate. Here's a complete breakdown of your options.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {["Probate Avoidance", "Estate Planning", "Trusts"].map((tag, index) => (
                            <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" asChild>
                          <Link href="/blog/avoid-probate">Read More →</Link>
                        </Button>
                      </div>
                    </div>
                  </article>

                  {/* Article 4 */}
                  <article className="grid gap-6 border-b pb-8 md:grid-cols-3">
                    <div className="aspect-video w-full rounded-lg bg-muted md:col-span-1" />
                    <div className="md:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📅 November 20, 2024</span>
                        <span>•</span>
                        <span>10 min read</span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        <Link href="/blog/fire-probate-attorney" className="hover:text-primary">
                          How to Fire Your Probate Attorney (And When You Should)
                        </Link>
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Not satisfied with your attorney? Here's how to switch representation mid-probate—and red flags that indicate you should.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {["Attorneys", "Problems", "DIY"].map((tag, index) => (
                            <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" asChild>
                          <Link href="/blog/fire-probate-attorney">Read More →</Link>
                        </Button>
                      </div>
                    </div>
                  </article>

                  {/* Article 5 */}
                  <article className="grid gap-6 pb-8 md:grid-cols-3">
                    <div className="aspect-video w-full rounded-lg bg-muted md:col-span-1" />
                    <div className="md:col-span-2">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <span>📅 November 18, 2024</span>
                        <span>•</span>
                        <span>7 min read</span>
                      </div>
                      <h3 className="mb-2 text-xl font-semibold">
                        <Link href="/blog/probate-real-estate" className="hover:text-primary">
                          Probate Real Estate: Selling a House During Estate Settlement
                        </Link>
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        Selling property in probate requires court approval. Here's the complete process, timeline, and costs involved.
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {["Real Estate", "Assets", "California"].map((tag, index) => (
                            <span key={index} className="rounded-full bg-muted px-2 py-1 text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="ghost" asChild>
                          <Link href="/blog/probate-real-estate">Read More →</Link>
                        </Button>
                      </div>
                    </div>
                  </article>
                </div>

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      ← Previous
                    </Button>
                    <span className="px-3 py-2 text-sm text-muted-foreground">Page 1 of 23</span>
                    <Button variant="outline" size="sm">
                      Next →
                    </Button>
                  </nav>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Topics */}
              <section>
                <h3 className="mb-4 font-serif text-xl font-semibold tracking-tight">POPULAR TOPICS</h3>
                <div className="grid gap-4">
                  {[
                    { icon: "⚖️", title: "Getting Started", items: ["What is Probate?", "Do I Need Probate?", "How Long Does It Take?", "Executor Duties Checklist"] },
                    { icon: "💰", title: "Costs & Fees", items: ["Probate Costs by State", "How to Avoid Attorney Fees", "Court Filing Fees Guide", "Hidden Costs to Watch For"] },
                    { icon: "⏱️", title: "Timeline & Process", items: ["California Probate Timeline", "Step-by-Step Process", "Common Delays & How to Avoid", "Fast-Track Options"] },
                    { icon: "📄", title: "Forms & Documents", items: ["Required California Forms", "How to Fill Out DE-111", "Sample Completed Forms", "Common Form Mistakes"] },
                    { icon: "💼", title: "Assets & Distribution", items: ["Finding All Assets", "Handling Bank Accounts", "Real Estate in Probate", "Digital Assets Guide"] },
                    { icon: "👨‍👩‍👧", title: "Family Situations", items: ["Contested Wills", "No Will? Here's What Happens", "Dealing with Difficult Heirs", "Minor Beneficiaries"] },
                  ].map((topic, index) => (
                    <Card key={index} className="cursor-pointer transition hover:shadow-md">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <span>{topic.icon}</span>
                          {topic.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {topic.items.map((item, itemIndex) => (
                            <li key={itemIndex}>• {item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* State Guides */}
              <section>
                <h3 className="mb-4 font-serif text-xl font-semibold tracking-tight">STATE GUIDES</h3>
                <div className="space-y-4">
                  {[
                    { state: "California", description: "Complete guide to California probate laws, forms, costs, and timeline. Includes county-specific information." },
                    { state: "Florida", description: "Everything you need to know about Florida probate, including summary administration and formal administration." },
                    { state: "Texas", description: "Texas has unique probate options including muniment of title and small estate affidavits. Full breakdown here." },
                  ].map((guide, index) => (
                    <Card key={index} className="cursor-pointer transition hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg">{guide.state} Probate Guide (2025)</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/blog/${guide.state.toLowerCase()}-guide`}>
                            Read {guide.state} Guide →
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Newsletter */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Subscribe to Our Newsletter</CardTitle>
                    <CardDescription>
                      Get weekly probate tips and updates delivered to your inbox.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input type="email" placeholder="Enter your email" />
                      <Button className="w-full">Subscribe</Button>
                    </div>
                    <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                      <p>✓ No spam, ever</p>
                      <p>✓ Unsubscribe anytime</p>
                      <p>✓ Exclusive content for subscribers</p>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Popular Searches */}
              <section>
                <h3 className="mb-4 font-serif text-xl font-semibold tracking-tight">POPULAR SEARCHES</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Probate vs Trust",
                    "How to find hidden bank accounts",
                    "California probate referee fees",
                    "Contesting a will deadline",
                    "Probate without original will",
                    "Can executor sell property without approval",
                    "What debts are forgiven at death",
                    "Probate hearing what to expect",
                  ].map((search, index) => (
                    <span
                      key={index}
                      className="cursor-pointer rounded-full bg-muted px-3 py-1 text-sm transition hover:bg-muted/80"
                    >
                      {search}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="border-t bg-muted/40 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-2xl font-semibold tracking-tight md:text-3xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our AI-powered chatbot can answer probate questions instantly.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild>
                <Link href="/assessment/quiz">Ask a Question</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/assessment/quiz">Take Assessment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
