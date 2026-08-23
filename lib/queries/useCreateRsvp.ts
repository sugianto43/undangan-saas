"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queries/keys"
import type { RsvpRequest } from "@/lib/validations/rsvp"

async function createRsvp(input: RsvpRequest) {
  const response = await fetch("/api/rsvps", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? "Gagal mengirim RSVP, silakan coba lagi")
  }

  return response.json()
}

export function useCreateRsvp() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createRsvp,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.rsvps(variables.invitation_id),
      })
    },
  })
}
