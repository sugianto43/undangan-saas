"use client"

import { FileText, MailCheck, TrendingUp } from "lucide-react"
import { useInvitations } from "@/lib/queries/useInvitations"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardStats() {
  const { data: invitations, isLoading } = useInvitations()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    )
  }

  const published = invitations?.filter((i) => i.status === "published").length ?? 0
  const draft = invitations?.filter((i) => i.status === "draft").length ?? 0
  const totalRsvp = invitations?.reduce((sum, i) => sum + i.rsvp_count, 0) ?? 0

  const stats = [
    {
      icon: TrendingUp,
      label: "Undangan Aktif",
      value: published,
    },
    {
      icon: MailCheck,
      label: "Total RSVP",
      value: totalRsvp,
    },
    {
      icon: FileText,
      label: "Draft",
      value: draft,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-panel flex h-32 flex-col justify-between rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <stat.icon className="size-4" />
            <span className="text-xs font-semibold tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
          <span className="font-heading text-4xl font-bold text-foreground">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  )
}
