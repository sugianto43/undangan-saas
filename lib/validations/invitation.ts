import { z } from "zod"
import { themeIds } from "@/components/themes/themes"

export const eventTypes = ["wedding", "birthday", "engagement"] as const

export const eventTypeLabels: Record<(typeof eventTypes)[number], string> = {
  wedding: "Pernikahan",
  birthday: "Ulang Tahun",
  engagement: "Pertunangan",
}

export const invitationSchema = z.object({
  event_type: z.enum(eventTypes, { message: "Pilih tipe acara" }),
  title: z
    .string()
    .min(1, { message: "Judul wajib diisi" })
    .max(200, { message: "Judul maksimal 200 karakter" }),
  slug: z
    .string()
    .min(3, { message: "Slug minimal 3 karakter" })
    .max(100, { message: "Slug maksimal 100 karakter" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug hanya boleh huruf kecil, angka, dan tanda hubung",
    }),
  event_date: z
    .string()
    .min(1, { message: "Tanggal & waktu acara wajib diisi" })
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Tanggal & waktu acara tidak valid",
    }),
  location_text: z
    .string()
    .max(300, { message: "Alamat maksimal 300 karakter" })
    .optional()
    .or(z.literal("")),
  location_link: z
    .union([z.url({ message: "Link Google Maps tidak valid" }), z.literal("")])
    .optional(),
  description: z
    .string()
    .max(2000, { message: "Deskripsi maksimal 2000 karakter" })
    .optional()
    .or(z.literal("")),
  theme_id: z.enum(themeIds, { message: "Pilih tema" }),
})

export type InvitationInput = z.infer<typeof invitationSchema>
