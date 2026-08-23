import Link from "next/link"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { PasswordUpdateForm } from "@/components/dashboard/PasswordUpdateForm"
import { NotificationToggles } from "@/components/dashboard/NotificationToggles"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Pengaturan Akun — Invito",
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10 md:px-10">
      <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
        Pengaturan
      </h1>
      <p className="mt-2 text-muted-foreground">
        Kelola preferensi akun dan langganan Anda.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Informasi Akun
            </h2>
            <div className="mt-6 space-y-1.5 border-t border-border pt-6">
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                Alamat Email
              </p>
              <p className="text-sm text-foreground">{user.email}</p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Keamanan
            </h2>
            <PasswordUpdateForm />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel rounded-2xl border-l-4 border-l-primary p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Langganan
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Anda saat ini di paket Gratis.
            </p>
            <Button
              variant="outline"
              className="mt-4 w-full gap-1.5 rounded-full"
              nativeButton={false}
              render={<Link href="/harga" />}
            >
              Upgrade Paket
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Notifikasi
            </h2>
            <NotificationToggles />
          </div>
        </div>
      </div>
    </div>
  )
}
