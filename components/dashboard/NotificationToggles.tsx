"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const items = [
  {
    id: "email-rsvp",
    label: "Email RSVP",
    description: "Terima email saat ada tamu yang merespons.",
    defaultChecked: true,
  },
  {
    id: "weekly-digest",
    label: "Ringkasan Mingguan",
    description: "Ringkasan acara mendatang Anda setiap minggu.",
    defaultChecked: false,
  },
]

export function NotificationToggles() {
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((item) => [item.id, item.defaultChecked]))
  )

  return (
    <ul className="mt-6 space-y-5">
      {items.map((item) => (
        <li key={item.id} className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.description}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={checked[item.id]}
            aria-label={item.label}
            onClick={() =>
              setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
            }
            className={cn(
              "relative h-6 w-11 shrink-0 rounded-full transition-colors",
              checked[item.id] ? "bg-primary" : "bg-muted"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform",
                checked[item.id] && "translate-x-5"
              )}
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
