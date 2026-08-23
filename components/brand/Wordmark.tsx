import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/brand/LogoMark"

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className="size-6" />
      <span className="font-heading text-lg font-semibold tracking-tight">
        Undangan
      </span>
    </span>
  )
}
