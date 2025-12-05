import React from "react";
import RecipeDetails from "./RecipeDetails";
import { cookies } from "next/headers";

export default async function ViewRecipeSection({ id }: { id: string }) {
  const token = (await cookies()).get("session")?.value;
  let user = null;
  if (token) {
    const userRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/users/user-info`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = await userRes.json();
    if (userData.success) {
      user = userData.data;
      user.totalRecipes = userData.userRecipes.length;
      user.userLikeCount = userData.totalLikesReceived;
    }
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/single-recipe/${id}`
  );
  const data = await res.json();

  if (!data.success)
    return (
      <p className="pt-24 text-center">
        Sorry, couldn&apos;t find the recipe. Please try again
      </p>
    );

  return <RecipeDetails recipe={data.data} user={user} />;
}
