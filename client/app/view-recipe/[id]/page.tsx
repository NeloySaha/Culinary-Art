import RecipeDetails from "@/components/RecipeDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/single-recipe/${id}`
  );
  const data = await res.json();

  if (!data.success)
    return (
      <p className="pt-24 text-center">
        Sorry, couldn't find the recipe. Please try again
      </p>
    );
  return (
    <div className="max-w-7xl mx-auto px-4 pt-24">
      <RecipeDetails recipe={data.data} />
    </div>
  );
}
