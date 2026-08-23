import Link from "next/link"
import { notFound, redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ResponsesSummary } from "@/components/dashboard/ResponsesSummary"
import { WishesList } from "@/components/public-invitation/WishesList"
import { Button } from "@/components/ui/button"

export default async function InvitationResponsesPage(
  props: PageProps<"/dashboard/[id]/responses">
) {
  const { id } = await props.params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // wishes RLS intentionally allows public read for published invitations
  // (needed for the /u/[slug] page), so ownership must be checked here
  // explicitly rather than relying on RLS alone for this owner-only page.
  const { data: invitation } = await supabase
    .from("invitations")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle()

  if (!invitation) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-2xl space-y-10 p-8">
      <div>
        <Button
          variant="link"
          size="sm"
          className="mb-1 px-0"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          ← Kembali ke dashboard
        </Button>
        <h1 className="mb-4 text-2xl font-semibold">Rekap RSVP</h1>
        <ResponsesSummary invitationId={id} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Ucapan</h2>
        <WishesList invitationId={id} />
      </div>
    </main>
  )
}
