import { eventTypeLabels } from "@/lib/validations/invitation"
import type { PublicInvitation } from "@/types/invitation"

export function CoverSection({
  invitation,
  guestName,
}: {
  invitation: PublicInvitation
  guestName: string
}) {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <p className="text-sm tracking-widest text-muted-foreground uppercase">
        {eventTypeLabels[invitation.event_type]}
      </p>
      <h1 className="text-3xl font-semibold text-balance sm:text-4xl">
        {invitation.title}
      </h1>
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Kepada Yth.</p>
        <p className="text-lg font-medium">{guestName}</p>
      </div>
    </section>
  )
}
