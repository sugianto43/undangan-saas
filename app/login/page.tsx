import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/LoginForm"
import { createClient } from "@/lib/supabase/server"

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold">Masuk ke akun Anda</h1>
          <p className="text-sm text-muted-foreground">
            Kelola undangan digital Anda di satu tempat
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
