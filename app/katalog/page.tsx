import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingFooter } from "@/components/marketing/MarketingFooter"
import { themeIds, themes } from "@/components/themes/themes"
import { themeFonts } from "@/components/themes/fonts"

export const metadata: Metadata = {
  title: "Katalog Undangan — Invito",
  description: "Temukan desain sempurna untuk merayakan momen spesial Anda.",
}

export default function KatalogPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <MarketingHeader />

      <section className="px-5 pt-16 pb-8 md:px-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-4xl font-bold text-foreground">
            Katalog Undangan
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Temukan desain sempurna untuk merayakan momen spesial Anda. Elegan,
            modern, dan mudah disesuaikan.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {themeIds.map((id) => (
            <div key={id} className="glass-panel overflow-hidden rounded-2xl">
              <div
                data-invitation-theme={id}
                className={`flex h-56 flex-col items-center justify-center gap-2 bg-background ${themeFonts[id].variable}`}
              >
                <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  Undangan
                </p>
                <p className="font-heading text-2xl text-primary italic">
                  Budi &amp; Ani
                </p>
                <div className="h-px w-10 bg-accent" />
              </div>
              <div className="p-6">
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {themes[id].label}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {themes[id].description}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 w-full rounded-full"
                  nativeButton={false}
                  render={<Link href="/login" />}
                >
                  Gunakan Tema Ini
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
