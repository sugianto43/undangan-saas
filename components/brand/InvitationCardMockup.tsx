export function InvitationCardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-xs">
      <div
        aria-hidden
        className="absolute inset-0 -rotate-6 rounded-2xl border border-border bg-secondary"
      />
      <div className="relative rotate-2 rounded-2xl border border-border bg-card p-8 text-center shadow-xl transition-transform duration-300 hover:rotate-0">
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
          Undangan Pernikahan
        </p>
        <p className="mt-4 font-heading text-3xl text-balance text-primary italic">
          Budi &amp; Ani
        </p>
        <div className="mx-auto my-5 h-px w-10 bg-accent" />
        <p className="text-xs tracking-[0.2em] text-muted-foreground">
          12 . 12 . 2026
        </p>

        <div
          aria-hidden
          className="absolute -top-3 -right-3 flex size-11 -rotate-12 items-center justify-center rounded-full border-2 border-accent bg-card font-heading text-[10px] tracking-wide text-primary italic shadow-sm"
        >
          RSVP
        </div>
      </div>
    </div>
  )
}
