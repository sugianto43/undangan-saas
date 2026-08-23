"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { InvitationForm } from "@/components/editor/InvitationForm"
import { useCreateInvitation } from "@/lib/queries/useInvitationMutations"
import type { InvitationInput } from "@/lib/validations/invitation"
import { Button } from "@/components/ui/button"

export default function NewInvitationPage() {
  const router = useRouter()
  const createInvitation = useCreateInvitation()

  function handleSubmit(data: InvitationInput) {
    createInvitation.mutate(data, {
      onSuccess: () => {
        toast.success("Undangan berhasil dibuat")
        router.push("/dashboard")
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  }

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6 md:p-10">
      <div className="text-center md:text-left">
        <Button
          variant="link"
          size="sm"
          className="mb-2 px-0"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          ← Kembali ke dashboard
        </Button>
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Rancang Undangan Anda
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Setiap perayaan besar dimulai dari permintaan yang penuh perhatian.
          Tentukan detail acara mendatang Anda.
        </p>
      </div>
      <div className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-32 size-64 rounded-full bg-secondary opacity-50 blur-3xl"
        />
        <div className="relative">
          <InvitationForm
            wizard
            onSubmit={handleSubmit}
            submitLabel="Buat undangan"
            pending={createInvitation.isPending}
            serverError={createInvitation.error?.message}
          />
        </div>
      </div>
    </main>
  )
}
