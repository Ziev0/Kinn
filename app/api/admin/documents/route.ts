import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

// Create document
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
      .from("documents")
      .insert([
        {
          dashboard_id: body.dashboardId,
          name: body.name,
          file_url: body.fileUrl,
          date_info: body.date,
          note: body.note,
          signed: body.signed,
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("[v0] Error creating document:", error)
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }
}

// Delete document
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
    const docId = searchParams.get("id")

    const { error } = await supabase.from("documents").delete().eq("id", docId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting document:", error)
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }
}
