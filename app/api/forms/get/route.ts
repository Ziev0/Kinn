import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formType = req.nextUrl.searchParams.get("formType")

    let query = supabase.from("forms").select("*").eq("user_id", user.id).order("created_at", { ascending: false })

    if (formType) {
      query = query.eq("form_type", formType)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ forms: data })
  } catch (error) {
    console.error("[v0] Get forms error:", error)
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 })
  }
}
