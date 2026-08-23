import { describe, expect, it } from "vitest"
import { authCredentialsSchema } from "./auth"

describe("authCredentialsSchema", () => {
  it("menerima email dan password valid", () => {
    const result = authCredentialsSchema.safeParse({
      email: "user@example.com",
      password: "rahasia123",
    })

    expect(result.success).toBe(true)
  })

  it("menolak email dengan format tidak valid", () => {
    const result = authCredentialsSchema.safeParse({
      email: "bukan-email",
      password: "rahasia123",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Format email tidak valid")
    }
  })

  it("menolak password kosong", () => {
    const result = authCredentialsSchema.safeParse({
      email: "user@example.com",
      password: "",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password wajib diisi")
    }
  })

  it("menolak password kurang dari 6 karakter", () => {
    const result = authCredentialsSchema.safeParse({
      email: "user@example.com",
      password: "123",
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Password minimal 6 karakter"
      )
    }
  })
})
