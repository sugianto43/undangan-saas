"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import { getSignedPhotoUrl } from "@/lib/supabase/storage"

export function useSignedPhotoUrl(path: string | null | undefined) {
  return useQuery({
    queryKey: queryKeys.signedPhotoUrl(path ?? ""),
    queryFn: async () => {
      const supabase = createClient()
      return getSignedPhotoUrl(supabase, path as string)
    },
    enabled: Boolean(path),
  })
}
