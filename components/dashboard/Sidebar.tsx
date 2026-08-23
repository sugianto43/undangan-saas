"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CircleQuestionMark, LayoutGrid, LogOut, Settings } from "lucide-react"
import { signOutAction } from "@/lib/actions/auth"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/brand/Wordmark"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/pengaturan", label: "Pengaturan", icon: Settings },
]

export function Sidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar p-4 md:flex">
      <Link href="/dashboard" className="mb-8 px-2">
        <Wordmark />
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:translate-x-1",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-1 border-t border-border pt-4">
        <Link
          href="/bantuan"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:translate-x-1 hover:bg-muted"
        >
          <CircleQuestionMark className="size-4" />
          Pusat Bantuan
        </Link>
        <form action={signOutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 px-3 text-muted-foreground hover:bg-muted"
          >
            <LogOut className="size-4" />
            Keluar
          </Button>
        </form>
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary">
            {email.charAt(0).toUpperCase()}
          </div>
          <span className="truncate text-xs text-muted-foreground">{email}</span>
        </div>
      </div>
    </aside>
  )
}
