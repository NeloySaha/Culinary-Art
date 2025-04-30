import React from "react";
import AllRecipeSection from "./AllRecipeSection";
import { Recipe } from "@/lib/types";

export default async function AllRecipeSectionWrapper({
  category,
  query,
  keyword,
}: {
  category: string;
  query: string | undefined;
  keyword: string | undefined;
}) {
  const currentCategory = category;
  let allRecipesData: { success: boolean; data: Recipe[]; message: string } = {
    success: false,
    data: [],
    message: "",
  };

  if (query) {
    const allRecipesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/search/${query}`
    );

    allRecipesData = await allRecipesRes.json();
  } else if (keyword) {
    const allRecipesRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/keyword-recipes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keyword,
        }),
      }
    );

    allRecipesData = await allRecipesRes.json();
  } else {
    if (currentCategory === "All" || currentCategory === "all") {
      const allRecipesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/all-recipes`
      );

      allRecipesData = await allRecipesRes.json();
    }

    if (currentCategory !== "All" && currentCategory !== "all") {
      const allRecipesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/categories/${currentCategory}`
      );

      allRecipesData = await allRecipesRes.json();
    }
  }

  if (!allRecipesData.success)
    return (
      <p className="my-8 text-destructive text-lg font-medium">
        {allRecipesData.message}
      </p>
    );

  if (allRecipesData.data.length === 0)
    return (
      <p className="my-8 text-lg font-medium">Sorry, no recipes found :(</p>
    );

  return <AllRecipeSection recipes={allRecipesData.data} />;
}
