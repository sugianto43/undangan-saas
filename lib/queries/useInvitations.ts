"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import type { InvitationWithRsvpCount } from "@/types/invitation"

type RsvpCountRow = { count: number }
type InvitationRow = InvitationWithRsvpCount & { rsvps: RsvpCountRow[] }

export function useInvitations() {
  return useQuery({
    queryKey: queryKeys.invitations,
    queryFn: async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("Belum login")
      }

      const { data, error } = await supabase
        .from("invitations")
        .select("*, rsvps(count)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      return (data as InvitationRow[]).map(({ rsvps, ...invitation }) => ({
        ...invitation,
        rsvp_count: rsvps[0]?.count ?? 0,
      }))
    },
  })
}
