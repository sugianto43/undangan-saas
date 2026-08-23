import { NextResponse } from "next/server"
import { rsvpRequestSchema } from "@/lib/validations/rsvp"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const body = await request.json()
  const parsed = rsvpRequestSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("rsvps")
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    return NextResponse.json(
      { error: "Undangan tidak ditemukan atau tidak menerima RSVP" },
      { status: 403 }
    )
  }

  return NextResponse.json(data, { status: 201 })
}
