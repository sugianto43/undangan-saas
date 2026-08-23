import Link from "next/link"
import { redirect } from "next/navigation"
import { signOutAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { InvitationList } from "@/components/dashboard/InvitationList"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Keluar
          </Button>
        </form>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Undangan saya</h2>
        <Button render={<Link href="/dashboard/new" />}>Buat undangan</Button>
      </div>

      <InvitationList />
    </main>
  )
}
