"use client"

import { useWishes } from "@/lib/queries/useWishes"
import { Skeleton } from "@/components/ui/skeleton"

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
})

export function WishesList({ invitationId }: { invitationId: string }) {
  const { data: wishes, isLoading, error } = useWishes(invitationId)

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Gagal memuat ucapan: {error.message}
      </p>
    )
  }

  if (!wishes || wishes.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Belum ada ucapan. Jadilah yang pertama mengirim ucapan.
      </p>
    )
  }

  return (
    <ul className="space-y-3">
      {wishes.map((wish) => (
        <li key={wish.id} className="rounded-lg border p-4">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-medium">{wish.name}</p>
            <p className="text-xs text-muted-foreground">
              {dateFormatter.format(new Date(wish.created_at))}
            </p>
          </div>
          <p className="mt-1 text-sm whitespace-pre-line">{wish.message}</p>
        </li>
      ))}
    </ul>
  )
}
