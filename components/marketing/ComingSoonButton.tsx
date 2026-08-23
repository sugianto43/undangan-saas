"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ComingSoonButton({
  children,
  className,
  variant,
}: {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
}) {
  return (
    <Button
      type="button"
      variant={variant}
      className={cn("rounded-full", className)}
      onClick={() => toast.info("Pembayaran belum tersedia. Segera hadir!")}
    >
      {children}
    </Button>
  )
}
