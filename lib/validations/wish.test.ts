import { describe, expect, it } from "vitest"
import { wishInputSchema, wishRequestSchema } from "./wish"

const validInput = {
  name: "Ani",
  message: "Selamat menempuh hidup baru!",
}

describe("wishInputSchema", () => {
  it("menerima data yang valid", () => {
    const result = wishInputSchema.safeParse(validInput)
    expect(result.success).toBe(true)
  })

  it("menolak nama kosong", () => {
    const result = wishInputSchema.safeParse({ ...validInput, name: "" })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Nama wajib diisi")
    }
  })

  it("menolak pesan kosong", () => {
    const result = wishInputSchema.safeParse({ ...validInput, message: "" })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Ucapan wajib diisi")
    }
  })

  it("menolak pesan lebih dari 500 karakter", () => {
    const result = wishInputSchema.safeParse({
      ...validInput,
      message: "a".repeat(501),
    })
    expect(result.success).toBe(false)
  })
})

describe("wishRequestSchema", () => {
  it("menolak invitation_id yang bukan uuid", () => {
    const result = wishRequestSchema.safeParse({
      ...validInput,
      invitation_id: "bukan-uuid",
    })
    expect(result.success).toBe(false)
  })

  it("menerima payload lengkap dengan invitation_id valid", () => {
    const result = wishRequestSchema.safeParse({
      ...validInput,
      invitation_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    })
    expect(result.success).toBe(true)
  })
})
