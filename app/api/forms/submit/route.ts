import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
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

    const { formType, data } = await req.json()

    // Store form data
    const { data: insertedData, error: insertError } = await supabase
      .from("forms")
      .insert([
        {
          user_id: user.id,
          form_type: formType,
          data: data,
          status: "pending",
        },
      ])
      .select()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      formId: insertedData[0].id,
    })
  } catch (error) {
    console.error("[v0] Form submission error:", error)
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 })
  }
}
