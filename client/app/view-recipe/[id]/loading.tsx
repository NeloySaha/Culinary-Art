import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="space-y-8">
      {/* Hero Section Skeleton */}
      <div className="relative rounded-xl overflow-hidden">
        <Skeleton className="aspect-video w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="space-y-2">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <div className="flex flex-wrap items-center gap-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24 mt-1" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      {/* Category and Keywords Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>

      {/* Recipe Content Skeleton */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Ingredients Skeleton */}
        <div className="md:col-span-1">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-3">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
          </div>
        </div>

        {/* Instructions Skeleton */}
        <div className="md:col-span-2">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-5 w-full" />
              ))}
          </div>
        </div>
      </div>

      <Skeleton className="h-px w-full my-8" />

      {/* Comments Section Skeleton */}
      <div>
        <Skeleton className="h-8 w-32 mb-4" />
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-9 w-32" />
          </div>
        </div>
        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="p-3 rounded-lg">
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
