import type { PublicInvitation } from "@/types/invitation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "full",
  timeZone: "Asia/Jakarta",
})

const timeFormatter = new Intl.DateTimeFormat("id-ID", {
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
})

export function EventInfoSection({
  invitation,
}: {
  invitation: PublicInvitation
}) {
  const eventDate = new Date(invitation.event_date)

  return (
    <section className="mx-auto max-w-md px-6 py-10">
      <Card>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              Tanggal
            </p>
            <p className="font-medium">{dateFormatter.format(eventDate)}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-muted-foreground uppercase">
              Waktu
            </p>
            <p className="font-medium">
              {timeFormatter.format(eventDate)} WIB
            </p>
          </div>
          {invitation.location_text ? (
            <div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Lokasi
              </p>
              <p className="font-medium">{invitation.location_text}</p>
            </div>
          ) : null}
          {invitation.location_link ? (
            <Button
              className="w-full"
              nativeButton={false}
              render={
                <a
                  href={invitation.location_link}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Buka di Maps
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </section>
  )
}
