"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase-client"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error("[v0] Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      setUser(null)
      window.location.href = "/"
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="inline-flex items-center gap-2">
          <Image src="/placeholder-logo.png" alt="Kinn" width={24} height={24} className="h-12 w-12" />
          <span className="font-serif text-lg font-semibold tracking-tight">Kinn Consultancy</span>
        </Link>

        {!isLoading && !user && (
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <Link className="transition hover:text-primary" href="/how-it-works">
              How It Works
            </Link>
            <Link className="transition hover:text-primary" href="/pricing">
              Pricing
            </Link>
            <Link className="transition hover:text-primary" href="/blog">
              Blog
            </Link>
            <Link className="transition hover:text-primary" href="/login">
              Login
            </Link>
            <Link
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-primary-foreground transition hover:opacity-90"
              href="/assessment/quiz"
            >
              Start Assessment
            </Link>
          </nav>
        )}

        {!isLoading && user && (
          <nav className="hidden md:flex items-center gap-5 text-sm">
            <Link className="transition hover:text-primary" href="/dashboard">
              Dashboard
            </Link>
            <Link className="transition hover:text-primary" href="/pricing">
              Pricing
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="transition hover:text-primary">
              Logout
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
