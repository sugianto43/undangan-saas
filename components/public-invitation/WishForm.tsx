"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { wishInputSchema, type WishInput } from "@/lib/validations/wish"
import { useCreateWish } from "@/lib/queries/useCreateWish"
import { useLocalSubmissionFlag } from "@/lib/hooks/useLocalSubmissionFlag"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function WishForm({ invitationId }: { invitationId: string }) {
  const createWish = useCreateWish()
  const { submitted, markSubmitted, reset: resetFlag } = useLocalSubmissionFlag(
    `wish-submitted-${invitationId}`
  )

  const form = useForm<WishInput>({
    resolver: zodResolver(wishInputSchema),
    defaultValues: { name: "", message: "" },
  })

  function onSubmit(data: WishInput) {
    createWish.mutate(
      { ...data, invitation_id: invitationId },
      {
        onSuccess: () => {
          toast.success("Ucapan berhasil dikirim")
          form.reset()
          markSubmitted()
        },
        onError: (error) => toast.error(error.message),
      }
    )
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm">Terima kasih atas ucapannya!</p>
        <Button
          variant="link"
          size="sm"
          className="mt-1"
          onClick={resetFlag}
          type="button"
        >
          Kirim ucapan lain
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Nama Anda" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ucapan</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Tulis ucapan Anda..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={createWish.isPending}>
          {createWish.isPending ? "Mengirim..." : "Kirim ucapan"}
        </Button>
      </form>
    </Form>
  )
}
