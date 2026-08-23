"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import type { Rsvp } from "@/types/rsvp"

export function useRsvps(invitationId: string) {
  return useQuery({
    queryKey: queryKeys.rsvps(invitationId),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("rsvps")
        .select("id, invitation_id, guest_name, attending, guest_count, created_at")
        .eq("invitation_id", invitationId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as Rsvp[]
    },
    enabled: Boolean(invitationId),
  })
}
