import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getPublishedInvitationBySlug } from "@/lib/supabase/queries/public-invitation"
import { CoverSection } from "@/components/public-invitation/CoverSection"
import { EventInfoSection } from "@/components/public-invitation/EventInfoSection"
import { DescriptionSection } from "@/components/public-invitation/DescriptionSection"
import { RsvpForm } from "@/components/public-invitation/RsvpForm"
import { WishForm } from "@/components/public-invitation/WishForm"
import { WishesList } from "@/components/public-invitation/WishesList"

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

      <section className="mx-auto max-w-md px-6 py-10">
        <p className="mb-4 text-center text-xs tracking-widest text-muted-foreground uppercase">
          RSVP
        </p>
        <RsvpForm invitationId={invitation.id} />
      </section>

      <section className="mx-auto max-w-md px-6 py-10">
        <p className="mb-4 text-center text-xs tracking-widest text-muted-foreground uppercase">
          Ucapan & Doa
        </p>
        <WishForm invitationId={invitation.id} />
        <div className="mt-6">
          <WishesList invitationId={invitation.id} />
        </div>
      </section>
    </main>
  )
}
