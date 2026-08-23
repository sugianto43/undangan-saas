import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPublishedInvitationBySlug } from "@/lib/supabase/queries/public-invitation"
import { getInvitationPageMedia } from "@/lib/supabase/invitation-page-media"
import { InvitationPageContent } from "@/components/public-invitation/InvitationPageContent"
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

  const { coverUrl, galleryPhotos } = await getInvitationPageMedia(
    supabase,
    invitation.id,
    invitation.cover_image_url
  )

  return (
    <ThemeWrapper themeId={resolveThemeId(invitation.theme_id)}>
      <InvitationPageContent
        invitation={invitation}
        guestName={guestName}
        coverUrl={coverUrl}
        galleryPhotos={galleryPhotos}
      />
    </ThemeWrapper>
  )
}
