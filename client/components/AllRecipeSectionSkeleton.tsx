import React from "react";
import RecipeCardSkeleton from "./RecipeCardSkeleton";

export default function AllRecipeSectionSkeleton() {
  return (
    <div className="my-8 grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-10">
      {Array.from({ length: 9 }).map((_, index) => (
        <RecipeCardSkeleton key={`recipe-${index}`} />
      ))}
    </div>
  );
}
