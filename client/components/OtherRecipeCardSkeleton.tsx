import { Clock, Heart, MessageCircle, Users } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function OtherRecipeCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex space-y-0 space-x-4">
        <div className="relative">
          <Skeleton className="absolute top-1 left-1 w-12 h-4 rounded-full z-10" />
          <Skeleton className="w-24 h-24 rounded-md" />
        </div>

        <div className="min-h-24 flex flex-col w-full">
          <div className="flex justify-between items-center">
            <Skeleton className="w-3/4 h-5" />
          </div>

          <div className="text-xs flex gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              <Skeleton className="w-8 h-4" />
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-primary" />
              <Skeleton className="w-12 h-4" />
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-auto">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-primary/75" />
              <Skeleton className="w-4 h-4" />
            </div>

            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4 text-primary/75" />
              <Skeleton className="w-4 h-4" />
            </div>
            <Skeleton className="w-[140px] h-8 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
