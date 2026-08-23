"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { InvitationForm } from "@/components/editor/InvitationForm"
import { useCreateInvitation } from "@/lib/queries/useInvitationMutations"
import type { InvitationInput } from "@/lib/validations/invitation"

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
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Buat undangan baru</h1>
      <InvitationForm
        onSubmit={handleSubmit}
        submitLabel="Buat undangan"
        pending={createInvitation.isPending}
        serverError={createInvitation.error?.message}
      />
    </main>
  )
}
