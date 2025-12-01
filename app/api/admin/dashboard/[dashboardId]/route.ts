import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

// Get dashboard content
export async function GET(req: NextRequest, { params }: { params: Promise<{ dashboardId: string }> }) {
  try {
    const { dashboardId } = await params
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== "admin@kinn.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get dashboard
    const { data: dashboard, error: dashboardError } = await supabase
      .from("client_dashboards")
      .select("*")
      .eq("id", dashboardId)
      .single()

    if (dashboardError) {
      return NextResponse.json({ error: dashboardError.message }, { status: 500 })
    }

    // Get action items
    const { data: actionItems } = await supabase
      .from("action_items")
      .select("*")
      .eq("dashboard_id", dashboardId)
      .order("created_at", { ascending: false })

    // Get documents
    const { data: documents } = await supabase
      .from("documents")
      .select("*")
      .eq("dashboard_id", dashboardId)
      .order("created_at", { ascending: false })

    // Get messages
    const { data: messages } = await supabase
      .from("messages")
      .select("*")
      .eq("dashboard_id", dashboardId)
      .order("created_at", { ascending: false })

    return NextResponse.json({
      dashboard,
      actionItems: actionItems || [],
      documents: documents || [],
      messages: messages || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching dashboard:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard" }, { status: 500 })
  }
}

// Update dashboard
export async function PUT(req: NextRequest, { params }: { params: Promise<{ dashboardId: string }> }) {
  try {
    const { dashboardId } = await params
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== "admin@kinn.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const { error } = await supabase
      .from("client_dashboards")
      .update({
        current_phase: body.currentPhase,
        progress: body.progress,
        phase_description: body.phaseDescription,
        expected_completion: body.expectedCompletion,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dashboardId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating dashboard:", error)
    return NextResponse.json({ error: "Failed to update dashboard" }, { status: 500 })
  }
}
