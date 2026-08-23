import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Undangan Digital
      </h1>
      <p className="max-w-md text-muted-foreground">
        Buat undangan digital sendiri, live dalam 5 menit. Gratis.
      </p>
      <Button size="lg" nativeButton={false} render={<Link href="/login" />}>
        Buat undangan gratis
      </Button>
    </main>
  )
}
