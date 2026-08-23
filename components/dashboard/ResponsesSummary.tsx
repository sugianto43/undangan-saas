"use client"

import { useRsvps } from "@/lib/queries/useRsvps"
import { attendingLabels } from "@/lib/validations/rsvp"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
})

export function ResponsesSummary({ invitationId }: { invitationId: string }) {
  const { data: rsvps, isLoading, error } = useRsvps(invitationId)

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Gagal memuat RSVP: {error.message}
      </p>
    )
  }

  const summary = {
    yes: 0,
    no: 0,
    maybe: 0,
    totalGuests: 0,
  }

  for (const rsvp of rsvps ?? []) {
    summary[rsvp.attending] += 1
    if (rsvp.attending === "yes") {
      summary.totalGuests += rsvp.guest_count
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Hadir</p>
            <p className="text-2xl font-semibold">{summary.yes}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Tidak hadir</p>
            <p className="text-2xl font-semibold">{summary.no}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Mungkin hadir</p>
            <p className="text-2xl font-semibold">{summary.maybe}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">Total tamu hadir</p>
            <p className="text-2xl font-semibold">{summary.totalGuests}</p>
          </CardContent>
        </Card>
      </div>

      {rsvps && rsvps.length > 0 ? (
        <ul className="divide-y rounded-lg border">
          {rsvps.map((rsvp) => (
            <li
              key={rsvp.id}
              className="flex items-center justify-between gap-2 p-3 text-sm"
            >
              <div>
                <p className="font-medium">{rsvp.guest_name}</p>
                <p className="text-xs text-muted-foreground">
                  {dateFormatter.format(new Date(rsvp.created_at))}
                </p>
              </div>
              <div className="text-right">
                <p>{attendingLabels[rsvp.attending]}</p>
                <p className="text-xs text-muted-foreground">
                  {rsvp.guest_count} orang
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada RSVP.</p>
      )}
    </div>
  )
}
