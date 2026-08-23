import { describe, expect, it } from "vitest"
import { invitationSchema } from "./invitation"

const validInput = {
  event_type: "wedding" as const,
  title: "Budi & Ani",
  slug: "budi-ani",
  event_date: "2026-06-01T10:00",
  location_text: "Jakarta",
  location_link: "https://maps.google.com/xyz",
  description: "Kami mengundang Anda ke acara pernikahan kami",
  theme_id: "classic" as const,
}

describe("invitationSchema", () => {
  it("menerima data yang valid", () => {
    const result = invitationSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it("menerima location_text, location_link, description kosong", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      location_text: "",
      location_link: "",
      description: "",
    })
    expect(result.success).toBe(true)
  })

  it("menolak event_type di luar enum", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      event_type: "birthday-party",
    })
    expect(result.success).toBe(false)
  })

  it("menolak judul kosong", () => {
    const result = invitationSchema.safeParse({ ...validInput, title: "" })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Judul wajib diisi")
    }
  })

  it("menolak slug dengan huruf kapital atau spasi", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      slug: "Budi Ani",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Slug hanya boleh huruf kecil, angka, dan tanda hubung"
      )
    }
  })

  it("menolak tanggal acara kosong", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      event_date: "",
    })
    expect(result.success).toBe(false)
  })

  it("menolak tanggal acara yang tidak valid", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      event_date: "bukan-tanggal",
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Tanggal & waktu acara tidak valid"
      )
    }
  })

  it("menolak location_link yang bukan URL", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      location_link: "bukan-url",
    })
    expect(result.success).toBe(false)
  })

  it("menolak theme_id di luar enum", () => {
    const result = invitationSchema.safeParse({
      ...validInput,
      theme_id: "flashy",
    })
    expect(result.success).toBe(false)
  })
})
