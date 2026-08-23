export const queryKeys = {
  invitations: ["invitations"] as const,
  invitation: (id: string) => ["invitation", id] as const,
  rsvps: (invitationId: string) => ["rsvps", invitationId] as const,
  wishes: (invitationId: string) => ["wishes", invitationId] as const,
  photos: (invitationId: string) => ["photos", invitationId] as const,
  signedPhotoUrl: (path: string) => ["signed-photo-url", path] as const,
}
