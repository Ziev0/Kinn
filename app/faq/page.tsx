import Link from "next/link"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

const faqItems = [
  {
    question: "Can I avoid probate entirely?",
    answer:
      "Maybe! About 40% of estates can avoid full probate using small estate affidavits, living trusts, or beneficiary designations. Our assessment will tell you if you qualify. If so, we offer specialized services starting at $499.",
  },
  {
    question: "How long does probate take?",
    answer:
      "With Kinn: 6-7 months on average. With a traditional attorney: 12-18 months. We use AI to speed up document preparation and track every deadline automatically so nothing slips through the cracks.",
  },
  {
    question: "What if my situation is complex?",
    answer:
      "Our Premium tier includes a licensed attorney who handles complex situations: family disputes, business interests, estates over $2M, multi-state property, or contested wills. We'll guide you to the right solution.",
  },
  {
    question: "Do I still need to go to court?",
    answer:
      "For most probate cases, yes—there's one short hearing (15 minutes) where the judge approves you as executor. We prepare you completely, and in our Concierge and Full Service tiers, we can attend with you or appear on your behalf where allowed.",
  },
  {
    question: "What states do you serve?",
    answer: "Currently California, Florida, and Texas. We're expanding to 15 more states in 2025. Join our waitlist if you're in another state.",
  },
  {
    question: "Is this legal?",
    answer:
      "Yes! We're a licensed and bonded legal document preparation service. For complex cases requiring legal advice, we partner with licensed attorneys. We follow all California Business & Professions Code requirements.",
  },
  {
    question: "What's included in each tier?",
    answer:
      "Every tier includes document preparation and filing support. Higher tiers add human review, asset discovery, creditor management, and attorney oversight. Take our quiz to see which fits your needs.",
  },
  {
    question: "What happens if I start with a lower tier and need more help?",
    answer:
      "You can upgrade anytime! Many customers start with AI-Powered and upgrade to Concierge once they realize the complexity. We credit your original payment toward the new tier.",
  },
]

export default function FAQPage() {
  return (
    <main className="space-y-16 bg-background pb-24 pt-16 font-sans">
      <section className="mx-auto max-w-4xl px-4 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">FAQ</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">Common Questions</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Straight answers about probate timelines, requirements, and how Kinn supports every step.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-2xl border px-4">
              <AccordionTrigger className="text-left text-base font-semibold">{item.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl border bg-card p-6">
          <div>
            <p className="text-lg font-semibold">Still have questions?</p>
            <p className="text-sm text-muted-foreground">Reach out and we’ll help you choose the right path forward.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Chat with us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/book-call">Schedule a call</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
