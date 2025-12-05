import OtherRecipeSection from "@/components/OtherRecipeSection";
import OtherRecipeSectionSkeleton from "@/components/OtherRecipeSectionSkeleton";
import RecipeDetailsSkeleton from "@/components/RecipeDetailsSkeleton";
import Spinner from "@/components/Spinner";
import ViewRecipeSection from "@/components/ViewRecipeSection";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 grid xl:grid-cols-[1fr_380px] md:gap-8 xl:gap-8">
      <Suspense key={id} fallback={<RecipeDetailsSkeleton />}>
        <ViewRecipeSection id={id} />
      </Suspense>

      <div>
        <h2 className="text-3xl text-primary font-semibold mb-4">
          Other Recipes
        </h2>
        <Suspense key={id} fallback={<OtherRecipeSectionSkeleton />}>
          <OtherRecipeSection id={id} />
        </Suspense>
      </div>
    </div>
  );
}
