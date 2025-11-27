import { BookingForm } from "@/components/booking-form"

export const metadata = {
  title: "Book a Call",
  description: "Schedule a consultation call with our team.",
}

export default function BookCallPage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-xl px-4 py-10 md:py-16">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Book a consultation</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Pick a date and time that works best for you. We’ll follow up with details.
        </p>

        <div className="mt-8">
          <BookingForm />
        </div>
      </section>
    </main>
  )
}
