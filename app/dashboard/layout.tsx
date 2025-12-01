import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export const metadata = {
  title: "Dashboard - Kinn",
  description: "Your Kinn dashboard",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
