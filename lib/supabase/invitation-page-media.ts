import "server-only"

import type { SupabaseClient } from "@supabase/supabase-js"
import { listInvitationPhotos } from "@/lib/supabase/queries/invitation-photos"
import { getSignedPhotoUrl, getSignedPhotoUrls } from "@/lib/supabase/storage"

export async function getInvitationPageMedia(
  supabase: SupabaseClient,
  invitationId: string,
  coverPath: string | null
) {
  const [coverUrl, photos] = await Promise.all([
    coverPath ? getSignedPhotoUrl(supabase, coverPath) : Promise.resolve(null),
    listInvitationPhotos(supabase, invitationId),
  ])

  const galleryUrls = await getSignedPhotoUrls(
    supabase,
    photos.map((photo) => photo.url)
  )

  const galleryPhotos = photos
    .map((photo) => ({ id: photo.id, signedUrl: galleryUrls.get(photo.url) }))
    .filter((photo): photo is { id: string; signedUrl: string } =>
      Boolean(photo.signedUrl)
    )

  return { coverUrl, galleryPhotos }
}
