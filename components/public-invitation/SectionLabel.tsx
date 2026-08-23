export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-center text-xs tracking-widest text-muted-foreground uppercase">
      {children}
    </p>
  )
}
