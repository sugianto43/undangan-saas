"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  eventTypeLabels,
  eventTypes,
  invitationSchema,
  type InvitationInput,
} from "@/lib/validations/invitation"
import { ThemePicker } from "@/components/editor/ThemePicker"
import { themes } from "@/components/themes/themes"
import { slugify } from "@/lib/slug"
import { cn } from "@/lib/utils"
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
  /** Groups fields into a 3-step Detail/Tema/Tinjau wizard instead of one flat form. */
  wizard?: boolean
}

const detailFields = [
  "event_type",
  "title",
  "slug",
  "event_date",
  "location_text",
  "location_link",
  "description",
] as const

const steps = [
  { label: "Detail Acara" },
  { label: "Tema" },
  { label: "Tinjau" },
] as const

export function InvitationForm({
  defaultValues,
  onSubmit,
  submitLabel,
  pending,
  serverError,
  wizard,
}: InvitationFormProps) {
  const slugTouchedRef = useRef(Boolean(defaultValues?.slug))
  const [step, setStep] = useState(0)

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
      theme_id: defaultValues?.theme_id ?? "royal_classic",
    },
  })

  async function goToNextStep() {
    if (step === 0) {
      const valid = await form.trigger(detailFields)
      if (!valid) return
    }
    setStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const values = form.watch()

  return (
    <Form {...form}>
      {wizard ? (
        <div className="mb-8 flex items-center">
          {steps.map((item, index) => (
            <div key={item.label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border text-sm font-semibold",
                    index < step
                      ? "border-primary bg-primary text-primary-foreground"
                      : index === step
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  )}
                >
                  {index < step ? <Check className="size-4" /> : index + 1}
                </div>
                <span
                  className={cn(
                    "text-xs whitespace-nowrap",
                    index <= step ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </span>
              </div>
              {index < steps.length - 1 ? (
                <div
                  className={cn(
                    "mx-3 h-px flex-1",
                    index < step ? "bg-primary" : "bg-border"
                  )}
                />
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className={wizard && step !== 0 ? "hidden" : "space-y-5"}>
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
        </div>

        <div className={wizard && step !== 1 ? "hidden" : "space-y-5"}>
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
        </div>

        {wizard && step === 2 ? (
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Tinjau undangan Anda
            </h3>
            <dl className="glass-panel divide-y divide-border rounded-2xl px-5">
              {[
                ["Tipe acara", eventTypeLabels[values.event_type]],
                ["Judul", values.title || "—"],
                ["Slug", values.slug || "—"],
                [
                  "Tanggal & waktu",
                  values.event_date
                    ? new Date(values.event_date).toLocaleString("id-ID", {
                        dateStyle: "full",
                        timeStyle: "short",
                      })
                    : "—",
                ],
                ["Lokasi", values.location_text || "—"],
                ["Tema", themes[values.theme_id]?.label ?? values.theme_id],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="text-right text-sm font-medium text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {serverError ? (
          <p className="text-sm text-destructive">{serverError}</p>
        ) : null}

        <div className="flex items-center justify-between border-t border-border pt-6">
          {wizard && step > 0 ? (
            <Button
              type="button"
              variant="ghost"
              className="gap-1.5"
              onClick={() => setStep((current) => current - 1)}
            >
              <ArrowLeft className="size-4" />
              Kembali
            </Button>
          ) : (
            <span />
          )}

          {wizard && step < steps.length - 1 ? (
            <Button
              type="button"
              className="h-11 gap-2 rounded-full px-8"
              onClick={goToNextStep}
            >
              Lanjut
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-11 gap-2 rounded-full px-8"
              disabled={pending}
            >
              {submitLabel}
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
