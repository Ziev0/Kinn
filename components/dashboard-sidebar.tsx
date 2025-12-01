"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut, LayoutDashboard, FileText, Settings } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase-client"

export function DashboardSidebar() {
  const router = useRouter()
  const supabase = getSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <aside className="w-64 border-r bg-muted/30 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Kinn</h1>
        <p className="text-sm text-muted-foreground">Dashboard</p>
      </div>

      <nav className="space-y-2 mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </Button>
        </Link>
        <Link href="/dashboard/forms">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <FileText className="h-4 w-4" />
            My Forms
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>

      <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" onClick={handleLogout}>
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    </aside>
  )
}
