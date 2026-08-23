import type { SupabaseClient } from "@supabase/supabase-js"
import type { InvitationPhoto } from "@/types/invitation-photo"

export async function listInvitationPhotos(
  supabase: SupabaseClient,
  invitationId: string
) {
  const { data, error } = await supabase
    .from("invitation_photos")
    .select("id, invitation_id, url, sort_order, created_at")
    .eq("invitation_id", invitationId)
    .order("sort_order", { ascending: true })

  if (error) throw error
  return data as InvitationPhoto[]
}

export async function insertInvitationPhoto(
  supabase: SupabaseClient,
  invitationId: string,
  path: string,
  sortOrder: number
) {
  const { data, error } = await supabase
    .from("invitation_photos")
    .insert({ invitation_id: invitationId, url: path, sort_order: sortOrder })
    .select()
    .single()

  if (error) throw error
  return data as InvitationPhoto
}

export async function deleteInvitationPhotoRow(
  supabase: SupabaseClient,
  photoId: string
) {
  const { error } = await supabase
    .from("invitation_photos")
    .delete()
    .eq("id", photoId)

  if (error) throw error
}

export async function updateInvitationPhotoOrder(
  supabase: SupabaseClient,
  photoId: string,
  sortOrder: number
) {
  const { error } = await supabase
    .from("invitation_photos")
    .update({ sort_order: sortOrder })
    .eq("id", photoId)

  if (error) throw error
}

export async function updateInvitationCoverPath(
  supabase: SupabaseClient,
  invitationId: string,
  path: string | null
) {
  const { error } = await supabase
    .from("invitations")
    .update({ cover_image_url: path, updated_at: new Date().toISOString() })
    .eq("id", invitationId)

  if (error) throw error
}
