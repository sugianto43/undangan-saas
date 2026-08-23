"use client"

import { useState } from "react"
import { useRsvps } from "@/lib/queries/useRsvps"
import { attendingLabels, attendingOptions } from "@/lib/validations/rsvp"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
})

type Filter = "all" | (typeof attendingOptions)[number]

export function ResponsesSummary({ invitationId }: { invitationId: string }) {
  const { data: rsvps, isLoading, error } = useRsvps(invitationId)
  const [filter, setFilter] = useState<Filter>("all")

  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-2xl" />
  }

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Gagal memuat RSVP: {error.message}
      </p>
    )
  }

  const summary = { yes: 0, no: 0, maybe: 0, totalGuests: 0 }
  for (const rsvp of rsvps ?? []) {
    summary[rsvp.attending] += 1
    if (rsvp.attending === "yes") summary.totalGuests += rsvp.guest_count
  }

  const total = (rsvps ?? []).length
  const yesPct = total ? (summary.yes / total) * 100 : 0
  const maybePct = total ? (summary.maybe / total) * 100 : 0

  const filtered = (rsvps ?? []).filter(
    (r) => filter === "all" || r.attending === filter
  )

  return (
    <div className="space-y-6">
      <div className="glass-panel flex flex-col items-center gap-8 rounded-2xl p-6 sm:flex-row">
        <div
          className="relative flex size-36 shrink-0 items-center justify-center rounded-full"
          style={{
            background: total
              ? `conic-gradient(var(--color-primary) 0% ${yesPct}%, var(--color-accent) ${yesPct}% ${yesPct + maybePct}%, var(--color-muted) ${yesPct + maybePct}% 100%)`
              : "var(--color-muted)",
          }}
        >
          <div className="flex size-24 flex-col items-center justify-center rounded-full bg-card">
            <span className="font-heading text-3xl font-bold text-foreground">
              {total}
            </span>
            <span className="text-[10px] text-muted-foreground uppercase">
              RSVP
            </span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <p className="font-heading text-2xl font-bold text-primary">
              {summary.yes}
            </p>
            <p className="text-xs text-muted-foreground">Hadir</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-accent-foreground">
              {summary.maybe}
            </p>
            <p className="text-xs text-muted-foreground">Mungkin</p>
          </div>
          <div>
            <p className="font-heading text-2xl font-bold text-muted-foreground">
              {summary.no}
            </p>
            <p className="text-xs text-muted-foreground">Tidak hadir</p>
          </div>
          <div className="col-span-3 mt-2 border-t border-border pt-2">
            <p className="text-sm text-muted-foreground">
              Total tamu hadir:{" "}
              <span className="font-semibold text-foreground">
                {summary.totalGuests}
              </span>{" "}
              orang
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-all",
            filter === "all"
              ? "border-transparent bg-accent text-accent-foreground"
              : "border-border text-muted-foreground hover:bg-muted"
          )}
        >
          Semua ({total})
        </button>
        {attendingOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-all",
              filter === option
                ? "border-transparent bg-accent text-accent-foreground"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {attendingLabels[option]} ({summary[option]})
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="glass-panel overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="p-4 font-heading font-semibold text-foreground">
                  Nama Tamu
                </th>
                <th className="p-4 font-heading font-semibold text-foreground">
                  Status
                </th>
                <th className="p-4 font-heading font-semibold text-foreground">
                  Waktu
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((rsvp) => (
                <tr key={rsvp.id} className="border-b border-border last:border-0">
                  <td className="p-4">
                    <p className="font-medium text-foreground">
                      {rsvp.guest_name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {rsvp.guest_count} orang
                    </p>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                        rsvp.attending === "yes" && "bg-primary/10 text-primary",
                        rsvp.attending === "maybe" && "bg-accent text-accent-foreground",
                        rsvp.attending === "no" && "bg-destructive/10 text-destructive"
                      )}
                    >
                      <span
                        className={cn(
                          "size-1.5 rounded-full",
                          rsvp.attending === "yes" && "bg-primary",
                          rsvp.attending === "maybe" && "bg-accent-foreground",
                          rsvp.attending === "no" && "bg-destructive"
                        )}
                      />
                      {attendingLabels[rsvp.attending]}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {dateFormatter.format(new Date(rsvp.created_at))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">Belum ada RSVP.</p>
      )}
    </div>
  )
}
