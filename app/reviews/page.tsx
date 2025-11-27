import { ReviewSection } from "@/components/review-section"

export const metadata = {
  title: "Customer Reviews",
  description: "Read and share experiences with our insurance services.",
}

export default function ReviewsPage() {
  return (
    <main className="font-sans">
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Customer Reviews</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Real-time reviews coming soon. For now, you can add a review locally below.
        </p>

        <div className="mt-8">
          <ReviewSection />
        </div>
      </section>
    </main>
  )
}
