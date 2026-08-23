import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InvitationList } from "@/components/dashboard/InvitationList"

export default function DashboardPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-semibold">
          Undangan saya
        </h1>
        <Button nativeButton={false} render={<Link href="/dashboard/new" />}>
          Buat undangan
        </Button>
      </div>

      <InvitationList />
    </main>
  )
}
