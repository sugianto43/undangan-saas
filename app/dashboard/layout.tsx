import Link from "next/link"
import { redirect } from "next/navigation"
import { signOutAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Wordmark } from "@/components/brand/Wordmark"
import { Sidebar } from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-1">
      <Sidebar email={user.email ?? ""} />
      <div className="flex flex-1 flex-col">
        <header className="glass-panel sticky top-0 z-30 flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
          <Link href="/dashboard">
            <Wordmark />
          </Link>
          <form action={signOutAction}>
            <Button type="submit" variant="outline" size="sm">
              Keluar
            </Button>
          </form>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}
