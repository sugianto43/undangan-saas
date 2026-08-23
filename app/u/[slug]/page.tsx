import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPublishedInvitationBySlug } from "@/lib/supabase/queries/public-invitation"
import { listInvitationPhotos } from "@/lib/supabase/queries/invitation-photos"
import { getSignedPhotoUrl, getSignedPhotoUrls } from "@/lib/supabase/storage"
import { CoverSection } from "@/components/public-invitation/CoverSection"
import { CountdownTimer } from "@/components/public-invitation/CountdownTimer"
import { EventInfoSection } from "@/components/public-invitation/EventInfoSection"
import { DescriptionSection } from "@/components/public-invitation/DescriptionSection"
import { GalleryLightbox } from "@/components/public-invitation/GalleryLightbox"
import { RsvpForm } from "@/components/public-invitation/RsvpForm"
import { SectionLabel } from "@/components/public-invitation/SectionLabel"
import { WishForm } from "@/components/public-invitation/WishForm"
import { WishesList } from "@/components/public-invitation/WishesList"
import { ThemeWrapper } from "@/components/themes/ThemeWrapper"
import { resolveThemeId } from "@/components/themes/themes"

export default async function PublicInvitationPage(
  props: PageProps<"/u/[slug]">
) {
  const { slug } = await props.params
  const searchParams = await props.searchParams

  const supabase = await createClient()
  const invitation = await getPublishedInvitationBySlug(supabase, slug)

  if (!invitation) {
    notFound()
  }

  const toParam = searchParams.to
  const guestName =
    (Array.isArray(toParam) ? toParam[0] : toParam)?.trim() || "Tamu Undangan"

  const [coverUrl, photos] = await Promise.all([
    invitation.cover_image_url
      ? getSignedPhotoUrl(supabase, invitation.cover_image_url)
      : Promise.resolve(null),
    listInvitationPhotos(supabase, invitation.id),
  ])

  const galleryUrls = await getSignedPhotoUrls(
    supabase,
    photos.map((photo) => photo.url)
  )
  const galleryPhotos = photos
    .map((photo) => ({ id: photo.id, signedUrl: galleryUrls.get(photo.url) }))
    .filter((photo): photo is { id: string; signedUrl: string } =>
      Boolean(photo.signedUrl)
    )

  return (
    <ThemeWrapper themeId={resolveThemeId(invitation.theme_id)}>
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
      </main>
    </ThemeWrapper>
  )
}
