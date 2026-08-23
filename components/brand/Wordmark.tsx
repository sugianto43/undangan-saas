import { cn } from "@/lib/utils"

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex size-6 items-center justify-center rounded-full border-[1.5px] border-accent font-heading text-[11px] text-primary italic">
        u
      </span>
      <span className="font-heading text-lg font-semibold tracking-tight">
        Undangan
      </span>
    </span>
  )
}
