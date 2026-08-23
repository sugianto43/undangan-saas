import { describe, expect, it } from "vitest"
import { MAX_PHOTO_SIZE_BYTES, validatePhotoFile } from "./photo"

function makeFile(type: string, size: number): File {
  const blob = new Blob([new Uint8Array(size)], { type })
  return new File([blob], "photo.jpg", { type })
}

describe("validatePhotoFile", () => {
  it("menerima file jpg di bawah 5MB", () => {
    const file = makeFile("image/jpeg", 1024)
    expect(validatePhotoFile(file)).toBeNull()
  })

  it("menerima file png dan webp", () => {
    expect(validatePhotoFile(makeFile("image/png", 1024))).toBeNull()
    expect(validatePhotoFile(makeFile("image/webp", 1024))).toBeNull()
  })

  it("menolak format selain jpg/png/webp", () => {
    const file = makeFile("image/gif", 1024)
    expect(validatePhotoFile(file)).toBe("Format file harus JPG, PNG, atau WEBP")
  })

  it("menolak file lebih dari 5MB", () => {
    const file = makeFile("image/jpeg", MAX_PHOTO_SIZE_BYTES + 1)
    expect(validatePhotoFile(file)).toBe("Ukuran file maksimal 5MB")
  })

  it("menerima file tepat 5MB", () => {
    const file = makeFile("image/jpeg", MAX_PHOTO_SIZE_BYTES)
    expect(validatePhotoFile(file)).toBeNull()
  })
})
