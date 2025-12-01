"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface PricingCardProps {
  name: string
  description: string
  price: number
  period: string
  features: string[]
  isPopular?: boolean
  stripePriceId: string
}

export function PricingCard({
  name,
  description,
  price,
  period,
  features,
  isPopular = false,
  stripePriceId,
}: PricingCardProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stripePriceId,
          planName: name,
        }),
      })

      const data = await response.json()
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      console.error("[v0] Checkout error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={isPopular ? "border-primary shadow-lg" : ""}>
      {isPopular && <Badge className="absolute top-4 right-4 bg-primary">Most Popular</Badge>}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-2">/{period}</span>
        </div>

        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full"
          variant={isPopular ? "default" : "outline"}
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? "Processing..." : "Get Started"}
        </Button>
      </CardContent>
    </Card>
  )
}
