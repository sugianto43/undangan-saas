import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InvitationCardMockup } from "@/components/brand/InvitationCardMockup"
import { Wordmark } from "@/components/brand/Wordmark"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="p-6">
        <Wordmark />
      </header>

      <div className="mx-auto grid flex-1 w-full max-w-5xl grid-cols-1 items-center gap-12 px-6 py-10 md:grid-cols-2 md:py-16">
        <div className="space-y-6 text-center md:text-left">
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Undangan digital untuk momen Anda
          </p>
          <h1 className="font-heading text-4xl leading-tight text-balance sm:text-5xl">
            Undangan yang terasa dibuat khusus untuk hari Anda
          </h1>
          <p className="mx-auto max-w-md text-muted-foreground md:mx-0">
            Isi detail acara, pilih tema, bagikan link — undangan Anda siap
            dalam 5 menit. Gratis, tanpa iklan.
          </p>
          <div className="flex justify-center md:justify-start">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              Buat undangan gratis
            </Button>
          </div>
        </div>

        <InvitationCardMockup />
      </div>
    </main>
  )
}
