import type { SupabaseClient } from "@supabase/supabase-js"

export const PHOTO_BUCKET = "invitation-photos"

export function coverPhotoPath(invitationId: string, fileExt: string) {
  return `${invitationId}/cover.${fileExt}`
}

export function galleryPhotoPath(invitationId: string, fileName: string) {
  const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`
  const ext = fileName.split(".").pop()
  return `${invitationId}/gallery/${unique}.${ext}`
}

export async function uploadPhoto(
  supabase: SupabaseClient,
  path: string,
  file: File
) {
  const { error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .upload(path, file, { upsert: true })

  if (error) throw error
}

export async function deletePhoto(supabase: SupabaseClient, path: string) {
  const { error } = await supabase.storage.from(PHOTO_BUCKET).remove([path])
  if (error) throw error
}

export async function getSignedPhotoUrl(
  supabase: SupabaseClient,
  path: string,
  expiresIn = 3600
) {
  const { data, error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .createSignedUrl(path, expiresIn)

  if (error) throw error
  return data.signedUrl
}

export async function getSignedPhotoUrls(
  supabase: SupabaseClient,
  paths: string[],
  expiresIn = 3600
) {
  if (paths.length === 0) return []

  const { data, error } = await supabase.storage
    .from(PHOTO_BUCKET)
    .createSignedUrls(paths, expiresIn)

  if (error) throw error
  return data.map((entry) => entry.signedUrl)
}
