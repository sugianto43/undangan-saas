import { CoverSection } from "@/components/public-invitation/CoverSection"
import { CountdownTimer } from "@/components/public-invitation/CountdownTimer"
import { EventInfoSection } from "@/components/public-invitation/EventInfoSection"
import { DescriptionSection } from "@/components/public-invitation/DescriptionSection"
import { GalleryLightbox } from "@/components/public-invitation/GalleryLightbox"
import { RsvpForm } from "@/components/public-invitation/RsvpForm"
import { SectionLabel } from "@/components/public-invitation/SectionLabel"
import { WishForm } from "@/components/public-invitation/WishForm"
import { WishesList } from "@/components/public-invitation/WishesList"
import type { PublicInvitation } from "@/types/invitation"

type GalleryPhoto = { id: string; signedUrl: string }

export function InvitationPageContent({
  invitation,
  guestName,
  coverUrl,
  galleryPhotos,
  interactive = true,
}: {
  invitation: PublicInvitation
  guestName: string
  coverUrl: string | null
  galleryPhotos: GalleryPhoto[]
  /** Preview mode shows the same layout without live RSVP/wish submission. */
  interactive?: boolean
}) {
  return (
    <main>
      <CoverSection
        invitation={invitation}
        guestName={guestName}
        coverUrl={coverUrl}
      />

      <section className="mx-auto max-w-md px-6 pt-8">
        <CountdownTimer eventDate={invitation.event_date} />
      </section>

      <EventInfoSection invitation={invitation} />
      {invitation.description ? (
        <DescriptionSection description={invitation.description} />
      ) : null}

      {galleryPhotos.length > 0 ? (
        <section className="mx-auto max-w-2xl px-6 py-10">
          <SectionLabel>Galeri</SectionLabel>
          <GalleryLightbox photos={galleryPhotos} />
        </section>
      ) : null}

      {interactive ? (
        <>
          <section className="mx-auto max-w-md px-6 py-10">
            <SectionLabel>RSVP</SectionLabel>
            <RsvpForm invitationId={invitation.id} />
          </section>

          <section className="mx-auto max-w-md px-6 py-10">
            <SectionLabel>Ucapan &amp; Doa</SectionLabel>
            <WishForm invitationId={invitation.id} />
            <div className="mt-6">
              <WishesList invitationId={invitation.id} />
            </div>
          </section>
        </>
      ) : (
        <section className="mx-auto max-w-md px-6 py-10 text-center">
          <SectionLabel>RSVP &amp; Ucapan</SectionLabel>
          <p className="text-sm text-muted-foreground">
            Form RSVP dan ucapan akan aktif setelah undangan dipublikasikan.
          </p>
        </section>
      )}
    </main>
  )
}
