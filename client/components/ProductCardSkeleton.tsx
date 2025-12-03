import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "./ui/separator";

export default function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col gap-1 group h-full">
      <CardHeader className="relative">
        <Skeleton className="absolute top-2 right-8 w-16 h-6 rounded-full z-10" />

        <Skeleton className="w-full h-56 rounded-lg" />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="w-3/4 h-5" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-2/3 h-4" />
      </CardContent>

      <CardFooter className="flex flex-col gap-4 mt-auto items-start">
        <Skeleton className="w-20 h-5 place-self-end" />

        <Separator />

        <Skeleton className="w-full h-10" />

        <Skeleton className="w-full h-10" />
      </CardFooter>
    </Card>
  );
}
