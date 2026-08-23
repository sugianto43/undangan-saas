import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getInvitationForPreview } from "@/lib/supabase/queries/invitations"
import { getInvitationPageMedia } from "@/lib/supabase/invitation-page-media"
import { InvitationPageContent } from "@/components/public-invitation/InvitationPageContent"
import { ThemeWrapper } from "@/components/themes/ThemeWrapper"
import { resolveThemeId } from "@/components/themes/themes"
import { PreviewTopBar } from "@/components/dashboard/PreviewTopBar"
import { PreviewFrame } from "@/components/dashboard/PreviewFrame"
import { PublishSidebar } from "@/components/dashboard/PublishSidebar"

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
    <div className="flex flex-1 flex-col">
      <PreviewTopBar invitationId={id} status={invitation.status} />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col md:flex-row">
        <PreviewFrame>
          <ThemeWrapper themeId={resolveThemeId(invitation.theme_id)}>
            <InvitationPageContent
              invitation={invitation}
              guestName="Tamu Undangan"
              coverUrl={coverUrl}
              galleryPhotos={galleryPhotos}
              interactive={false}
            />
          </ThemeWrapper>
        </PreviewFrame>

        <PublishSidebar invitationId={id} status={invitation.status} />
      </div>
    </div>
  )
}
