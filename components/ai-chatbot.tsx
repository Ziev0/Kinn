"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Message = { role: "user" | "assistant"; content: string }

export function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! How can I help today?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTop = viewportRef.current.scrollHeight
    }
  }, [messages, open])

  async function onSend(e: React.FormEvent) {
    e.preventDefault()
    const content = input.trim()
    if (!content || loading) return

    const next = [...messages, { role: "user", content }]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (data?.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }])
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn’t get a response." }])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "There was an error contacting the AI service. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        aria-label={open ? "Close AI Chatbot" : "Open AI Chatbot"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "fixed z-40 bottom-5 right-5 h-12 w-12 rounded-full",
          "bg-neutral-900 text-neutral-100 shadow-lg ring-1 ring-neutral-700",
          "hover:bg-neutral-800 transition-colors",
        )}
      >
        AI
      </button>

      {open && (
        <Card
          role="dialog"
          aria-label="AI Chatbot"
          className={cn(
            "fixed z-50 bottom-20 right-5 w-[320px] sm:w-[360px]",
            "bg-neutral-950 text-neutral-100 border border-neutral-800 shadow-2xl",
          )}
        >
          <div className="p-3 border-b border-neutral-800">
            <div className="font-serif text-lg">Kinn AI Assistant</div>
            <div className="text-xs text-neutral-400">Ask about coverage, pricing, or consultations</div>
          </div>

          <div ref={viewportRef} className="px-3 py-3 max-h-[340px] overflow-y-auto space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("leading-relaxed", m.role === "user" ? "text-neutral-100" : "text-neutral-200")}
              >
                <span className="font-medium mr-1">{m.role === "user" ? "You:" : "AI:"}</span>
                <span className="text-pretty">{m.content}</span>
              </div>
            ))}
            {loading && <div className="text-neutral-400">Thinking…</div>}
          </div>

          <form onSubmit={onSend} className="p-3 border-t border-neutral-800 flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="bg-neutral-900 border-neutral-800 text-neutral-100 placeholder:text-neutral-500"
              aria-label="Message"
            />
            <Button type="submit" disabled={loading} className="bg-neutral-100 text-neutral-900 hover:bg-white">
              Send
            </Button>
          </form>
        </Card>
      )}
    </>
  )
}
