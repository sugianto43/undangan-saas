"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queries/keys"
import type { WishRequest } from "@/lib/validations/wish"

async function createWish(input: WishRequest) {
  const response = await fetch("/api/wishes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? "Gagal mengirim ucapan, silakan coba lagi")
  }

  return response.json()
}

export function useCreateWish() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createWish,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wishes(variables.invitation_id),
      })
    },
  })
}
