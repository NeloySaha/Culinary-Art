import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bookmark,
  Clock,
  ForkKnifeCrossed,
  Heart,
  MessageSquare,
  Users,
} from "lucide-react";

export default function RecipeDetailsSkeleton() {
  return (
    <div className="space-y-6 mb-16">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-amber-200">
        <Skeleton className="w-full h-[400px]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <div className="space-y-2">
            <Skeleton className="h-10 w-3/4 text-white" />
            <div className="flex flex-wrap items-center gap-4 text-white/90 justify-between">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <Skeleton className="w-12 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>

              <Skeleton className="w-20 h-6 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-2 group">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <Skeleton className="w-10 h-10 rounded-full" />
            </AvatarFallback>
          </Avatar>

          <div>
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant={"outline"} size={"lg"} disabled>
            <Heart className="w-4 h-4" />
            <Skeleton className="w-6 h-4 ml-1" />
          </Button>
          <Button variant="outline" size="lg" disabled>
            <Bookmark className="w-4 h-4" />
            <Skeleton className="w-8 h-4 ml-1" />
          </Button>
          <Button variant="outline" size="lg" disabled>
            <MessageSquare className="w-4 h-4" />
            <Skeleton className="w-12 h-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Category and Keywords */}
      <div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-16 h-6 rounded-full" />
          <Skeleton className="w-20 h-6 rounded-full" />
          <Skeleton className="w-14 h-6 rounded-full" />
        </div>
      </div>

      <div>
        <Skeleton className="w-16 h-5 mb-2" />
        <div className="flex gap-1 items-center max-w-2xl">
          <Skeleton className="w-32 h-2" />
          <Skeleton className="w-12 h-4" />
        </div>
      </div>

      {/* Recipe Content */}
      <div className="grid gap-16">
        {/* Instructions */}
        <div>
          <Skeleton className="w-48 h-8 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[16px_1fr] gap-4 items-start"
              >
                <ForkKnifeCrossed className="h-4 w-4 text-primary mt-1" />
                <Skeleton className="w-full h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* Ingredients */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary/85">
              <Skeleton className="w-32 h-8" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-64 h-4" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center font-semibold mb-4 text-lg">
              <Skeleton className="w-12 h-6" />
              <div className="flex items-center gap-2">
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
            <ul className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <li key={index} className="flex justify-between capitalize">
                  <div className="font-normal flex items-center gap-2">
                    <Skeleton className="w-4 h-4" />
                    <Skeleton className="w-32 h-4" />
                  </div>
                  <Skeleton className="w-16 h-4" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Comments Section */}
      <div id="comments" className="scroll-mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-primary/85 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          <Skeleton className="w-32 h-8" />
        </h2>

        {/* Add Comment */}
        <div className="flex gap-4 mb-6">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              <Skeleton className="w-10 h-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="relative w-full">
            <Skeleton className="w-full h-28" />
            <Skeleton className="w-16 h-8 absolute bottom-2 right-2" />
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3 sm:gap-4">
              <Avatar className="h-9 w-9 sm:h-10 sm:w-10 border">
                <AvatarFallback>
                  <Skeleton className="w-9 h-9 sm:w-10 sm:h-10 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Skeleton className="w-24 h-4" />
                  <Skeleton className="w-16 h-3" />
                </div>
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
