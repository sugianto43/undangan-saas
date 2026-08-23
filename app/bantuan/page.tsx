import type { Metadata } from "next"
import { ChevronDown, CreditCard, Palette, Rocket, Search } from "lucide-react"
import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingFooter } from "@/components/marketing/MarketingFooter"

export const metadata: Metadata = {
  title: "Pusat Bantuan — Invito",
  description: "Cari jawaban atas pertanyaan Anda seputar Invito.",
}

const categories = [
  {
    icon: Rocket,
    iconBg: "bg-secondary text-secondary-foreground",
    title: "Memulai",
    description: "Pelajari dasar membuat acara pertama dan mengundang tamu.",
  },
  {
    icon: Palette,
    iconBg: "bg-muted text-foreground",
    title: "Tips Desain",
    description: "Praktik terbaik memanfaatkan template glassmorphic dan tipografi kami.",
  },
  {
    icon: CreditCard,
    iconBg: "bg-accent text-accent-foreground",
    title: "Pembayaran & Tagihan",
    description: "Kelola langganan, lihat invoice, dan pahami harga.",
  },
]

const faqs = [
  {
    question: "Bagaimana cara menyesuaikan URL undangan?",
    answer:
      "Saat membuat undangan baru, Anda dapat mengubah slug URL pada kolom 'Tautan' sebelum menyimpan. Slug harus unik dan belum digunakan undangan lain.",
  },
  {
    question: "Bisakah saya melacak RSVP secara real-time?",
    answer:
      "Ya. Halaman rekap di dashboard menampilkan jumlah tamu hadir, mungkin hadir, dan tidak hadir secara langsung setiap kali ada tamu yang merespons.",
  },
  {
    question: "Berapa banyak foto yang bisa diunggah ke galeri?",
    answer:
      "Anda dapat mengunggah hingga 10 foto galeri per undangan, selain satu foto sampul utama.",
  },
]

export default function BantuanPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <MarketingHeader />

      <section className="px-5 pt-16 pb-4 text-center md:px-16">
        <h1 className="mx-auto max-w-2xl font-heading text-4xl font-bold text-balance text-foreground">
          Ada yang bisa kami bantu?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Cari jawaban seputar membuat, mengirim, dan mengelola undangan
          digital Anda.
        </p>
        <div className="glass-panel mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-full px-5 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            placeholder="Cari bantuan..."
            className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
      </section>

      <section className="px-5 py-16 md:px-16">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground">
          Kategori Bantuan
        </h2>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <div key={category.title} className="glass-panel rounded-2xl p-8 text-center">
              <div
                className={`mx-auto flex size-12 items-center justify-center rounded-full ${category.iconBg}`}
              >
                <category.icon className="size-6" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                {category.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-16">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground">
          Pertanyaan yang Sering Diajukan
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="glass-panel group rounded-2xl px-6 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-medium text-foreground marker:content-none">
                {faq.question}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
