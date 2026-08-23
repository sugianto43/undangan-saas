"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

type GalleryPhoto = {
  id: string
  signedUrl: string
}

export function GalleryLightbox({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (photos.length === 0) return null

  const activePhoto = openIndex !== null ? photos[openIndex] : null

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            aria-label={`Lihat foto ${index + 1}`}
            className="relative aspect-square overflow-hidden rounded-md"
            onClick={() => setOpenIndex(index)}
          >
            <Image
              src={photo.signedUrl}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition hover:scale-105"
            />
          </button>
        ))}
      </div>

      {activePhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Tutup"
            className="absolute top-4 right-4 text-white hover:bg-white/10 hover:text-white"
            onClick={() => setOpenIndex(null)}
          >
            <XIcon />
          </Button>

          {openIndex! > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Foto sebelumnya"
              className="absolute left-4 text-white hover:bg-white/10 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setOpenIndex((openIndex ?? 0) - 1)
              }}
            >
              <ChevronLeftIcon />
            </Button>
          ) : null}

          <div
            className="relative h-full max-h-[80vh] w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.signedUrl}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {openIndex! < photos.length - 1 ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Foto berikutnya"
              className="absolute right-4 text-white hover:bg-white/10 hover:text-white"
              onClick={(e) => {
                e.stopPropagation()
                setOpenIndex((openIndex ?? 0) + 1)
              }}
            >
              <ChevronRightIcon />
            </Button>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
