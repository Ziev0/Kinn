import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

// Create action item
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== "admin@kinn.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const { data, error } = await supabase
      .from("action_items")
      .insert([
        {
          dashboard_id: body.dashboardId,
          priority: body.priority,
          title: body.title,
          description: body.description,
          due_date: body.due,
          button_text: body.button,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("[v0] Error creating action item:", error)
    return NextResponse.json({ error: "Failed to create action item" }, { status: 500 })
  }
}

// Delete action item
export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify admin
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user || user.email !== "admin@kinn.com") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get("id")

    const { error } = await supabase.from("action_items").delete().eq("id", itemId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting action item:", error)
    return NextResponse.json({ error: "Failed to delete action item" }, { status: 500 })
  }
}
