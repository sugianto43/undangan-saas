"use client"

import { useActionState, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authCredentialsSchema, type AuthCredentialsInput } from "@/lib/validations/auth"
import { signInAction, signInWithGoogleAction, signUpAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Mode = "login" | "signup"

export function LoginForm() {
  const [mode, setMode] = useState<Mode>("login")
  const action = mode === "login" ? signInAction : signUpAction
  const [state, formAction, pending] = useActionState(action, { error: null })

  const form = useForm<AuthCredentialsInput>({
    resolver: zodResolver(authCredentialsSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    formAction(formData)
  })

  return (
    <div className="w-full max-w-sm space-y-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="nama@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {mode === "login" ? "Masuk" : "Daftar"}
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">atau</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={signInWithGoogleAction}>
        <Button type="submit" variant="outline" className="w-full">
          Lanjutkan dengan Google
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <button
          type="button"
          className="font-medium text-foreground underline underline-offset-4"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Daftar di sini" : "Masuk di sini"}
        </button>
      </p>
    </div>
  )
}
