import { NextResponse } from "next/server"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { setInvitationStatus } from "@/lib/supabase/queries/invitations"

const publishBodySchema = z.object({
  status: z.enum(["draft", "published"]),
})

export async function POST(
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
  const parsed = publishBodySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 400 })
  }

  const invitation = await setInvitationStatus(supabase, id, parsed.data.status)

  if (!invitation) {
    return NextResponse.json(
      { error: "Undangan tidak ditemukan" },
      { status: 404 }
    )
  }

  return NextResponse.json(invitation)
}
