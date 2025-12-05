import React from "react";
import Footer from "@/components/Footer";
import RecipeCardSkeleton from "@/components/RecipeCardSkeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Bookmark, ChefHat, Heart, Shapes } from "lucide-react";

export default function PublicProfileSkeleton() {
  return (
    <div>
      <div className="max-w-6xl mx-auto pt-28 pb-10 px-2">
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-6">
            <div className="flex gap-4 items-center">
              <Avatar className="size-28 md:size-36 lg:size-44 border-2 border-primary">
                <AvatarFallback>
                  <Skeleton className="size-28 md:size-36 lg:size-44 rounded-full" />
                </AvatarFallback>
              </Avatar>

              <Skeleton className="w-32 h-8 md:hidden" />
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-2">
                <Skeleton className="w-48 h-8 hidden md:block" />
                <Skeleton className="w-full h-4 max-w-md" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="flex flex-col gap-6 sm:flex-row sm:justify-around">
              <div className="flex gap-2 items-center">
                <ChefHat className="h-10 w-10 text-primary" />
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <Skeleton className="w-12 h-10" />
                  <Skeleton className="w-16 h-4" />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Heart className="h-10 w-10 text-primary" />
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <Skeleton className="w-12 h-10" />
                  <Skeleton className="w-12 h-4" />
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <Bookmark className="h-10 w-10 text-primary" />
                <div className="text-3xl md:text-4xl lg:text-5xl">
                  <Skeleton className="w-12 h-10" />
                  <Skeleton className="w-20 h-4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <h3 className="text-xl flex justify-center gap-2 items-center font-semibold text-primary mb-2">
            <Shapes className="h-4 w-4 text-primary" />
            <Skeleton className="w-40 h-6" />
          </h3>

          <Separator />

          <div className="my-8 grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
