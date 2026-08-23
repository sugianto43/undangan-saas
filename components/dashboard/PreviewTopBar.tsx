import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { InvitationStatus } from "@/types/invitation"

export function PreviewTopBar({
  invitationId,
  status,
}: {
  invitationId: string
  status: InvitationStatus
}) {
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
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {status === "published" ? "Sudah dipublikasikan" : "Draft tersimpan"}
      </p>
    </div>
  )
}
