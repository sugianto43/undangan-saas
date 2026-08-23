import Link from "next/link"
import type { Metadata } from "next"
import { X } from "lucide-react"
import { Wordmark } from "@/components/brand/Wordmark"
import { UpgradeCheckoutForm } from "@/components/dashboard/UpgradeCheckoutForm"

export const metadata: Metadata = {
  title: "Upgrade ke Premium — Invito",
}

export default function UpgradePage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <header className="flex items-center justify-between px-5 py-6 md:px-16">
        <Wordmark />
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <X className="size-4" />
          Batal
        </Link>
      </header>

      <div className="mx-auto w-full max-w-5xl px-5 pb-20 md:px-16">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Checkout Aman
        </h1>
        <p className="mt-2 text-muted-foreground">
          Selesaikan upgrade Anda untuk membuka fitur premium.
        </p>

        <UpgradeCheckoutForm />
      </div>
    </main>
  )
}
