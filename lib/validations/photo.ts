export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024
export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"]
export const MAX_GALLERY_PHOTOS = 10

export function validatePhotoFile(file: File): string | null {
  if (!ALLOWED_PHOTO_TYPES.includes(file.type)) {
    return "Format file harus JPG, PNG, atau WEBP"
  }
  if (file.size > MAX_PHOTO_SIZE_BYTES) {
    return "Ukuran file maksimal 5MB"
  }
  return null
}
