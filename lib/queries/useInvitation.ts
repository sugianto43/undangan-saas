"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import type { Invitation } from "@/types/invitation"

export function useInvitation(id: string) {
  return useQuery({
    queryKey: queryKeys.invitation(id),
    queryFn: async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("invitations")
        .select("*")
        .eq("id", id)
        .single()

      if (error) throw error

      return data as Invitation
    },
    enabled: Boolean(id),
  })
}
