import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export const metadata = {
  title: "Verify Email - Kinn",
  description: "Verify your email to complete signup",
}

export default function VerifyEmailPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Check Your Email</CardTitle>
        <CardDescription>We sent you a verification link</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Click the link in your email to verify your account and get started with Kinn.
        </p>
        <Button asChild variant="outline" className="w-full bg-transparent">
          <Link href="/auth/login">Back to Sign In</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
