import type { NextRequest } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Requires OPENAI_API_KEY to be set in Project Settings > Environment Variables
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const prompt = Array.isArray(messages)
      ? messages
          .map(
            (m: { role: "user" | "assistant"; content: string }) =>
              `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`,
          )
          .join("\n")
      : "User: Hello\nAssistant:"

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system:
        "You are a concise, friendly assistant for Kinn Consultancy (an insurance consultancy). " +
        "Answer briefly, clearly, and invite users to book a consultation if helpful.",
      prompt,
    })

    return new Response(JSON.stringify({ text }), {
      headers: { "content-type": "application/json" },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Unknown error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }
}
