"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import type { Wish } from "@/types/wish"

export function useWishes(invitationId: string) {
  return useQuery({
    queryKey: queryKeys.wishes(invitationId),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("wishes")
        .select("id, invitation_id, name, message, created_at")
        .eq("invitation_id", invitationId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data as Wish[]
    },
    enabled: Boolean(invitationId),
  })
}
