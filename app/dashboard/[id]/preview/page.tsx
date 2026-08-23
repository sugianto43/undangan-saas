import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getInvitationForPreview } from "@/lib/supabase/queries/invitations"
import { getInvitationPageMedia } from "@/lib/supabase/invitation-page-media"
import { InvitationPageContent } from "@/components/public-invitation/InvitationPageContent"
import { ThemeWrapper } from "@/components/themes/ThemeWrapper"
import { resolveThemeId } from "@/components/themes/themes"
import { Button } from "@/components/ui/button"

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
      <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b bg-background p-3 text-sm">
        <p className="text-muted-foreground">
          Mode preview — begini tampilan undangan Anda untuk tamu
        </p>
        <Button
          variant="outline"
          size="sm"
          nativeButton={false}
          render={<Link href={`/dashboard/${id}/edit`} />}
        >
          Kembali edit
        </Button>
      </div>

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
