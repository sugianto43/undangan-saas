"use client"

import Link from "next/link"
import { useInvitations } from "@/lib/queries/useInvitations"
import { InvitationCard } from "@/components/dashboard/InvitationCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export function InvitationList() {
  const { data: invitations, isLoading, error } = useInvitations()

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Gagal memuat undangan: {error.message}
      </p>
    )
  }

  if (!invitations || invitations.length === 0) {
    return (
      <div className="glass-panel rounded-2xl border border-dashed border-border p-10 text-center">
        <p className="text-sm text-muted-foreground">
          Belum ada undangan. Buat undangan pertama Anda.
        </p>
        <Button
          className="mt-4 rounded-full"
          nativeButton={false}
          render={<Link href="/dashboard/new" />}
        >
          Buat undangan
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {invitations.map((invitation) => (
        <InvitationCard key={invitation.id} invitation={invitation} />
      ))}
    </div>
  )
}
