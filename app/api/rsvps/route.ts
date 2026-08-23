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
  // No .select() here on purpose: rsvps has no public SELECT policy (RSVP
  // status is host-only), and RETURNING is subject to RLS SELECT checks too,
  // so requesting the row back would make every anon insert fail.
  const { error } = await supabase.from("rsvps").insert(parsed.data)

  if (error) {
    return NextResponse.json(
      { error: "Undangan tidak ditemukan atau tidak menerima RSVP" },
      { status: 403 }
    )
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
