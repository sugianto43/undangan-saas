import { NextResponse } from "next/server"
import { invitationSchema } from "@/lib/validations/invitation"
import { createClient } from "@/lib/supabase/server"
import { createInvitation, isSlugTaken } from "@/lib/supabase/queries/invitations"

export async function POST(request: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Belum login" }, { status: 401 })
  }

  const body = await request.json()
  const parsed = invitationSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data tidak valid", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  if (await isSlugTaken(supabase, parsed.data.slug)) {
    return NextResponse.json(
      { error: "Slug sudah dipakai, pilih slug lain" },
      { status: 409 }
    )
  }

  const invitation = await createInvitation(supabase, user.id, parsed.data)
  return NextResponse.json(invitation, { status: 201 })
}
