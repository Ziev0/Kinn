import type { ComponentType } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CalendarX2, FileWarning, Play, WalletMinimal } from "lucide-react"

import { Button } from "@/components/ui/button"

const problemColumns = [
  {
    icon: CalendarX2,
    title: "12-18 Months of Waiting",
    body:
      "Traditional probate drags on for over a year. Court dates get postponed. Paperwork sits in piles. Your family's life is on hold.",
  },
  {
    icon: WalletMinimal,
    title: "$15,000+ in Hidden Fees",
    body:
      "Attorneys charge 3-7% of the estate value. A $500K estate costs $15,000+ in legal fees. That's money your family should inherit.",
  },
  {
    icon: FileWarning,
    title: "Confusing Legal Maze",
    body:
      "47 different court forms. Cryptic legal language. One mistake can delay everything by months. You're left guessing what to do next.",
  },
]

const quizQuestions = [
  "What's the estimated value of the estate?",
  "Are there any family disputes?",
  "How comfortable are you with paperwork?",
]

const videoTestimonials = [
  {
    name: "Sarah M.",
    detail: "Settled $650K estate in 5 months",
    quote: "I saved $18,000 compared to the lawyer quote I got. The paralegal was amazing.",
    thumbnail: "Woman, 50s, in living room",
  },
  {
    name: "James T.",
    detail: "Used AI-Powered tier",
    quote: "I did the quiz, uploaded documents, and 48 hours later had perfect court forms.",
    thumbnail: "Man, 40s, in home office",
  },
  {
    name: "The Chen Family",
    detail: "Premium tier",
    quote: "There was a dispute over the will. Their attorney helped us mediate and avoid court.",
    thumbnail: "Two women, sisters",
  },
]

const writtenTestimonials = [
  {
    quote:
      "After my dad passed, I was overwhelmed. Kinn's paralegal walked me through everything. I can't imagine doing this alone.",
    author: "Rebecca L., Los Angeles",
  },
  {
    quote:
      "The AI tool was incredible. It asked me questions in plain English and generated all my court forms automatically.",
    author: "Michael P., San Diego",
  },
  {
    quote: "Worth every penny. I paid $1,999 instead of $14,000. Done in 5 months instead of 18.",
    author: "Jennifer K., San Francisco",
  },
]

export default function Home() {
  return (
    <main className="space-y-24 bg-background pb-24 font-sans">
      <HeroSection />
      <ProblemSection />
      <SolutionPreview />
      <SocialProof />
      <FinalCTA />
    </main>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full Width Background Image - Starts at top of page */}
      <div className="absolute inset-0">
        <Image
          src="/hero-image.jpg"
          alt="Family discussing estate matters in a comfortable setting"
          fill
          className="object-cover object-right"
          priority
        />
        {/* Gradient overlay fading from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/100 via-background/20 to-transparent"></div>
      </div>
      
      {/* Text Content Overlay */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-4 md:pt-24 md:pb-24">
        <header className="mx-4 my-4">
          <span className="inline-block rounded-full border border-foreground/20 bg-background/10 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
            Independent. Personal. Transparent.
          </span>
          <h1 className="text-balance mt-5 font-serif text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Protect what matters with clarity and confidence.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
            A small, personal platform offering comprehensive probate support with honest pricing and friendly guidance—so you
            can focus on honoring your loved one.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/assessment/quiz">Start Free Assessment</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book-call">Schedule a Call</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/reviews">Read Reviews</Link>
            </Button>
          </div>
        </header>
      </div>
    </section>
  )
}

function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      {/*<p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Problem</p>*/}
      <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">Probate Is Broken. We Fixed It.</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {problemColumns.map((column) => (
          <div key={column.title} className="rounded-2xl border bg-card p-6 shadow-sm">
            <IconBadge Icon={column.icon} />
            <h3 className="mt-4 text-xl font-semibold">{column.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{column.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-base font-medium text-muted-foreground">There's a better way...</p>
    </section>
  )
}

function SolutionPreview() {
  return (
    <section className="mx-auto max-w-5xl px-4">
      <div className="rounded-3xl border bg-muted/30 p-8 md:p-12">
        <h2 className="mt-3 font-serif text-3xl">What's the Right Solution for YOUR Situation?</h2>
        <p className="mt-4 text-base text-muted-foreground">
          Every estate is different. Take our 2-minute assessment and get a personalized plan.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {quizQuestions.map((question) => (
            <div key={question} className="rounded-2xl border bg-card p-4 text-sm text-muted-foreground">
              {question}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/assessment/quiz">
              Start Free Assessment
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">No credit card required • Takes 2 minutes • Instant results</p>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <h2 className="mt-3 font-serif text-3xl md:text-4xl">Real Families. Real Results.</h2>
      {/* <div className="mt-8 grid gap-6 md:grid-cols-3">
        {videoTestimonials.map((testimonial) => (
          <article key={testimonial.name} className="relative rounded-3xl border bg-card p-6 shadow-sm">
            <IconBadge Icon={Play} />
            <p className="mt-4 text-sm font-medium text-muted-foreground">{testimonial.thumbnail}</p>
            <h3 className="mt-2 text-xl font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-muted-foreground">{testimonial.detail}</p>
            <p className="mt-4 text-base italic">&ldquo;{testimonial.quote}&rdquo;</p>
          </article>
        ))}
      </div> */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {writtenTestimonials.map((testimonial) => (
          <blockquote key={testimonial.author} className="rounded-3xl border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
            “{testimonial.quote}”
            <footer className="mt-4 font-semibold text-foreground">{testimonial.author}</footer>
          </blockquote>
        ))}
      </div>
      <div className="mt-8 rounded-3xl border bg-primary text-primary-foreground">
        <div className="grid gap-4 px-6 py-5 text-center text-sm font-semibold md:grid-cols-4">
          <p>500+ estates settled</p>
          <p>$47M distributed to families</p>
          <p>4.9★ average rating</p>
          <p>6-month avg. completion</p>
        </div>
      </div>

    </section>
  )
}

function FinalCTA() {
  return (
    <section className="mx-auto max-w-4xl px-4">
      <div className="rounded-3xl border bg-primary/5 p-10 text-center">
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Ready to Get Started?</h2>
        <p className="mt-4 text-base text-muted-foreground">
          Join 500+ families who chose the smarter way to settle an estate.
        </p>
        <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-center">
          <Button asChild size="lg">
            <Link href="/assessment/quiz">Take the 2-Minute Assessment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/book-call">Schedule a free 15-min consultation</Link>
          </Button>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <li>✓ No credit card required</li>
          <li>✓ Instant personalized results</li>
          <li>✓ See exact pricing for your situation</li>
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          <span>BBB Accredited</span>
          <span>SOC 2 Certified</span>
          <span>Licensed in CA, FL, TX</span>
        </div>
      </div>
    </section>
  )
}

function IconBadge({ Icon }: { Icon: ComponentType<{ className?: string }> }) {
  return (
    <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="size-5" />
    </div>
  )
}
