import Link from "next/link"
import { Wordmark } from "@/components/brand/Wordmark"

const footerLinks = [
  { href: "/bantuan", label: "Tentang Kami" },
  { href: "/bantuan", label: "Hubungi Kami" },
  { href: "/bantuan", label: "Kebijakan Privasi" },
  { href: "/bantuan", label: "Syarat & Ketentuan" },
]

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-muted/50 px-5 py-10 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <Wordmark />
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">© 2026 Invito. The Modern Host.</p>
      </div>
    </footer>
  )
}
