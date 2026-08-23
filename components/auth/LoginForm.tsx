"use client"

import { startTransition, useActionState, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
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

const underlineInputClass =
  "h-10 rounded-none border-0 border-b-2 border-border bg-transparent px-0 text-base focus-visible:border-primary focus-visible:ring-0"

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
    startTransition(() => {
      formAction(formData)
    })
  })

  return (
    <div className="glass-panel w-full max-w-sm rounded-2xl p-8">
      <div className="mb-8 text-center">
        <h1 className="font-heading text-3xl font-bold text-primary">Invito</h1>
        <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
          The Modern Host
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="nama@email.com"
                    className={underlineInputClass}
                    {...field}
                  />
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
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className={underlineInputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <Button
            type="submit"
            className="h-12 w-full gap-2 rounded-full"
            disabled={pending}
          >
            {mode === "login" ? "Masuk" : "Buat akun"}
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Form>

      <div className="mt-8 flex items-center gap-2">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs tracking-wider text-muted-foreground uppercase">
          atau
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={signInWithGoogleAction} className="mt-6">
        <Button
          type="submit"
          variant="outline"
          className="h-12 w-full rounded-lg"
        >
          Lanjutkan dengan Google
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
        <button
          type="button"
          className="font-semibold text-primary underline decoration-1 underline-offset-4"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Daftar di sini" : "Masuk di sini"}
        </button>
      </p>
    </div>
  )
}
