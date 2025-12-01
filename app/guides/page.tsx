// app/guides/page.tsx
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                Comprehensive Probate Guides
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Everything you need to settle an estate, organized by topic.
              </p>
              <p className="mt-2 text-muted-foreground">
                From first steps to final distribution—we've got you covered.
              </p>
              <div className="mx-auto mt-8 max-w-md">
                <Input
                  type="text"
                  placeholder="🔍 Search guides..."
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12">
          {/* State-Specific Guides */}
          <section className="mb-16">
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">STATE-SPECIFIC GUIDES</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* California Guide */}
              <Card className="flex flex-col">
                <div className="aspect-video w-full bg-gradient-to-br from-blue-400 to-blue-600" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    🌴 CALIFORNIA PROBATE GUIDE
                  </CardTitle>
                  <CardDescription className="text-base">The Complete 2025 Edition</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Complete timeline (week-by-week)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>All required forms with instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>County-specific requirements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Cost breakdown and calculator</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Small estate affidavit guide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>50+ sample documents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Video tutorials</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Last Updated: November 2024 | 87 pages</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/guides/california">Read Guide</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/california/download">PDF</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Florida Guide */}
              <Card className="flex flex-col">
                <div className="aspect-video w-full bg-gradient-to-br from-orange-400 to-red-500" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    🌊 FLORIDA PROBATE GUIDE
                  </CardTitle>
                  <CardDescription className="text-base">The Complete 2025 Edition</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Summary vs. formal administration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Homestead exemptions explained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Florida-specific forms</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Timeline and cost estimates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Circuit court requirements</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Last Updated: November 2024 | 62 pages</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/guides/florida">Read Guide</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/florida/download">PDF</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Texas Guide */}
              <Card className="flex flex-col">
                <div className="aspect-video w-full bg-gradient-to-br from-red-500 to-blue-500" />
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    🤠 TEXAS PROBATE GUIDE
                  </CardTitle>
                  <CardDescription className="text-base">The Complete 2025 Edition</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Muniment of title process</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Independent administration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Small estate affidavits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>Texas Estates Code explained</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">✓</span>
                      <span>County variations covered</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Last Updated: November 2024 | 58 pages</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href="/guides/texas">Read Guide</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/guides/texas/download">PDF</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Beginner Guides */}
          <section className="mb-16">
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">BEGINNER GUIDES</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "📘",
                  title: "Probate 101: Complete Beginner's Guide",
                  description: "Start here if you've never dealt with probate before.",
                  learnings: [
                    "What probate is and why it exists",
                    "When probate is required",
                    "Overview of the process",
                    "Common terms explained",
                    "What to expect as executor"
                  ],
                  length: "35 min read",
                  level: "Beginner"
                },
                {
                  icon: "📝",
                  title: "What to Do When Someone Dies",
                  description: "The first 48 hours are critical.",
                  learnings: [
                    "Immediate actions (first 24 hours)",
                    "Who to notify and when",
                    "Securing property and assets",
                    "Death certificate (how many, where)",
                    "Common mistakes to avoid"
                  ],
                  length: "20 min read",
                  level: "Beginner"
                },
                {
                  icon: "👤",
                  title: "Executor's Handbook",
                  description: "Your responsibilities, step-by-step.",
                  learnings: [
                    "Legal duties as executor",
                    "Your fiduciary obligations",
                    "Common executor mistakes",
                    "When to hire help",
                    "How to protect yourself legally"
                  ],
                  length: "45 min read",
                  level: "Beginner"
                }
              ].map((guide, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {guide.icon} {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="mb-2 text-sm font-medium">What you'll learn:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {guide.learnings.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-2">
                    <div className="text-xs text-muted-foreground">
                      <p>Length: {guide.length} | Level: {guide.level}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/guides/${guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        Start Reading →
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Process Guides */}
          <section className="mb-16">
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">PROCESS GUIDES</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: "⏱️",
                  title: "The Complete Probate Timeline",
                  description: "Month-by-month breakdown of what to expect.",
                  contents: [
                    "Month 1: Filing and initial petition",
                    "Months 2-3: Notice and publication period",
                    "Month 3-4: Hearing and appointment",
                    "Months 4-6: Asset discovery",
                    "Months 6-8: Creditor claims period",
                    "Months 8-12: Administration",
                    "Months 12+: Distribution and closing"
                  ],
                  includes: "Gantt chart, deadline calculator, reminder checklist",
                  length: "1 hour read",
                  level: "Intermediate"
                },
                {
                  icon: "📋",
                  title: "Court Forms Masterclass",
                  description: "How to complete every California probate form.",
                  contents: [
                    "DE-111: Petition for Probate (step-by-step)",
                    "DE-121: Order for Probate",
                    "DE-147: Duties and Liabilities",
                    "DE-160: Inventory and Appraisal",
                    "DE-295: Final Petition",
                    "15+ additional forms"
                  ],
                  includes: "Video tutorials, sample completed forms, common errors",
                  length: "2 hours",
                  level: "Intermediate"
                },
                {
                  icon: "🏛️",
                  title: "Court Hearing Preparation Guide",
                  description: "Everything you need for a successful hearing.",
                  contents: [
                    "What to bring (checklist)",
                    "What the judge will ask",
                    "How to dress and behave",
                    "Common hearing mistakes",
                    "What happens after approval",
                    "Troubleshooting (if denied)"
                  ],
                  includes: "10-min video simulation, Q&A script",
                  length: "25 min read",
                  level: "Beginner"
                }
              ].map((guide, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {guide.icon} {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="mb-2 text-sm font-medium">Contents:</p>
                    <ul className="mb-4 space-y-1 text-sm text-muted-foreground">
                      {guide.contents.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Includes:</span> {guide.includes}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-2">
                    <div className="text-xs text-muted-foreground">
                      <p>Length: {guide.length} | Level: {guide.level}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/guides/${guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        {guide.title.includes("Masterclass") ? "Access Masterclass →" : 
                         guide.title.includes("Hearing") ? "Prepare for Hearing →" : "Read Full Timeline →"}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Asset Guides */}
          <section className="mb-16">
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">ASSET GUIDES</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🔍",
                  title: "Asset Discovery: Finding Everything",
                  description: "How to locate all estate assets.",
                  strategies: [
                    "Searching public records",
                    "Using credit reports",
                    "Contacting financial institutions",
                    "Finding hidden accounts",
                    "Digital asset discovery",
                    "Safe deposit boxes",
                    "Unclaimed property databases"
                  ],
                  includes: "25-point checklist, template letters",
                  length: "40 min read",
                  level: "Intermediate"
                },
                {
                  icon: "🏡",
                  title: "Real Estate in Probate",
                  description: "Selling or transferring property during estate settlement.",
                  strategies: [
                    "Court approval requirements",
                    "Appraisal requirements",
                    "Marketing restrictions",
                    "Overbid procedures",
                    "Tax implications",
                    "Transferring to heirs"
                  ],
                  includes: "Sample petition, realtor interview questions",
                  length: "50 min read",
                  level: "Advanced"
                },
                {
                  icon: "💳",
                  title: "Handling Bank Accounts & Investments",
                  description: "Accessing and managing financial assets.",
                  strategies: [
                    "Which accounts go through probate",
                    "POD/TOD designations explained",
                    "Closing vs. retitling accounts",
                    "Estate account setup",
                    "Investment liquidation",
                    "Cryptocurrency and digital assets"
                  ],
                  includes: "Bank notification templates, JTWROS explainer",
                  length: "35 min read",
                  level: "Intermediate"
                }
              ].map((guide, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {guide.icon} {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="mb-2 text-sm font-medium">Topics covered:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {guide.strategies.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-medium">Includes:</span> {guide.includes}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-2">
                    <div className="text-xs text-muted-foreground">
                      <p>Length: {guide.length} | Level: {guide.level}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/guides/${guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        Read {guide.title.split(':')[0]} Guide →
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Additional Sections - Financial Guides */}
          <section className="mb-16">
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">FINANCIAL GUIDES</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "💰",
                  title: "Probate Costs: Complete Breakdown",
                  description: "Understand all fees and how to minimize them.",
                  button: "Calculate Costs →"
                },
                {
                  icon: "📊",
                  title: "Estate Tax Guide",
                  description: "Federal and state estate tax explained.",
                  button: "Read Tax Guide →"
                },
                {
                  icon: "💸",
                  title: "Paying Debts & Creditor Claims",
                  description: "Handling estate debts correctly.",
                  button: "Read Debt Guide →"
                }
              ].map((guide, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {guide.icon} {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Comprehensive guide covering all aspects of {guide.title.toLowerCase().split(':')[0]}.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/guides/${guide.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                        {guide.button}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>

          {/* Download Center & Video Library */}
          <section className="mb-16 grid gap-8 md:grid-cols-2">
            {/* Download Center */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📥 Free Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• California Probate Forms (all DE forms, fillable PDFs)</li>
                  <li>• Executor Task Checklist (printable)</li>
                  <li>• Asset Inventory Spreadsheet (Excel)</li>
                  <li>• Creditor Notice Templates (Word)</li>
                  <li>• Timeline Planner (PDF)</li>
                  <li>• Cost Calculator (Excel)</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/downloads">Access Download Center</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Video Library */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎥 Video Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "10-Minute Probate Overview", desc: "Perfect introduction for complete beginners" },
                    { title: "How to Complete Form DE-111", desc: "Step-by-step form completion tutorial" },
                    { title: "What to Expect at Your Hearing", desc: "Reduce anxiety with this courtroom walkthrough" }
                  ].map((video, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="aspect-video h-16 w-16 flex-shrink-0 rounded bg-muted" />
                      <div>
                        <p className="text-sm font-medium">{video.title}</p>
                        <p className="text-xs text-muted-foreground">{video.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/videos">View All 50+ Videos →</Link>
                </Button>
              </CardFooter>
            </Card>
          </section>

          {/* CTA Sections */}
          <section className="mb-16">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Can't Find What You Need?</CardTitle>
                <CardDescription>We have multiple ways to help you get the information you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/guides/search">Search All Guides</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/assessment/quiz">Ask Our AI Assistant</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/book-call">Talk to a Human</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Get Personalized Guidance</CardTitle>
                <CardDescription>Not sure which guide to start with?</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  We'll recommend the exact guides for your situation.
                </p>
                <Button asChild size="lg">
                  <Link href="/assessment/quiz">Take 2-Min Assessment</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  )
}
