"use client"

import { useState, type ReactNode } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

const viewOptions = [
  { id: "mobile", label: "Tampilan Mobile", icon: Smartphone },
  { id: "desktop", label: "Tampilan Desktop", icon: Monitor },
] as const

type ViewMode = (typeof viewOptions)[number]["id"]

export function PreviewFrame({ children }: { children: ReactNode }) {
  const [view, setView] = useState<ViewMode>("mobile")

  return (
    <div className="flex flex-1 flex-col items-center gap-8 px-4 py-10">
      <div className="glass-panel inline-flex gap-1 rounded-full p-1">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setView(option.id)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              view === option.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <option.icon className="size-4" />
            {option.label}
          </button>
        ))}
      </div>

      {view === "mobile" ? (
        <div className="rounded-[2.5rem] border-8 border-foreground/90 bg-foreground/90 p-1.5 shadow-xl">
          <div className="relative h-[720px] w-[360px] overflow-y-auto rounded-[1.75rem] bg-background">
            <div
              aria-hidden
              className="absolute top-2 left-1/2 z-10 h-4 w-24 -translate-x-1/2 rounded-full bg-foreground/90"
            />
            {children}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-border shadow-xl">
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-destructive/60" />
            <span className="size-2.5 rounded-full bg-accent" />
            <span className="size-2.5 rounded-full bg-secondary" />
          </div>
          <div className="max-h-[720px] overflow-y-auto">{children}</div>
        </div>
      )}
    </div>
  )
}
