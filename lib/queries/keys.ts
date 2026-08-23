export const queryKeys = {
  invitations: ["invitations"] as const,
  invitation: (id: string) => ["invitation", id] as const,
  rsvps: (invitationId: string) => ["rsvps", invitationId] as const,
  wishes: (invitationId: string) => ["wishes", invitationId] as const,
}
