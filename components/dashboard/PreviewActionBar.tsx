"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft, Send } from "lucide-react"
import { usePublishInvitation } from "@/lib/queries/useInvitationMutations"
import { Button } from "@/components/ui/button"
import type { InvitationStatus } from "@/types/invitation"

export function PreviewActionBar({
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
    <div className="glass-panel sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border p-3">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 text-muted-foreground"
        nativeButton={false}
        render={<Link href={`/dashboard/${invitationId}/edit`} />}
      >
        <ArrowLeft className="size-4" />
        Kembali edit
      </Button>
      <p className="hidden text-xs text-muted-foreground uppercase sm:block">
        Mode Preview
      </p>
      {isPublished ? (
        <span className="rounded-full bg-accent/50 px-3 py-1.5 text-xs font-medium text-accent-foreground">
          Sudah dipublikasikan
        </span>
      ) : (
        <Button
          size="sm"
          className="gap-1.5 rounded-full"
          onClick={handlePublish}
          disabled={publishInvitation.isPending}
        >
          <Send className="size-4" />
          Publikasikan
        </Button>
      )}
    </div>
  )
}
