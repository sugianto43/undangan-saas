export interface InvitationPhoto {
  id: string
  invitation_id: string
  /** Storage object path in the invitation-photos bucket, not a ready-to-use URL. */
  url: string
  sort_order: number
  created_at: string
}
