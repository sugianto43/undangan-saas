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
    <main className="flex flex-1 flex-col">
      <header className="p-6">
        <Link href="/">
          <Wordmark />
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-1 text-center">
            <h1 className="font-heading text-2xl font-semibold">
              Masuk ke akun Anda
            </h1>
            <p className="text-sm text-muted-foreground">
              Kelola undangan digital Anda di satu tempat
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
