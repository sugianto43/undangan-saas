import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getInvitationForPreview } from "@/lib/supabase/queries/invitations"
import { getInvitationPageMedia } from "@/lib/supabase/invitation-page-media"
import { InvitationPageContent } from "@/components/public-invitation/InvitationPageContent"
import { ThemeWrapper } from "@/components/themes/ThemeWrapper"
import { resolveThemeId } from "@/components/themes/themes"
import { PreviewActionBar } from "@/components/dashboard/PreviewActionBar"

export default async function InvitationPreviewPage(
  props: PageProps<"/dashboard/[id]/preview">
) {
  const { id } = await props.params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const invitation = await getInvitationForPreview(supabase, id, user.id)

  if (!invitation) {
    notFound()
  }

  const { coverUrl, galleryPhotos } = await getInvitationPageMedia(
    supabase,
    invitation.id,
    invitation.cover_image_url
  )

  return (
    <div>
      <PreviewActionBar invitationId={id} status={invitation.status} />

      <ThemeWrapper themeId={resolveThemeId(invitation.theme_id)}>
        <InvitationPageContent
          invitation={invitation}
          guestName="Tamu Undangan"
          coverUrl={coverUrl}
          galleryPhotos={galleryPhotos}
          interactive={false}
        />
      </ThemeWrapper>
    </div>
  )
}
