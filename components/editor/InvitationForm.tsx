"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  eventTypeLabels,
  eventTypes,
  invitationSchema,
  type InvitationInput,
} from "@/lib/validations/invitation"
import { ThemePicker } from "@/components/editor/ThemePicker"
import { slugify } from "@/lib/slug"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type InvitationFormProps = {
  defaultValues?: Partial<InvitationInput>
  onSubmit: (data: InvitationInput) => void
  submitLabel: string
  pending?: boolean
  serverError?: string | null
}

export function InvitationForm({
  defaultValues,
  onSubmit,
  submitLabel,
  pending,
  serverError,
}: InvitationFormProps) {
  const slugTouchedRef = useRef(Boolean(defaultValues?.slug))

  const form = useForm<InvitationInput>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      event_type: defaultValues?.event_type ?? "wedding",
      title: defaultValues?.title ?? "",
      slug: defaultValues?.slug ?? "",
      event_date: defaultValues?.event_date ?? "",
      location_text: defaultValues?.location_text ?? "",
      location_link: defaultValues?.location_link ?? "",
      description: defaultValues?.description ?? "",
      theme_id: defaultValues?.theme_id ?? "classic",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="event_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe acara</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih tipe acara">
                      {(value: (typeof eventTypes)[number] | null) =>
                        value ? eventTypeLabels[value] : "Pilih tipe acara"
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {eventTypeLabels[type]}
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
          name="theme_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema</FormLabel>
              <FormControl>
                <ThemePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul / nama tuan rumah</FormLabel>
              <FormControl>
                <Input
                  placeholder="Budi & Ani"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    if (!slugTouchedRef.current) {
                      form.setValue("slug", slugify(e.target.value), {
                        shouldValidate: true,
                      })
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug (URL undangan)</FormLabel>
              <FormControl>
                <Input
                  placeholder="budi-ani"
                  {...field}
                  onChange={(e) => {
                    slugTouchedRef.current = true
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="event_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal & waktu acara</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat lokasi</FormLabel>
              <FormControl>
                <Input placeholder="Jl. Merdeka No. 1, Jakarta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Google Maps</FormLabel>
              <FormControl>
                <Input placeholder="https://maps.google.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi / cerita singkat</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {serverError ? (
          <p className="text-sm text-destructive">{serverError}</p>
        ) : null}

        <div className="flex items-center justify-end border-t border-border pt-6">
          <Button
            type="submit"
            className="h-11 gap-2 rounded-full px-8"
            disabled={pending}
          >
            {submitLabel}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </Form>
  )
}
