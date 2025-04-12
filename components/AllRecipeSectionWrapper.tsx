import React from "react";
import AllRecipeSection from "./AllRecipeSection";

export default async function AllRecipeSectionWrapper() {
  const allRecipesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/all-recipes`
  );
  const allRecipesData = await allRecipesRes.json();

  if (!allRecipesData.success) return <p>An error occurred</p>;

  return <AllRecipeSection recipes={allRecipesData.data} />;
}
