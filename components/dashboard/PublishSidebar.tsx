"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Check, PaintbrushVertical, Send } from "lucide-react"
import { usePublishInvitation } from "@/lib/queries/useInvitationMutations"
import { Button } from "@/components/ui/button"
import type { InvitationStatus } from "@/types/invitation"

const checklist = [
  "Detail acara terisi lengkap",
  "Tema undangan telah dipilih",
  "Pengaturan RSVP siap menerima tamu",
]

export function PublishSidebar({
  invitationId,
  status,
}: {
  invitationId: string
  status: InvitationStatus
}) {
  const router = useRouter()
  const publishInvitation = usePublishInvitation()
  const isPublished = status === "published"

  function handlePublish() {
    publishInvitation.mutate(
      { id: invitationId, status: "published" },
      {
        onSuccess: () => {
          toast.success("Undangan dipublikasikan")
          router.refresh()
        },
        onError: (error) => toast.error(error.message),
      }
    )
  }

  return (
    <aside className="w-full shrink-0 space-y-4 px-4 pb-10 md:w-80 md:pt-10 md:pr-8 md:pl-0">
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          {isPublished ? "Undangan sudah tayang" : "Siap dipublikasikan?"}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Luangkan waktu meninjau desain pada tampilan mobile dan desktop
          sebelum mengirimkannya ke tamu.
        </p>
        <ul className="mt-5 space-y-2.5 border-t border-border pt-5">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {isPublished ? (
        <span className="block rounded-full bg-accent/50 px-4 py-2.5 text-center text-sm font-medium text-accent-foreground">
          Sudah dipublikasikan
        </span>
      ) : (
        <Button
          className="h-12 w-full gap-2 rounded-full"
          onClick={handlePublish}
          disabled={publishInvitation.isPending}
        >
          <Send className="size-4" />
          Publikasikan Undangan
        </Button>
      )}

      <Button
        variant="outline"
        className="h-11 w-full gap-2 rounded-full"
        nativeButton={false}
        render={<Link href={`/dashboard/${invitationId}/edit`} />}
      >
        <PaintbrushVertical className="size-4" />
        Edit Desain
      </Button>
    </aside>
  )
}
