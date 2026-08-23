"use client"

import Link from "next/link"
import { toast } from "sonner"
import { eventTypeLabels } from "@/lib/validations/invitation"
import {
  useDeleteInvitation,
  usePublishInvitation,
} from "@/lib/queries/useInvitationMutations"
import type { InvitationWithRsvpCount } from "@/types/invitation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeleteInvitationDialog } from "@/components/dashboard/DeleteInvitationDialog"

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
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
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{invitation.title}</CardTitle>
          <span
            className={
              isPublished
                ? "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                : "rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            }
          >
            {isPublished ? "Published" : "Draft"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <dl className="space-y-1 text-sm text-muted-foreground">
          <div>{eventTypeLabels[invitation.event_type]}</div>
          <div>{dateFormatter.format(new Date(invitation.event_date))}</div>
          <div>{invitation.rsvp_count} RSVP</div>
        </dl>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm" render={<Link href={`/dashboard/${invitation.id}/edit`} />}>
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            render={<Link href={`/dashboard/${invitation.id}/responses`} />}
          >
            Lihat rekap
          </Button>
          <Button
            variant="outline"
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
              <Button variant="destructive" size="sm">
                Hapus
              </Button>
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
