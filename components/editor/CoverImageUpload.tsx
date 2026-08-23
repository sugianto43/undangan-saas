"use client"

import { useRef } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { validatePhotoFile } from "@/lib/validations/photo"
import { useSignedPhotoUrl } from "@/lib/queries/useSignedPhotoUrl"
import { useUploadCoverPhoto } from "@/lib/queries/usePhotoMutations"
import { Button } from "@/components/ui/button"

export function CoverImageUpload({
  invitationId,
  coverPath,
}: {
  invitationId: string
  coverPath: string | null
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: signedUrl } = useSignedPhotoUrl(coverPath)
  const uploadCover = useUploadCoverPhoto(invitationId)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file) return

    const validationError = validatePhotoFile(file)
    if (validationError) {
      toast.error(validationError)
      return
    }

    uploadCover.mutate(file, {
      onSuccess: () => toast.success("Cover berhasil diunggah"),
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Cover</p>
      <div className="flex items-center gap-4">
        {signedUrl ? (
          <Image
            src={signedUrl}
            alt="Cover undangan"
            width={128}
            height={96}
            priority
            className="h-24 w-32 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-24 w-32 items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
            Belum ada cover
          </div>
        )}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploadCover.isPending}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadCover.isPending ? "Mengunggah..." : "Ganti cover"}
          </Button>
          <p className="mt-1 text-xs text-muted-foreground">
            JPG, PNG, atau WEBP. Maksimal 5MB.
          </p>
        </div>
      </div>
    </div>
  )
}
