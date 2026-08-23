import { z } from "zod"

export const attendingOptions = ["yes", "no", "maybe"] as const

export const attendingLabels: Record<(typeof attendingOptions)[number], string> = {
  yes: "Hadir",
  no: "Tidak hadir",
  maybe: "Mungkin hadir",
}

export const rsvpInputSchema = z.object({
  guest_name: z
    .string()
    .min(1, { message: "Nama wajib diisi" })
    .max(100, { message: "Nama maksimal 100 karakter" }),
  attending: z.enum(attendingOptions, { message: "Pilih status kehadiran" }),
  guest_count: z
    .number({ message: "Jumlah tamu wajib diisi" })
    .int({ message: "Jumlah tamu harus bilangan bulat" })
    .min(1, { message: "Jumlah tamu minimal 1" })
    .max(20, { message: "Jumlah tamu maksimal 20" }),
})

export type RsvpInput = z.infer<typeof rsvpInputSchema>

export const rsvpRequestSchema = rsvpInputSchema.extend({
  invitation_id: z.uuid({ message: "ID undangan tidak valid" }),
})

export type RsvpRequest = z.infer<typeof rsvpRequestSchema>
