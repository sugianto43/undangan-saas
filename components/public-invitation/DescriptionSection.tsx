export function DescriptionSection({
  description,
}: {
  description: string
}) {
  return (
    <section className="mx-auto max-w-md px-6 py-10 text-center">
      <p className="text-xs tracking-widest text-muted-foreground uppercase">
        Cerita Kami
      </p>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed">
        {description}
      </p>
    </section>
  )
}
