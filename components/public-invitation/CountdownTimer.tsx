"use client"

import { useEffect, useState } from "react"

type TimeLeft = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(eventDate: string): TimeLeft | null {
  const diff = new Date(eventDate).getTime() - Date.now()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const units: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Hari" },
  { key: "hours", label: "Jam" },
  { key: "minutes", label: "Menit" },
  { key: "seconds", label: "Detik" },
]

export function CountdownTimer({ eventDate }: { eventDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Date.now() isn't available at SSR time, so the first tick must happen
    // client-side only — otherwise server/client render would mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
    setTimeLeft(getTimeLeft(eventDate))

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(eventDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [eventDate])

  if (!mounted) return null

  if (!timeLeft) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Acara sedang atau telah berlangsung
      </p>
    )
  }

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {units.map(({ key, label }) => (
        <div key={key} className="flex flex-col items-center gap-1">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 font-heading text-lg font-semibold text-primary sm:size-16 sm:text-2xl">
            {String(timeLeft[key]).padStart(2, "0")}
          </div>
          <span className="text-[10px] tracking-widest text-muted-foreground uppercase sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
