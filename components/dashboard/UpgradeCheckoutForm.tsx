"use client"

import { useState } from "react"
import { toast } from "sonner"
import { CreditCard, Landmark, Lock, ShieldCheck, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const paymentMethods = [
  { id: "card", label: "Kartu Kredit", icon: CreditCard },
  { id: "wallet", label: "Dompet Digital", icon: Wallet },
  { id: "transfer", label: "Transfer Bank", icon: Landmark },
] as const

const summaryItems = [
  "Akses semua tema premium",
  "Tamu tak terbatas",
  "Dukungan prioritas",
]

export function UpgradeCheckoutForm() {
  const [method, setMethod] = useState<(typeof paymentMethods)[number]["id"]>("card")

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault()
    toast.info("Pembayaran belum tersedia. Segera hadir!")
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
      <form
        id="upgrade-checkout-form"
        onSubmit={handleSubmit}
        className="glass-panel rounded-2xl p-6 md:p-8"
      >
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Metode Pembayaran
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {paymentMethods.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setMethod(item.id)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors",
                method === item.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-foreground/30"
              )}
            >
              <item.icon className="size-6 text-foreground" />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        {method === "card" ? (
          <div className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="card-name">Nama pada Kartu</Label>
              <Input id="card-name" placeholder="Nama Anda" autoComplete="off" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="card-number">Nomor Kartu</Label>
              <Input id="card-number" placeholder="0000 0000 0000 0000" autoComplete="off" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="card-expiry">Kedaluwarsa (BB/TT)</Label>
                <Input id="card-expiry" placeholder="BB/TT" autoComplete="off" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="card-cvc">CVC</Label>
                <Input id="card-cvc" placeholder="123" autoComplete="off" />
              </div>
            </div>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
            Instruksi pembayaran akan ditampilkan setelah fitur ini tersedia.
          </p>
        )}
      </form>

      <div className="glass-panel h-fit rounded-2xl p-6">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Paket Premium
        </span>
        <div className="mt-3 flex items-baseline justify-between">
          <h3 className="font-heading text-2xl font-bold text-foreground">Premium</h3>
          <p className="font-heading text-2xl font-bold text-foreground">
            Rp 299rb
            <span className="text-sm font-normal text-muted-foreground">/acara</span>
          </p>
        </div>

        <ul className="mt-6 space-y-2 border-t border-border pt-6">
          {summaryItems.map((item) => (
            <li key={item} className="text-sm text-foreground">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 space-y-2 border-t border-border pt-6 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>Rp 299.000</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Pajak (estimasi)</span>
            <span>Rp 0</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-heading text-base font-semibold text-foreground">
            <span>Total</span>
            <span>Rp 299.000</span>
          </div>
        </div>

        <Button
          type="submit"
          form="upgrade-checkout-form"
          className="mt-6 h-12 w-full gap-2 rounded-full"
        >
          <Lock className="size-4" />
          Bayar Rp 299.000 Sekarang
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="size-3.5" />
          Pembayaran aman dan terenkripsi.
        </p>
      </div>
    </div>
  )
}
