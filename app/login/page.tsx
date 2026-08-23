import Link from "next/link"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/LoginForm"
import { createClient } from "@/lib/supabase/server"
import { Wordmark } from "@/components/brand/Wordmark"

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="relative hidden overflow-hidden bg-muted md:flex md:w-1/2 md:flex-col md:justify-between md:p-12 lg:w-7/12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-secondary opacity-60 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 size-80 rounded-full bg-accent opacity-60 blur-[80px]"
        />
        <Link href="/" className="relative z-10">
          <Wordmark />
        </Link>
        <blockquote className="glass-panel relative z-10 rounded-2xl p-6">
          <p className="font-heading text-xl text-balance text-foreground italic">
            &ldquo;Setiap detail terkelola dengan sempurna. Invito mengubah
            acara kami menjadi momen yang tak terlupakan.&rdquo;
          </p>
          <footer className="mt-3 text-xs tracking-widest text-muted-foreground uppercase">
            — Sari, pengantin
          </footer>
        </blockquote>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-16 md:w-1/2 lg:w-5/12">
        <div className="w-full max-w-sm">
          <div className="mb-6 text-center md:hidden">
            <Link href="/" className="inline-flex">
              <Wordmark />
            </Link>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
