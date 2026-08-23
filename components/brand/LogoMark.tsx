export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="2.5"
        y="5.5"
        width="19"
        height="13"
        rx="2"
        className="stroke-primary"
        strokeWidth="1.4"
      />
      <path
        d="M3.5 7 L12 13 L20.5 7"
        className="stroke-primary"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="1.6" className="fill-accent" />
    </svg>
  )
}
