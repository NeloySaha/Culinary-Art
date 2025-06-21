import PopularRecipeSection from "./PopularRecipeSection";

export default async function PopularRecipeSectionWrapper() {
  const allRecipesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_PREFIX}/recipes/popular-recipes`,
    {
      next: {
        revalidate: 3600 * 24,
      },
    }
  );
  const allRecipesData = await allRecipesRes.json();

  if (!allRecipesData.success) return <p>An error occurred</p>;

  return <PopularRecipeSection recipes={allRecipesData.data} />;
}
