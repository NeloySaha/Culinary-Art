import { Recipe } from "@/lib/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import RecipeCard from "./RecipeCard";

export default function AllRecipeSection({ recipes }: { recipes: Recipe[] }) {
  return (
    <section className="max-w-7xl px-4 mx-auto py-10">
      <h2 className="text-primary text-4xl font-semibold mb-8">All Recipes</h2>

      <Input placeholder="Search for a recipe by name or keyword" />

      <div className="flex gap-3 mt-8 flex-wrap justify-center md:justify-start">
        {/* <div className="flex items-center text-sm font-semibold text-muted-foreground">
          <Filter className="h-4 w-4 mr-2" />
          <p>Filter by categories</p>
        </div> */}

        <Button variant={"outline"} className="rounded-full cursor-pointer">
          All
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Breakfast
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Brunch
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Lunch
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Dinner
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Snacks
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Desserts
        </Button>
        <Button variant={"outline"} className="rounded-full cursor-pointer">
          Beverage
        </Button>
      </div>

      <div className="my-8 grid md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-10">
        {recipes.map((recipe: Recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
