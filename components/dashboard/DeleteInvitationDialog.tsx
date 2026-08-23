"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type DeleteInvitationDialogProps = {
  title: string
  onConfirm: () => void
  pending?: boolean
  trigger: React.ReactElement
}

export function DeleteInvitationDialog({
  title,
  onConfirm,
  pending,
  trigger,
}: DeleteInvitationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus undangan?</DialogTitle>
          <DialogDescription>
            Undangan &quot;{title}&quot; beserta semua RSVP dan ucapan akan
            dihapus permanen. Tindakan ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button variant="destructive" onClick={onConfirm} disabled={pending}>
            {pending ? "Menghapus..." : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
