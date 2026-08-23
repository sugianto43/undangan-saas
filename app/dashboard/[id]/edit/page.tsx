"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { InvitationForm } from "@/components/editor/InvitationForm"
import { CoverImageUpload } from "@/components/editor/CoverImageUpload"
import { GalleryUpload } from "@/components/editor/GalleryUpload"
import { useInvitation } from "@/lib/queries/useInvitation"
import { useUpdateInvitation } from "@/lib/queries/useInvitationMutations"
import type { InvitationInput } from "@/lib/validations/invitation"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

function toDatetimeLocalValue(iso: string) {
  const date = new Date(iso)
  const offsetMs = date.getTimezoneOffset() * 60 * 1000
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16)
}

export default function EditInvitationPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { data: invitation, isLoading, error } = useInvitation(params.id)
  const updateInvitation = useUpdateInvitation(params.id)

  function handleSubmit(data: InvitationInput) {
    updateInvitation.mutate(data, {
      onSuccess: () => {
        toast.success("Undangan berhasil diperbarui")
        router.push("/dashboard")
      },
      onError: (err) => {
        toast.error(err.message)
      },
    })
  }

  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6 md:p-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Button
            variant="link"
            size="sm"
            className="mb-2 px-0"
            nativeButton={false}
            render={<Link href="/dashboard" />}
          >
            ← Kembali ke dashboard
          </Button>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Edit Undangan
          </h1>
        </div>
        {invitation ? (
          <Button
            variant="outline"
            className="rounded-full"
            nativeButton={false}
            render={<Link href={`/dashboard/${invitation.id}/preview`} />}
          >
            Preview
          </Button>
        ) : null}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : null}

      {error ? (
        <p className="text-sm text-destructive">
          Gagal memuat undangan: {error.message}
        </p>
      ) : null}

      {invitation ? (
        <div className="space-y-8">
          <div className="glass-panel space-y-6 rounded-2xl p-6">
            <CoverImageUpload
              invitationId={invitation.id}
              coverPath={invitation.cover_image_url}
            />
            <GalleryUpload invitationId={invitation.id} />
          </div>

          <div className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-32 size-64 rounded-full bg-secondary opacity-50 blur-3xl"
            />
            <div className="relative">
              <InvitationForm
                key={invitation.id}
                defaultValues={{
                  ...invitation,
                  event_date: toDatetimeLocalValue(invitation.event_date),
                  location_text: invitation.location_text ?? "",
                  location_link: invitation.location_link ?? "",
                  description: invitation.description ?? "",
                }}
                onSubmit={handleSubmit}
                submitLabel="Simpan perubahan"
                pending={updateInvitation.isPending}
                serverError={updateInvitation.error?.message}
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
