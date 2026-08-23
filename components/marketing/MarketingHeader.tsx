import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wordmark } from "@/components/brand/Wordmark"

const navLinks = [
  { href: "/katalog", label: "Katalog" },
  { href: "/fitur", label: "Fitur" },
  { href: "/harga", label: "Harga" },
  { href: "/inspirasi", label: "Inspirasi" },
]

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-16">
        <Wordmark />
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button size="lg" className="rounded-full" nativeButton={false} render={<Link href="/login" />}>
          Buat Undangan
        </Button>
      </div>
    </header>
  )
}
