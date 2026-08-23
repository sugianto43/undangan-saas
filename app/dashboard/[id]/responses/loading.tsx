import { Skeleton } from "@/components/ui/skeleton"

export default function ResponsesLoading() {
  return (
    <main className="mx-auto max-w-2xl space-y-10 p-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-32 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
    </main>
  )
}
