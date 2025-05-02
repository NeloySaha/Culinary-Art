import { getSession } from "@/lib/actions";
import { JWTPayload } from "jose";
import React from "react";
import { Separator } from "./ui/separator";
import { Shapes } from "lucide-react";
import RecipeCard from "./RecipeCard";
import { Recipe } from "@/lib/types";

export default async function UserPosts() {
  const session = await getSession();
  let recipes = null;
  if ((session as JWTPayload).id) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/user-recipes/${
        (session as JWTPayload).id
      }`
    );

    recipes = (await res.json()).data;
  }
  return (
    <div className="mt-12">
      <h3 className="text-xl flex justify-center gap-2 items-center font-semibold text-primary mb-2">
        <Shapes className="h-4 w-4 text-primary" />
        <p>Your Recipes</p>
      </h3>
      <Separator />

      <div className="my-8 grid md:grid-cols-2 gap-x-4 gap-y-8">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
