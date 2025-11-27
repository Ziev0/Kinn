"use client"

import type React from "react"
import { useState } from "react"

type Review = {
  id: string
  name: string
  rating: number
  comment: string
  createdAt: string
}

export function ReviewSection() {
  const [items, setItems] = useState<Review[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  function addReview(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !comment) return
    const review: Review = {
      id: crypto.randomUUID(),
      name,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    }
    setItems((prev) => [review, ...prev])
    setName("")
    setRating(5)
    setComment("")
  }

  return (
    <div className="space-y-8">
      <form onSubmit={addReview} className="rounded-lg border p-5">
        <h2 className="text-lg font-medium">Add your review</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm">Your name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="Jane Doe"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm">Rating</span>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              aria-label="Rating out of 5"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {r} / 5
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="mt-4 flex flex-col gap-2">
          <span className="text-sm">Comment</span>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            placeholder="Tell us about your experience..."
          />
        </label>
        <div className="mt-4">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Submit review
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your experience.</p>
        ) : (
          items.map((r) => (
            <article key={r.id} className="rounded-lg border p-5">
              <header className="flex items-center justify-between gap-3">
                <h3 className="text-base font-medium">{r.name}</h3>
                <span className="text-sm text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</span>
              </header>
              <p className="mt-1 text-sm">Rating: {r.rating} / 5</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.comment}</p>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
