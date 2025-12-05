import React from "react";
import OtherRecipeCardSkeleton from "./OtherRecipeCardSkeleton";
import { Skeleton } from "./ui/skeleton";

export default function OtherRecipeSectionSkeleton() {
  const skeletonItems = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div className="space-y-4">
      {skeletonItems.map((item) => (
        <OtherRecipeCardSkeleton key={item} />
      ))}

      <Skeleton className="w-full h-10" />
    </div>
  );
}
