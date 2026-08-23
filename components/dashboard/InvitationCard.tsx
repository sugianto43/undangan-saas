"use client"

import Link from "next/link"
import { toast } from "sonner"
import { MailCheckIcon, Trash2Icon } from "lucide-react"
import { eventTypeLabels } from "@/lib/validations/invitation"
import {
  useDeleteInvitation,
  usePublishInvitation,
} from "@/lib/queries/useInvitationMutations"
import type { InvitationWithRsvpCount } from "@/types/invitation"
import { Button } from "@/components/ui/button"
import { DeleteInvitationDialog } from "@/components/dashboard/DeleteInvitationDialog"

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
})

export function InvitationCard({
  invitation,
}: {
  invitation: InvitationWithRsvpCount
}) {
  const deleteInvitation = useDeleteInvitation()
  const publishInvitation = usePublishInvitation()

  const isPublished = invitation.status === "published"

  function handleTogglePublish() {
    publishInvitation.mutate(
      { id: invitation.id, status: isPublished ? "draft" : "published" },
      {
        onSuccess: () => {
          toast.success(
            isPublished ? "Undangan diubah ke draft" : "Undangan dipublikasikan"
          )
        },
        onError: (error) => toast.error(error.message),
      }
    )
  }

  function handleDelete() {
    deleteInvitation.mutate(invitation.id, {
      onSuccess: () => toast.success("Undangan dihapus"),
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <article className="glass-panel group flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
      <div className="relative flex h-32 items-center justify-center overflow-hidden bg-linear-to-br from-secondary to-accent">
        <span className="font-heading text-5xl font-bold text-foreground/20 italic">
          {invitation.title.charAt(0)}
        </span>
        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-border bg-card/90 px-2.5 py-1 text-xs font-medium shadow-sm backdrop-blur-md">
          <span
            className={
              isPublished
                ? "size-1.5 rounded-full bg-emerald-500"
                : "size-1.5 rounded-full bg-muted-foreground"
            }
          />
          {isPublished ? "Published" : "Draft"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-heading text-lg leading-tight font-semibold text-foreground">
          {invitation.title}
        </h4>
        <p className="mt-1 text-sm text-muted-foreground">
          {eventTypeLabels[invitation.event_type]} ·{" "}
          {dateFormatter.format(new Date(invitation.event_date))}
        </p>

        <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-sm text-muted-foreground">
          <MailCheckIcon className="size-4 text-primary" />
          {invitation.rsvp_count} RSVP
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/dashboard/${invitation.id}/edit`} />}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/dashboard/${invitation.id}/responses`} />}
          >
            Lihat rekap
          </Button>
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href={`/dashboard/${invitation.id}/preview`} />}
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleTogglePublish}
            disabled={publishInvitation.isPending}
          >
            {isPublished ? "Jadikan draft" : "Publish"}
          </Button>
          <DeleteInvitationDialog
            title={invitation.title}
            onConfirm={handleDelete}
            pending={deleteInvitation.isPending}
            trigger={
              <Button
                variant="ghost"
                size="icon-sm"
                className="ml-auto text-muted-foreground hover:text-destructive"
                aria-label="Hapus undangan"
              >
                <Trash2Icon />
              </Button>
            }
          />
        </div>
      </div>
    </article>
  )
}
