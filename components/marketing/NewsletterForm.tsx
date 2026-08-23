"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterForm() {
  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.success("Terima kasih telah berlangganan!")
    event.currentTarget.reset()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
    >
      <Input
        type="email"
        required
        placeholder="Alamat Email Anda"
        className="h-11 rounded-full bg-background"
      />
      <Button type="submit" className="h-11 shrink-0 rounded-full px-6">
        Berlangganan
      </Button>
    </form>
  )
}
