import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

// Get all clients (admin only)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== "admin@kinn.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all client dashboards with user info
    const { data, error } = await supabase
      .from("client_dashboards")
      .select(
        `
        id,
        user_id,
        estate_name,
        case_id,
        current_phase,
        progress,
        user_profiles!inner(full_name, email)
      `,
      )
      .order("updated_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Transform data for admin dashboard
    const clients = data.map((dashboard: any) => ({
      id: dashboard.case_id || `CASE-${dashboard.id.slice(0, 8)}`,
      name: dashboard.user_profiles.full_name,
      decedent: dashboard.estate_name || "Unknown Estate",
      tier: "Concierge",
      phase: dashboard.current_phase,
      progress: dashboard.progress,
      status: "active",
      dashboardId: dashboard.id,
      userId: dashboard.user_id,
    }))

    return NextResponse.json(clients)
  } catch (error) {
    console.error("[v0] Error fetching clients:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}
