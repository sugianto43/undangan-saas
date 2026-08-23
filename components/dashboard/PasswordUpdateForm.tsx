"use client"

import { useEffect, useRef } from "react"
import { useActionState } from "react"
import { toast } from "sonner"
import { updatePasswordAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordUpdateForm() {
  const [state, formAction, pending] = useActionState(updatePasswordAction, {
    error: null,
    success: false,
  })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      toast.success("Password berhasil diperbarui")
      formRef.current?.reset()
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="mt-6 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="password">Password Baru</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
        </div>
      </div>
      <Button type="submit" variant="outline" className="rounded-full" disabled={pending}>
        Perbarui Password
      </Button>
    </form>
  )
}
