import Link from "next/link"
import { CirclePlay, FilePenLine, ListChecks, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingFooter } from "@/components/marketing/MarketingFooter"

const features = [
  {
    icon: FilePenLine,
    iconBg: "bg-secondary text-secondary-foreground",
    title: "Mudah disesuaikan",
    description:
      "Personalisasi setiap detail undangan agar selaras dengan tema acara Anda, tanpa perlu keahlian desain.",
  },
  {
    icon: ListChecks,
    iconBg: "bg-accent text-accent-foreground",
    title: "RSVP real-time",
    description:
      "Lacak konfirmasi kehadiran tamu secara otomatis dari satu dashboard yang intuitif.",
  },
  {
    icon: Palette,
    iconBg: "bg-muted text-foreground",
    title: "Tema elegan",
    description:
      "Pilih dari koleksi tema yang dikurasi untuk berbagai jenis perayaan — pernikahan, ulang tahun, pertunangan.",
  },
]

const steps = [
  {
    number: "1",
    title: "Pilih desain",
    description: "Temukan tema yang paling sesuai dengan karakter acara Anda.",
  },
  {
    number: "2",
    title: "Personalisasi",
    description: "Sesuaikan teks, foto, dan detail acara dengan editor yang mudah.",
  },
  {
    number: "3",
    title: "Sebarkan & lacak",
    description: "Bagikan link undangan, pantau RSVP dan ucapan secara langsung.",
  },
]

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <MarketingHeader />

      <section className="relative flex min-h-[75vh] flex-col items-center justify-center gap-6 overflow-hidden px-5 py-20 text-center">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, var(--color-secondary) 0%, transparent 60%)",
          }}
        />
        <span className="glass-panel rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
          The Modern Host
        </span>
        <h1 className="max-w-3xl font-heading text-4xl font-bold text-balance text-foreground sm:text-5xl">
          Rayakan momen spesial Anda dengan undangan digital yang elegan
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Isi detail acara, pilih tema, bagikan link — undangan Anda siap
          dalam 5 menit. Gratis, tanpa iklan.
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <Button size="lg" className="h-12 rounded-full px-8" nativeButton={false} render={<Link href="/login" />}>
            Mulai sekarang
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="glass-panel h-12 gap-2 rounded-full px-8"
            nativeButton={false}
            render={<Link href="/katalog" />}
          >
            <CirclePlay className="size-5" />
            Lihat katalog tema
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-16">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-foreground">
            Kemewahan dalam kemudahan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Fitur yang dirancang untuk memberikan pengalaman terbaik bagi Anda
            dan tamu undangan.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-panel flex flex-col items-start gap-4 rounded-2xl p-6"
            >
              <div
                className={`flex size-12 items-center justify-center rounded-full ${feature.iconBg}`}
              >
                <feature.icon className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 px-5 py-20 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Cara kerja Invito
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Tiga langkah sederhana menuju undangan yang sempurna.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div className="mb-6 flex size-14 items-center justify-center rounded-full border border-border bg-background font-heading text-lg font-semibold text-primary shadow-sm">
                  {step.number}
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
