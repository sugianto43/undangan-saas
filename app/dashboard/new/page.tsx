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
    <main className="mx-auto max-w-xl space-y-6 p-8">
      <div>
        <Button
          variant="link"
          size="sm"
          className="mb-1 px-0"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          ← Kembali ke dashboard
        </Button>
        <h1 className="text-2xl font-semibold">Buat undangan baru</h1>
      </div>
      <InvitationForm
        onSubmit={handleSubmit}
        submitLabel="Buat undangan"
        pending={createInvitation.isPending}
        serverError={createInvitation.error?.message}
      />
    </main>
  )
}
