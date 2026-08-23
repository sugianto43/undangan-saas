import "server-only"

import type { SupabaseClient } from "@supabase/supabase-js"
import type { InvitationInput } from "@/lib/validations/invitation"
import type { InvitationWithRsvpCount } from "@/types/invitation"

type RsvpCountRow = { count: number }
type InvitationRow = InvitationWithRsvpCount & { rsvps: RsvpCountRow[] }

export async function listInvitationsWithRsvpCount(
  supabase: SupabaseClient,
  userId: string
) {
  const { data, error } = await supabase
    .from("invitations")
    .select("*, rsvps(count)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error

  return (data as InvitationRow[]).map(({ rsvps, ...invitation }) => ({
    ...invitation,
    rsvp_count: rsvps[0]?.count ?? 0,
  }))
}

export async function isSlugTaken(
  supabase: SupabaseClient,
  slug: string,
  excludeId?: string
) {
  let query = supabase.from("invitations").select("id").eq("slug", slug)
  if (excludeId) {
    query = query.neq("id", excludeId)
  }
  const { data, error } = await query.maybeSingle()
  if (error) throw error
  return data !== null
}

export async function createInvitation(
  supabase: SupabaseClient,
  userId: string,
  input: InvitationInput
) {
  const { data, error } = await supabase
    .from("invitations")
    .insert({
      ...input,
      user_id: userId,
      event_date: new Date(input.event_date).toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateInvitation(
  supabase: SupabaseClient,
  id: string,
  input: InvitationInput
) {
  const { data, error } = await supabase
    .from("invitations")
    .update({
      ...input,
      event_date: new Date(input.event_date).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) throw error
  return data
}

export async function deleteInvitation(supabase: SupabaseClient, id: string) {
  const { error, count } = await supabase
    .from("invitations")
    .delete({ count: "exact" })
    .eq("id", id)

  if (error) throw error
  return count ?? 0
}

export async function setInvitationStatus(
  supabase: SupabaseClient,
  id: string,
  status: "draft" | "published"
) {
  const { data, error } = await supabase
    .from("invitations")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .maybeSingle()

  if (error) throw error
  return data
}
