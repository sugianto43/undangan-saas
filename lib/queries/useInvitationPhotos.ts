"use client"

import { useQuery } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import { listInvitationPhotos } from "@/lib/supabase/queries/invitation-photos"
import { getSignedPhotoUrls } from "@/lib/supabase/storage"

export function useInvitationPhotos(invitationId: string) {
  return useQuery({
    queryKey: queryKeys.photos(invitationId),
    queryFn: async () => {
      const supabase = createClient()
      const photos = await listInvitationPhotos(supabase, invitationId)
      const signedUrls = await getSignedPhotoUrls(
        supabase,
        photos.map((photo) => photo.url)
      )

      return photos.map((photo, index) => ({
        ...photo,
        signedUrl: signedUrls[index],
      }))
    },
    enabled: Boolean(invitationId),
  })
}
