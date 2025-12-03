import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PopularRecipeCardSkeleton() {
  return (
    <Card className="h-[560px] lg:h-full flex flex-col gap-1">
      <CardHeader className="relative">
        <Skeleton className="absolute top-2 right-8 w-16 h-6 rounded-full z-10" />

        <Skeleton className="w-full h-56 rounded-lg" />
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Skeleton className="w-12 h-6 rounded-full" />
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-14 h-6 rounded-full" />
        </div>
        <Skeleton className="w-3/4 h-6 mt-2" />

        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-6 h-4" />
          </div>

          <div className="flex items-center gap-1">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-6 h-4" />
          </div>
        </div>

        <div className="flex gap-1 items-center">
          <Skeleton className="w-20 h-2" />
          <Skeleton className="w-12 h-4" />
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="w-12 h-4" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto lg:mt-4">
        <Skeleton className="w-full h-10" />
      </CardFooter>
    </Card>
  );
}
