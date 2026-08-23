import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function InvitationNotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">Undangan tidak ditemukan</h1>
      <p className="text-sm text-muted-foreground">
        Link ini mungkin salah ketik, sudah tidak berlaku, atau belum
        dipublikasikan oleh pemiliknya.
      </p>
      <Button render={<Link href="/" />}>Kembali ke beranda</Button>
    </main>
  )
}
