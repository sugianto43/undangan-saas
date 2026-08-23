import "server-only"

import type { SupabaseClient } from "@supabase/supabase-js"
import type { PublicInvitation } from "@/types/invitation"

export async function getPublishedInvitationBySlug(
  supabase: SupabaseClient,
  slug: string
) {
  const { data, error } = await supabase
    .from("invitations")
    .select(
      "id, title, event_type, event_date, location_text, location_link, description, cover_image_url"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()

  if (error) throw error
  return data as PublicInvitation | null
}
