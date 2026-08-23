import type { RsvpInput } from "@/lib/validations/rsvp"

export interface Rsvp extends RsvpInput {
  id: string
  invitation_id: string
  created_at: string
}
