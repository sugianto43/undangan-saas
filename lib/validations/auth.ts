import { z } from "zod"

export const authCredentialsSchema = z.object({
  email: z.email({ message: "Format email tidak valid" }),
  password: z
    .string()
    .min(1, { message: "Password wajib diisi" })
    .min(6, { message: "Password minimal 6 karakter" }),
})

export type AuthCredentialsInput = z.infer<typeof authCredentialsSchema>
