"use client"

import { Button } from "@/components/ui/button"

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-semibold">Terjadi kesalahan</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        Maaf, ada yang tidak berjalan semestinya. Coba muat ulang halaman ini.
      </p>
      <Button onClick={retry}>Coba lagi</Button>
    </main>
  )
}
