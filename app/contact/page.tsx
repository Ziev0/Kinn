import Link from "next/link"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: "Contact Us",
  description: "Get in touch or book a consultation call.",
}

export default function ContactPage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Contact Us</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          We're here to help. Send us a message or book a call for a personal consultation.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <ContactForm />

          <div className="rounded-lg border p-5">
            <h2 className="text-lg font-medium">Book a consultation</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose a time that works for you. We'll confirm and send a calendar invite.
            </p>
            <div className="mt-4">
              <Link
                href="/book-call"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Book a call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
