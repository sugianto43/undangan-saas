import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPublishedInvitationBySlug } from "@/lib/supabase/queries/public-invitation"
import { CoverSection } from "@/components/public-invitation/CoverSection"
import { EventInfoSection } from "@/components/public-invitation/EventInfoSection"
import { DescriptionSection } from "@/components/public-invitation/DescriptionSection"

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

  return (
    <main>
      <CoverSection invitation={invitation} guestName={guestName} />
      <EventInfoSection invitation={invitation} />
      {invitation.description ? (
        <DescriptionSection description={invitation.description} />
      ) : null}
    </main>
  )
}
