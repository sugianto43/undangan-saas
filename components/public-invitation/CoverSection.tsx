import Image from "next/image"
import { eventTypeLabels } from "@/lib/validations/invitation"
import type { PublicInvitation } from "@/types/invitation"
import { cn } from "@/lib/utils"

export function CoverSection({
  invitation,
  guestName,
  coverUrl,
}: {
  invitation: PublicInvitation
  guestName: string
  coverUrl: string | null
}) {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center gap-6 overflow-hidden px-6 py-16 text-center">
      {coverUrl ? (
        <>
          <Image
            src={coverUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : null}
      <p
        className={cn(
          "text-sm tracking-widest uppercase",
          coverUrl ? "relative text-white/80" : "text-muted-foreground"
        )}
      >
        {eventTypeLabels[invitation.event_type]}
      </p>
      <h1
        className={cn(
          "font-heading text-3xl font-semibold text-balance sm:text-4xl",
          coverUrl && "relative text-white"
        )}
      >
        {invitation.title}
      </h1>
      <div className={cn("space-y-1", coverUrl && "relative")}>
        <p
          className={cn(
            "text-sm",
            coverUrl ? "text-white/80" : "text-muted-foreground"
          )}
        >
          Kepada Yth.
        </p>
        <p
          className={cn(
            "text-lg font-medium",
            coverUrl && "text-white"
          )}
        >
          {guestName}
        </p>
      </div>
    </section>
  )
}
