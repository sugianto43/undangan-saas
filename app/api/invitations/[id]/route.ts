import { NextResponse } from "next/server"
import { invitationSchema } from "@/lib/validations/invitation"
import { createClient } from "@/lib/supabase/server"
import {
  deleteInvitation,
  isSlugTaken,
  updateInvitation,
} from "@/lib/supabase/queries/invitations"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
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

  if (await isSlugTaken(supabase, parsed.data.slug, id)) {
    return NextResponse.json(
      { error: "Slug sudah dipakai, pilih slug lain" },
      { status: 409 }
    )
  }

  const invitation = await updateInvitation(supabase, id, parsed.data)

  if (!invitation) {
    return NextResponse.json(
      { error: "Undangan tidak ditemukan" },
      { status: 404 }
    )
  }

  return NextResponse.json(invitation)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Belum login" }, { status: 401 })
  }

  const deletedCount = await deleteInvitation(supabase, id)

  if (deletedCount === 0) {
    return NextResponse.json(
      { error: "Undangan tidak ditemukan" },
      { status: 404 }
    )
  }

  return new NextResponse(null, { status: 204 })
}
