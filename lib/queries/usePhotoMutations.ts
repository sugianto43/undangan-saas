"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createClient } from "@/lib/supabase/client"
import { queryKeys } from "@/lib/queries/keys"
import {
  coverPhotoPath,
  deletePhoto,
  galleryPhotoPath,
  uploadPhoto,
} from "@/lib/supabase/storage"
import {
  deleteInvitationPhotoRow,
  insertInvitationPhoto,
  updateInvitationCoverPath,
  updateInvitationPhotoOrder,
} from "@/lib/supabase/queries/invitation-photos"

export function useUploadCoverPhoto(invitationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (file: File) => {
      const supabase = createClient()
      const ext = file.name.split(".").pop() ?? "jpg"
      const path = coverPhotoPath(invitationId, ext)
      await uploadPhoto(supabase, path, file)
      await updateInvitationCoverPath(supabase, invitationId, path)
      return path
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.invitation(invitationId),
      })
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations })
    },
  })
}

export function useUploadGalleryPhoto(invitationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      file,
      sortOrder,
    }: {
      file: File
      sortOrder: number
    }) => {
      const supabase = createClient()
      const path = galleryPhotoPath(invitationId, file.name)
      await uploadPhoto(supabase, path, file)
      return insertInvitationPhoto(supabase, invitationId, path, sortOrder)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.photos(invitationId) })
    },
  })
}

export function useDeleteGalleryPhoto(invitationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      photoId,
      path,
    }: {
      photoId: string
      path: string
    }) => {
      const supabase = createClient()
      await deletePhoto(supabase, path)
      await deleteInvitationPhotoRow(supabase, photoId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.photos(invitationId) })
    },
  })
}

export function useReorderGalleryPhoto(invitationId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updates: { photoId: string; sortOrder: number }[]) => {
      const supabase = createClient()
      await Promise.all(
        updates.map(({ photoId, sortOrder }) =>
          updateInvitationPhotoOrder(supabase, photoId, sortOrder)
        )
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.photos(invitationId) })
    },
  })
}
