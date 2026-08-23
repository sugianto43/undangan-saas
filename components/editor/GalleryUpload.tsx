"use client"

import { useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { ChevronDownIcon, ChevronUpIcon, XIcon } from "lucide-react"
import { MAX_GALLERY_PHOTOS, validatePhotoFile } from "@/lib/validations/photo"
import { useInvitationPhotos } from "@/lib/queries/useInvitationPhotos"
import {
  useDeleteGalleryPhoto,
  useReorderGalleryPhoto,
  useUploadGalleryPhoto,
} from "@/lib/queries/usePhotoMutations"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function GalleryUpload({ invitationId }: { invitationId: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: photos, isLoading } = useInvitationPhotos(invitationId)
  const uploadPhoto = useUploadGalleryPhoto(invitationId)
  const deletePhoto = useDeleteGalleryPhoto(invitationId)
  const reorderPhoto = useReorderGalleryPhoto(invitationId)

  function handleFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ""
    if (files.length === 0) return

    const currentCount = photos?.length ?? 0
    if (currentCount + files.length > MAX_GALLERY_PHOTOS) {
      toast.error(`Maksimal ${MAX_GALLERY_PHOTOS} foto di galeri`)
      return
    }

    files.forEach((file, index) => {
      const validationError = validatePhotoFile(file)
      if (validationError) {
        toast.error(`${file.name}: ${validationError}`)
        return
      }

      uploadPhoto.mutate(
        { file, sortOrder: currentCount + index },
        { onError: (error) => toast.error(error.message) }
      )
    })
  }

  function handleDelete(photoId: string, path: string) {
    deletePhoto.mutate(
      { photoId, path },
      { onError: (error) => toast.error(error.message) }
    )
  }

  function handleMove(index: number, direction: -1 | 1) {
    if (!photos) return
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= photos.length) return

    const current = photos[index]
    const target = photos[targetIndex]

    reorderPhoto.mutate(
      [
        { photoId: current.id, sortOrder: target.sort_order },
        { photoId: target.id, sortOrder: current.sort_order },
      ],
      { onError: (error) => toast.error(error.message) }
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          Galeri ({photos?.length ?? 0}/{MAX_GALLERY_PHOTOS})
        </p>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={handleFilesChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={(photos?.length ?? 0) >= MAX_GALLERY_PHOTOS}
            onClick={() => fileInputRef.current?.click()}
          >
            Tambah foto
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        JPG, PNG, atau WEBP. Maksimal 5MB per file, {MAX_GALLERY_PHOTOS} foto.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
          <Skeleton className="aspect-square" />
        </div>
      ) : null}

      {photos && photos.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {photos.map((photo, index) => (
            <div key={photo.id} className="group relative aspect-square">
              <Image
                src={photo.signedUrl}
                alt="Foto galeri"
                fill
                sizes="(max-width: 640px) 33vw, 25vw"
                className="rounded-md object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-between rounded-md bg-black/0 p-1 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                <div className="flex w-full justify-end">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon-xs"
                    onClick={() => handleDelete(photo.id, photo.url)}
                  >
                    <XIcon />
                  </Button>
                </div>
                <div className="flex w-full justify-center gap-1">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-xs"
                    disabled={index === 0}
                    onClick={() => handleMove(index, -1)}
                  >
                    <ChevronUpIcon />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon-xs"
                    disabled={index === photos.length - 1}
                    onClick={() => handleMove(index, 1)}
                  >
                    <ChevronDownIcon />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !isLoading ? (
        <p className="text-sm text-muted-foreground">Belum ada foto galeri.</p>
      ) : null}
    </div>
  )
}
