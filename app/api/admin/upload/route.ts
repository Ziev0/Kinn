import { createClient } from "@/lib/supabase-server"
import { type NextRequest, NextResponse } from "next/server"

// Upload file to Supabase Storage
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

    const formData = await req.formData()
    const file = formData.get("file") as File
    const dashboardId = formData.get("dashboardId") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const fileBuffer = await file.arrayBuffer()
    const filePath = `admin-uploads/${dashboardId}/${Date.now()}-${file.name}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("files").upload(filePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("files").getPublicUrl(filePath)

    // Store reference in database
    const { data: fileRecord, error: dbError } = await supabase
      .from("file_uploads")
      .insert([
        {
          user_id: user.id,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type,
          storage_path: filePath,
        },
      ])
      .select()

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      fileUrl: urlData.publicUrl,
      filePath: filePath,
      fileId: fileRecord[0].id,
    })
  } catch (error) {
    console.error("[v0] Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
