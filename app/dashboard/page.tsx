import Link from "next/link"
import { CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvitationList } from "@/components/dashboard/InvitationList"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const name = user?.email?.split("@")[0] ?? "Host"

  return (
    <main className="flex flex-1 flex-col gap-8 p-6 md:p-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h1 className="font-heading text-2xl font-bold text-foreground capitalize md:text-3xl">
            Selamat datang, {name}.
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Berikut ringkasan undangan dan aktivitas terbaru Anda.
          </p>
        </div>
        <Button
          className="w-fit gap-2 rounded-full"
          nativeButton={false}
          render={<Link href="/dashboard/new" />}
        >
          <CirclePlus className="size-4" />
          Buat undangan
        </Button>
      </div>

      <DashboardStats />

      <div>
        <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
          Undangan saya
        </h2>
        <InvitationList />
      </div>
    </main>
  )
}
