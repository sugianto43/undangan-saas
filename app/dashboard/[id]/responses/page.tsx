import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ResponsesSummary } from "@/components/dashboard/ResponsesSummary"
import { WishesList } from "@/components/public-invitation/WishesList"

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

  return (
    <main className="mx-auto max-w-2xl space-y-10 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Rekap RSVP</h1>
        <ResponsesSummary invitationId={id} />
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium">Ucapan</h2>
        <WishesList invitationId={id} />
      </div>
    </main>
  )
}
