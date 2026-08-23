import Link from "next/link"
import type { Metadata } from "next"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingFooter } from "@/components/marketing/MarketingFooter"
import { ComingSoonButton } from "@/components/marketing/ComingSoonButton"

export const metadata: Metadata = {
  title: "Paket Harga — Invito",
  description: "Pilih paket sesuai kebutuhan Anda.",
}

const plans = [
  {
    name: "Gratis",
    tagline: "Mulai perjalanan perayaan Anda.",
    price: "Rp 0",
    period: null,
    features: ["1 Desain Undangan", "RSVP Standar", "Hingga 50 Tamu"],
    cta: "Pilih Gratis",
    href: "/login",
    featured: false,
  },
  {
    name: "Premium",
    tagline: "Pengalaman tak terlupakan.",
    price: "Rp 299rb",
    period: "/acara",
    features: [
      "Akses Semua Tema Premium",
      "Tamu Tak Terbatas",
      "Buku Tamu Digital",
      "Pengingat WhatsApp Otomatis",
    ],
    cta: "Pilih Premium",
    href: null,
    featured: true,
  },
  {
    name: "Eksklusif",
    tagline: "Layanan lengkap dan kustomisasi khusus.",
    price: "Hubungi Kami",
    period: null,
    features: ["Desainer Khusus", "Domain Kustom (.com/.id)", "Dukungan Prioritas 24/7"],
    cta: "Konsultasi",
    href: "/bantuan",
    featured: false,
  },
]

export default function HargaPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <MarketingHeader />

      <section className="px-5 pt-16 pb-4 text-center md:px-16">
        <h1 className="mx-auto max-w-2xl font-heading text-4xl font-bold text-balance text-foreground">
          Pilih Paket Sesuai Kebutuhan Anda
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Dari undangan digital sederhana hingga layanan pramutamu penuh, kami
          menyediakan opsi untuk setiap perayaan.
        </p>
      </section>

      <section className="px-5 py-12 md:px-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.featured
                  ? "glass-panel relative rounded-2xl border-2 border-primary p-8 md:-translate-y-4"
                  : "glass-panel rounded-2xl p-8"
              }
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground uppercase">
                  Paling Populer
                </span>
              ) : null}
              <h2 className="font-heading text-xl font-semibold text-foreground">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
              <p className="mt-6 font-heading text-4xl font-bold text-foreground">
                {plan.price}
                {plan.period ? (
                  <span className="text-base font-normal text-muted-foreground">
                    {plan.period}
                  </span>
                ) : null}
              </p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {plan.href ? (
                  <Button
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full rounded-full"
                    nativeButton={false}
                    render={<Link href={plan.href} />}
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <ComingSoonButton
                    variant={plan.featured ? "default" : "outline"}
                    className="w-full"
                  >
                    {plan.cta}
                  </ComingSoonButton>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-16">
        <div className="glass-panel mx-auto max-w-3xl rounded-2xl p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Butuh detail lebih lanjut?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Tim kami siap membantu Anda memilih paket yang tepat untuk
            perayaan spesial Anda.
          </p>
          <Link
            href="/bantuan"
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            Lihat Pusat Bantuan
          </Link>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
