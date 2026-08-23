import { describe, expect, it } from "vitest"
import { rsvpInputSchema, rsvpRequestSchema } from "./rsvp"

const validInput = {
  guest_name: "Budi",
  attending: "yes" as const,
  guest_count: 2,
}

describe("rsvpInputSchema", () => {
  it("menerima data yang valid", () => {
    const result = rsvpInputSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it("menolak guest_count berupa string", () => {
    const result = rsvpInputSchema.safeParse({
      ...validInput,
      guest_count: "3",
    })
    expect(result.success).toBe(false)
  })

  it("menolak nama kosong", () => {
    const result = rsvpInputSchema.safeParse({ ...validInput, guest_name: "" })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nama wajib diisi")
    }
  })

  it("menolak attending di luar enum", () => {
    const result = rsvpInputSchema.safeParse({
      ...validInput,
      attending: "sure",
    })
    expect(result.success).toBe(false)
  })

  it("menolak jumlah tamu kurang dari 1", () => {
    const result = rsvpInputSchema.safeParse({ ...validInput, guest_count: 0 })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Jumlah tamu minimal 1")
    }
  })

  it("menolak jumlah tamu lebih dari 20", () => {
    const result = rsvpInputSchema.safeParse({ ...validInput, guest_count: 21 })
    expect(result.success).toBe(false)
  })
})

describe("rsvpRequestSchema", () => {
  it("menolak invitation_id yang bukan uuid", () => {
    const result = rsvpRequestSchema.safeParse({
      ...validInput,
      invitation_id: "bukan-uuid",
    })
    expect(result.success).toBe(false)
  })

  it("menerima payload lengkap dengan invitation_id valid", () => {
    const result = rsvpRequestSchema.safeParse({
      ...validInput,
      invitation_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    })
    expect(result.success).toBe(true)
  })
})
