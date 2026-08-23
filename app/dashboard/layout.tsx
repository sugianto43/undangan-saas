import Link from "next/link"
import { redirect } from "next/navigation"
import { signOutAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Wordmark } from "@/components/brand/Wordmark"

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
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/dashboard">
          <Wordmark />
        </Link>
        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-muted-foreground sm:block">
            {user.email}
          </p>
          <form action={signOutAction}>
            <Button type="submit" variant="outline" size="sm">
              Keluar
            </Button>
          </form>
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  )
}
