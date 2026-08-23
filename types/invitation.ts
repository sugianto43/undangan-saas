import type { InvitationInput } from "@/lib/validations/invitation"

export type InvitationStatus = "draft" | "published"

export interface Invitation extends InvitationInput {
  id: string
  user_id: string
  cover_image_url: string | null
  theme_id: string
  status: InvitationStatus
  created_at: string
  updated_at: string
}

export interface InvitationWithRsvpCount extends Invitation {
  rsvp_count: number
}

export type PublicInvitation = Pick<
  Invitation,
  | "title"
  | "event_type"
  | "event_date"
  | "location_text"
  | "location_link"
  | "description"
>
