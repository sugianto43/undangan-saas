"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  attendingLabels,
  attendingOptions,
  rsvpInputSchema,
  type RsvpInput,
} from "@/lib/validations/rsvp"
import { useCreateRsvp } from "@/lib/queries/useCreateRsvp"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function RsvpForm({ invitationId }: { invitationId: string }) {
  const createRsvp = useCreateRsvp()
  const { submitted, markSubmitted, reset } = useLocalSubmissionFlag(
    `rsvp-submitted-${invitationId}`
  )

  const form = useForm<RsvpInput>({
    resolver: zodResolver(rsvpInputSchema),
    defaultValues: { guest_name: "", attending: "yes", guest_count: 1 },
  })

  function onSubmit(data: RsvpInput) {
    createRsvp.mutate(
      { ...data, invitation_id: invitationId },
      {
        onSuccess: () => {
          toast.success("RSVP berhasil dikirim, terima kasih!")
          markSubmitted()
        },
        onError: (error) => toast.error(error.message),
      }
    )
  }

  if (submitted) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <p className="text-sm">Terima kasih, RSVP Anda sudah kami terima.</p>
        <Button
          variant="link"
          size="sm"
          className="mt-1"
          onClick={reset}
          type="button"
        >
          Kirim RSVP lain
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="guest_name"
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
          name="attending"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Konfirmasi kehadiran</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih status kehadiran">
                      {(value: (typeof attendingOptions)[number] | null) =>
                        value ? attendingLabels[value] : "Pilih status kehadiran"
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {attendingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {attendingLabels[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="guest_count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah tamu</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={20}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={createRsvp.isPending}>
          {createRsvp.isPending ? "Mengirim..." : "Kirim RSVP"}
        </Button>
      </form>
    </Form>
  )
}
