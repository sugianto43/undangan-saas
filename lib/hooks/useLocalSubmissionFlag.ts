"use client"

import { useEffect, useState } from "react"

export function useLocalSubmissionFlag(key: string) {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // localStorage isn't available during SSR, so this can't be a lazy useState initializer.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSubmitted(localStorage.getItem(key) === "true")
  }, [key])

  function markSubmitted() {
    localStorage.setItem(key, "true")
    setSubmitted(true)
  }

  function reset() {
    localStorage.removeItem(key)
    setSubmitted(false)
  }

  return { submitted, markSubmitted, reset }
}
