"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queries/keys"
import type { InvitationInput } from "@/lib/validations/invitation"
import type { Invitation, InvitationStatus } from "@/types/invitation"

async function requestJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new Error(body?.error ?? "Terjadi kesalahan, silakan coba lagi")
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export function useCreateInvitation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: InvitationInput) =>
      requestJson<Invitation>("/api/invitations", {
        method: "POST",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations })
    },
  })
}

export function useUpdateInvitation(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: InvitationInput) =>
      requestJson<Invitation>(`/api/invitations/${id}`, {
        method: "PATCH",
        body: JSON.stringify(input),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations })
      queryClient.invalidateQueries({ queryKey: queryKeys.invitation(id) })
    },
  })
}

export function useDeleteInvitation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      requestJson<undefined>(`/api/invitations/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations })
    },
  })
}

export function usePublishInvitation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: InvitationStatus }) =>
      requestJson<Invitation>(`/api/invitations/${id}/publish`, {
        method: "POST",
        body: JSON.stringify({ status }),
      }),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.invitations })
      queryClient.invalidateQueries({ queryKey: queryKeys.invitation(id) })
    },
  })
}
