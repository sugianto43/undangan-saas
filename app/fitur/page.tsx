import Link from "next/link"
import type { Metadata } from "next"
import { Check, FilePenLine, Images, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingFooter } from "@/components/marketing/MarketingFooter"

export const metadata: Metadata = {
  title: "Fitur Unggulan — Invito",
  description: "Semua yang Anda butuhkan untuk membuat undangan digital yang elegan.",
}

const features = [
  {
    icon: FilePenLine,
    eyebrow: "Kreativitas tanpa batas",
    title: "Editor Intuitif Drag-and-Drop",
    description:
      "Rancang undangan persis seperti yang Anda bayangkan. Antarmuka kami memungkinkan Anda memindahkan elemen, mengubah font, dan menyesuaikan warna dengan mudah tanpa perlu keahlian coding.",
    points: [
      "Ratusan template premium yang dapat disesuaikan.",
      "Pilihan tipografi elegan dan palet warna kustom.",
    ],
  },
  {
    icon: Users,
    eyebrow: "Organisasi sempurna",
    title: "Manajemen Tamu & RSVP Real-time",
    description:
      "Pantau kehadiran tamu dengan sistem RSVP pintar kami. Ketahui secara instan siapa yang akan datang dan kelola daftar tamu Anda dari satu dashboard terpusat yang rapi.",
    points: [
      "Notifikasi RSVP langsung ke perangkat Anda.",
      "Rekap kehadiran otomatis dalam satu tampilan.",
    ],
  },
  {
    icon: MapPin,
    eyebrow: "Petunjuk akurat",
    title: "Integrasi Peta Lokasi Cerdas",
    description:
      "Pastikan tamu Anda tiba di lokasi tanpa tersesat. Sematkan peta interaktif langsung di dalam undangan Anda yang terhubung dengan aplikasi navigasi favorit mereka.",
    points: [
      "Tautan langsung ke Google Maps.",
      "Desain peta minimalis yang menyatu dengan tema undangan.",
    ],
  },
  {
    icon: Images,
    eyebrow: "Kenangan indah",
    title: "Galeri Foto Premium",
    description:
      "Bagikan momen berharga Anda melalui galeri foto yang menawan. Tampilkan foto pre-wedding dengan tampilan grid yang elegan bak pameran seni digital.",
    points: [
      "Tampilan grid galeri dengan lightbox elegan.",
      "Optimasi gambar otomatis untuk loading cepat.",
    ],
  },
]

export default function FiturPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <MarketingHeader />

      <section className="px-5 py-20 text-center md:px-16">
        <h1 className="mx-auto max-w-2xl font-heading text-4xl font-bold text-balance text-foreground sm:text-5xl">
          Fitur Unggulan Kami
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Semua yang Anda butuhkan untuk membuat undangan digital yang elegan
          dan mengelola tamu dengan mudah dalam satu platform yang terintegrasi.
        </p>
      </section>

      <div>
        {features.map((feature, index) => (
          <section
            key={feature.title}
            className={index % 2 === 1 ? "bg-muted/50" : undefined}
          >
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-16">
              <div className={index % 2 === 1 ? "md:order-2" : undefined}>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
                  <feature.icon className="size-4" />
                  {feature.eyebrow.toUpperCase()}
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  {feature.title}
                </h2>
                <p className="mt-4 text-muted-foreground">{feature.description}</p>
                <ul className="mt-6 space-y-3">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`glass-panel flex aspect-4/3 items-center justify-center rounded-2xl ${
                  index % 2 === 1 ? "md:order-1" : ""
                }`}
              >
                <feature.icon className="size-16 text-primary/40" />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="px-5 py-20 md:px-16">
        <div className="glass-panel mx-auto max-w-3xl rounded-2xl p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Siap Merayakan Momen Spesial Anda?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Mulai rancang undangan digital elegan Anda hari ini. Prosesnya
            mudah, cepat, dan hasilnya akan memukau para tamu Anda.
          </p>
          <Button
            size="lg"
            className="mt-6 h-12 rounded-full px-8"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Mulai Sekarang
          </Button>
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
