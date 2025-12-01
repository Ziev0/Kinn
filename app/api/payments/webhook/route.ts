import stripe from "@/lib/stripe"
import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (error) {
    console.error("[v0] Webhook error:", error)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any
    const userId = session.metadata.userId
    const planName = session.metadata.planName

    // Store payment record
    await supabase.from("payments").insert([
      {
        user_id: userId,
        stripe_payment_intent_id: session.payment_intent,
        amount_cents: session.amount_total,
        currency: session.currency,
        status: "completed",
        metadata: {
          planName,
          sessionId: session.id,
        },
      },
    ])

    // Create subscription record
    await supabase.from("subscriptions").insert([
      {
        user_id: userId,
        plan_name: planName,
        status: "active",
        current_period_start: new Date(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    ])
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as any
    const paymentIntentId = charge.payment_intent

    // Update payment status
    await supabase.from("payments").update({ status: "refunded" }).eq("stripe_payment_intent_id", paymentIntentId)
  }

  return NextResponse.json({ received: true })
}
