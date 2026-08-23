import { NextResponse } from "next/server"
import { wishRequestSchema } from "@/lib/validations/wish"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = wishRequestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("wishes")
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Undangan tidak ditemukan atau tidak menerima ucapan" },
      { status: 403 }
    )
  }

  return NextResponse.json(data, { status: 201 })
}
