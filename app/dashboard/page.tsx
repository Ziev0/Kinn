"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalForms: number
  completedForms: number
  totalSpent: number
  subscriptionStatus: string
  firstName: string
  currentEstateName: string
  caseId: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalForms: 0,
    completedForms: 0,
    totalSpent: 0,
    subscriptionStatus: "Free",
    firstName: "User",
    currentEstateName: "Estate",
    caseId: "N/A",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const supabase = getSupabaseClient()

        // Get current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          router.push("/auth/login")
          return
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        const { data: formsData, error: formsError } = await supabase.from("forms").select("*").eq("user_id", user.id)

        const { data: subscriptionData } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)

        const totalForms = formsData?.length || 0
        const completedForms = formsData?.filter((f: any) => f.status === "completed").length || 0
        const totalSpent = subscriptionData?.[0]?.amount || 0
        const subscriptionStatus = subscriptionData?.[0]?.status || "Free"

        const firstName = profileData?.full_name?.split(" ")[0] || "User"
        const currentEstateName = profileData?.current_estate_name || "Your Estate"
        const caseId = profileData?.case_id || "N/A"

        setStats({
          totalForms,
          completedForms,
          totalSpent,
          subscriptionStatus,
          firstName,
          currentEstateName,
          caseId,
        })
        setError(null)
      } catch (err) {
        console.error("[v0] Dashboard error:", err)
        setError("Failed to load dashboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="border-b bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight">Welcome back, {stats.firstName}! 👋</h1>
                <p className="mt-2 text-muted-foreground">
                  Estate of <strong>{stats.currentEstateName}</strong> | Case ID: {stats.caseId}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {stats.subscriptionStatus}
                  </span>
                  <span className="text-sm text-muted-foreground">Forms submitted: {stats.totalForms}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    {stats.totalForms > 0 ? Math.round((stats.completedForms / stats.totalForms) * 100) : 0}% Complete
                  </span>
                </div>
                <Progress
                  value={stats.totalForms > 0 ? Math.round((stats.completedForms / stats.totalForms) * 100) : 0}
                  className="mt-2 w-64"
                />
              </div>
            </div>
          </div>
        </section>
        <div className="grid gap-6 md:grid-cols-2 p-4 mx-auto max-w-6xl py-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">🎯 WHAT YOU NEED TO DO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Urgent Task */}
                <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/20">
                  <div className="flex items-start gap-3">
                    <span className="text-amber-600">[!]</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">Upload Bank Statement</h3>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Wells Fargo account ending in 4392</p>
                      <p className="text-sm text-amber-700 dark:text-amber-300">Due in 3 days</p>
                    </div>
                  </div>
                  <Button className="mt-3 w-full bg-amber-600 hover:bg-amber-700">Upload Now</Button>
                </div>

                {/* Regular Task */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-muted-foreground">[ ]</span>
                    <div className="flex-1">
                      <h3 className="font-semibold">Review Asset List</h3>
                      <p className="text-sm text-muted-foreground">Confirm everything is correct</p>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-3 w-full bg-transparent">
                    Review Assets
                  </Button>
                </div>

                {/* All Caught Up */}
                <div className="text-center text-sm text-green-600">✅ All caught up! No urgent tasks.</div>
              </CardContent>
            </Card>

            {/* Latest Message */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">💬 LATEST MESSAGE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Sarah Martinez (Your Case Manager)</span>
                    <span className="text-sm text-muted-foreground">2 hours ago</span>
                  </div>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    "Good news! The property appraisal is scheduled for March 15. The appraiser will contact you
                    directly..."
                  </blockquote>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Reply
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  View All Messages (3)
                </Button>
              </CardFooter>
            </Card>

            {/* Estate Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📊 ESTATE SUMMARY</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Assets:</span>
                  <span className="font-semibold text-green-600">$487,350</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Debts:</span>
                  <span className="font-semibold text-red-600">-$42,100</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Net Estate:</span>
                  <span className="font-semibold text-blue-600">$445,250</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/assets">View Full Asset List ↓</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📁 DOCUMENTS (24 files)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <span>📄</span>
                  <span>Probate Petition (Filed 3/4/25)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>📄</span>
                  <span>Death Certificate</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>📄</span>
                  <span>Original Will</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>📄</span>
                  <span>Chase Bank Statement</span>
                </div>
                <div className="text-sm text-muted-foreground pl-9">... +20 more</div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Upload Document
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  View All
                </Button>
              </CardFooter>
            </Card>

            {/* Upcoming Milestones */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📅 UPCOMING MILESTONES</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <span className="w-20 font-medium">March 15</span>
                  <span>Property appraisal</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-20 font-medium">March 28</span>
                  <span className="flex items-center gap-2">🏛️ Court hearing at 9:00 AM</span>
                </div>
                <div className="flex gap-4">
                  <span className="w-20 font-medium">April 5</span>
                  <span>Open estate bank account</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="/timeline">View Full Timeline</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Need Help? */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📞 NEED HELP?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                  <Link href="/messages">💬 Message Sarah (responds in &lt;4 hrs)</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                  <Link href="tel:5552345678">📞 Call: (555) 234-5678</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                  <Link href="/help">📚 View Help Articles</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Your Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📊 YOUR STATS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Forms:</span>
                  <span className="font-semibold text-blue-600">{stats.totalForms}</span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-semibold text-green-600">{stats.completedForms}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending:</span>
                  <span className="font-semibold text-amber-600">{stats.totalForms - stats.completedForms}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Total Spent:</span>
                  <span className="font-semibold text-blue-600">${stats.totalSpent.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">⚡ QUICK ACTIONS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                  <Link href="/dashboard/forms">View All Forms</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                  <Link href="/pricing">Upgrade Plan</Link>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent" asChild>
                  <Link href="/assessment/quiz">Start New Assessment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
