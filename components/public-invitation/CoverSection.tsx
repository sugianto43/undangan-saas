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
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, var(--color-accent) 0%, transparent 55%)",
            opacity: 0.12,
          }}
        />
      )}

      <div
        className={cn(
          "relative flex flex-col items-center gap-6",
          !coverUrl && "rounded-2xl border border-accent/40 px-10 py-14 sm:px-14"
        )}
      >
        <p
          className={cn(
            "text-sm tracking-widest uppercase",
            coverUrl ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {eventTypeLabels[invitation.event_type]}
        </p>
        <h1
          className={cn(
            "font-heading text-3xl font-semibold text-balance sm:text-4xl",
            coverUrl && "text-white"
          )}
        >
          {invitation.title}
        </h1>
        <div className="space-y-1">
          <p
            className={cn(
              "text-sm",
              coverUrl ? "text-white/80" : "text-muted-foreground"
            )}
          >
            Kepada Yth.
          </p>
          <p className={cn("text-lg font-medium", coverUrl && "text-white")}>
            {guestName}
          </p>
        </div>
      </div>
    </section>
  )
}
