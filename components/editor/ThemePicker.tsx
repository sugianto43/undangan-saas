"use client"

import { CheckIcon } from "lucide-react"
import { themeIds, themes, type ThemeId } from "@/components/themes/themes"
import { themeFonts } from "@/components/themes/fonts"
import { cn } from "@/lib/utils"

export function ThemePicker({
  value,
  onChange,
}: {
  value: ThemeId
  onChange: (id: ThemeId) => void
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {themeIds.map((id) => {
        const selected = value === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "glass-panel overflow-hidden rounded-2xl text-left transition-all",
              selected
                ? "ring-2 ring-primary"
                : "hover:-translate-y-0.5 hover:shadow-md"
            )}
          >
            <div
              data-invitation-theme={id}
              className={cn(
                "flex h-32 flex-col items-center justify-center gap-1 bg-background",
                themeFonts[id].variable
              )}
            >
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Undangan
              </p>
              <p className="font-heading text-lg text-primary italic">
                Budi &amp; Ani
              </p>
              <div className="h-px w-8 bg-accent" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <p className="font-heading font-semibold text-foreground">
                  {themes[id].label}
                </p>
                <p className="text-xs text-muted-foreground">
                  {themes[id].description}
                </p>
              </div>
              {selected ? (
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckIcon className="size-3.5" />
                </div>
              ) : null}
            </div>
          </button>
        )
      })}
    </div>
  )
}
