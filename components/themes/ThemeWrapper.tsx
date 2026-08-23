import type { ReactNode } from "react"
import { themeFonts } from "@/components/themes/fonts"
import type { ThemeId } from "@/components/themes/themes"
import { cn } from "@/lib/utils"

export function ThemeWrapper({
  themeId,
  className,
  children,
}: {
  themeId: ThemeId
  className?: string
  children: ReactNode
}) {
  return (
    <div
      data-invitation-theme={themeId}
      className={cn(
        "bg-background text-foreground",
        themeFonts[themeId].variable,
        className
      )}
    >
      {children}
    </div>
  )
}
