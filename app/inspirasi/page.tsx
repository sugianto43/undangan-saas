import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"
import { MarketingHeader } from "@/components/marketing/MarketingHeader"
import { MarketingFooter } from "@/components/marketing/MarketingFooter"
import { NewsletterForm } from "@/components/marketing/NewsletterForm"

export const metadata: Metadata = {
  title: "Inspirasi & Tips — Invito",
  description: "Temukan ide, tren terbaru, dan panduan merencanakan momen tak terlupakan.",
}

const articles = [
  {
    tag: "Panduan",
    title: "Menyusun Menu Acara yang Mengesankan",
    excerpt:
      "Pilihan kuliner tidak hanya tentang rasa, tetapi juga presentasi dan alur hidangan yang mencerminkan tema acara Anda.",
    readTime: "5 Menit Baca",
  },
  {
    tag: "Teknologi",
    title: "Mengelola RSVP Secara Digital Tanpa Stres",
    excerpt:
      "Lupakan kerumitan melacak tamu secara manual. Pelajari cara memanfaatkan alat digital untuk pengalaman RSVP yang lancar.",
    readTime: "4 Menit Baca",
  },
  {
    tag: "Desain",
    title: "Bunga Minimalis: Tren Dekorasi Berkelas",
    excerpt:
      "Beranjak dari rangkaian bunga padat menuju komposisi arsitektural yang menonjolkan bentuk, ruang, dan warna.",
    readTime: "6 Menit Baca",
  },
]

export default function InspirasiPage() {
  return (
    <main className="flex flex-1 flex-col bg-background">
      <MarketingHeader />

      <section className="px-5 pt-16 pb-10 text-center md:px-16">
        <h1 className="mx-auto max-w-2xl font-heading text-4xl font-bold text-balance text-foreground">
          Inspirasi Perayaan Anda
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Temukan ide, tren terbaru, dan panduan lengkap untuk merencanakan
          momen tak terlupakan dengan elegan dan presisi.
        </p>
      </section>

      <section className="px-5 pb-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.title} className="glass-panel rounded-2xl p-6">
                <div className="flex aspect-4/3 items-center justify-center rounded-xl bg-linear-to-br from-secondary to-accent">
                  <span className="font-heading text-3xl text-primary/50 italic">
                    Invito
                  </span>
                </div>
                <p className="mt-4 text-xs font-semibold tracking-wide text-primary uppercase">
                  {article.tag}
                </p>
                <h2 className="mt-1 font-heading text-lg font-semibold text-foreground">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>{article.readTime}</span>
                  <ArrowRight className="size-4 text-primary" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 md:px-16">
        <div className="glass-panel mx-auto max-w-3xl rounded-2xl p-10 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Dapatkan Inspirasi Mingguan
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Jadilah yang pertama menerima tren acara terbaru, tips eksklusif,
            dan wawasan desain langsung ke kotak masuk Anda.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <MarketingFooter />
    </main>
  )
}
