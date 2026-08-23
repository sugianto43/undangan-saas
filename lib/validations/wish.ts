import { z } from "zod"

export const wishInputSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Nama wajib diisi" })
    .max(100, { message: "Nama maksimal 100 karakter" }),
  message: z
    .string()
    .min(1, { message: "Ucapan wajib diisi" })
    .max(500, { message: "Ucapan maksimal 500 karakter" }),
})

export type WishInput = z.infer<typeof wishInputSchema>

export const wishRequestSchema = wishInputSchema.extend({
  invitation_id: z.uuid({ message: "ID undangan tidak valid" }),
})

export type WishRequest = z.infer<typeof wishRequestSchema>
