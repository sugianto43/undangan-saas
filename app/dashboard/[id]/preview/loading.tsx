import { Skeleton } from "@/components/ui/skeleton"

export default function PreviewLoading() {
  return (
    <div className="flex flex-col items-center gap-6 px-6 py-16">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-64" />
      <Skeleton className="mt-6 h-64 w-full max-w-md" />
    </div>
  )
}
