import AllRecipeSectionWrapper from "@/components/AllRecipeSectionWrapper";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PopularRecipeSectionWrapper from "@/components/PopularRecipeSectionWrapper";
import RecipeSearchbar from "@/components/RecipeSearchbar";
import RecipesFilter from "@/components/RecipesFilter";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

type SearchParams = Promise<{ [category: string]: string | undefined }>;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParamsData = await searchParams;
  const category = searchParamsData.category ?? "All";
  const query = searchParamsData.query;

  return (
    <div>
      <HeroSection />

      <Suspense fallback={<Spinner />}>
        <PopularRecipeSectionWrapper />
      </Suspense>

      <section className="max-w-7xl px-4 mx-auto py-10">
        <RecipeSearchbar />
        <RecipesFilter />

        <Suspense fallback={<Spinner />} key={category}>
          <AllRecipeSectionWrapper category={category} query={query} />
        </Suspense>
      </section>

      <Footer />
    </div>
  );
}
