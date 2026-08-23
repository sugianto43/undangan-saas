"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { authCredentialsSchema, updatePasswordSchema } from "@/lib/validations/auth"
import { createClient } from "@/lib/supabase/server"

export type AuthActionState = {
  error: string | null
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = authCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { error: "Email atau password tidak valid" }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { error: "Email atau password salah" }
  }

  redirect("/dashboard")
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const parsed = authCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { error: "Email atau password tidak valid" }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp(parsed.data)

  if (error) {
    if (error.code === "user_already_exists") {
      return { error: "Email sudah terdaftar, silakan login" }
    }
    return { error: "Gagal mendaftar, silakan coba lagi" }
  }

  redirect("/dashboard")
}

export async function signInWithGoogleAction() {
  const supabase = await createClient()
  const origin = (await headers()).get("origin")

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (error || !data.url) {
    redirect("/login?error=google_oauth_failed")
  }

  redirect(data.url)
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export type UpdatePasswordActionState = {
  error: string | null
  success: boolean
}

export async function updatePasswordAction(
  _prevState: UpdatePasswordActionState,
  formData: FormData
): Promise<UpdatePasswordActionState> {
  const parsed = updatePasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Data tidak valid", success: false }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password })

  if (error) {
    return { error: "Gagal memperbarui password, silakan coba lagi", success: false }
  }

  return { error: null, success: true }
}
