import AllRecipeSectionSkeleton from "@/components/AllRecipeSectionSkeleton";
import AllRecipeSectionWrapper from "@/components/AllRecipeSectionWrapper";
import { CategorySelector } from "@/components/CategorySelector";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import KeywordsWrapper from "@/components/KeywordsWrapper";
import PopularRecipeSectionSkeleton from "@/components/PopularRecipeSectionSkeleton";
import PopularRecipeSectionWrapper from "@/components/PopularRecipeSectionWrapper";
import RecipeSearchbar from "@/components/RecipeSearchbar";
import RecipesFilter from "@/components/RecipesFilter";
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
  const keyword = searchParamsData.keyword;
  const currentPage = searchParamsData.page;

  const curKey = `${category}-${query}-${keyword}-${currentPage}`;

  return (
    <div>
      <HeroSection />

      <section className="scroll-mt-16" id="popular-recipes">
        <div className="max-w-7xl px-4 mx-auto py-10">
          <h2 className="text-primary text-2xl lg:text-4xl font-semibold">
            Most Popular
          </h2>

          <Suspense fallback={<PopularRecipeSectionSkeleton />}>
            <PopularRecipeSectionWrapper />
          </Suspense>
        </div>
      </section>

      <section
        className="max-w-7xl px-4 mx-auto pt-10 py-16 scroll-mt-16"
        id="recipes"
      >
        <h2 className="text-primary text-2xl lg:text-4xl font-semibold mb-8">
          Recipes
        </h2>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <RecipeSearchbar />
          <CategorySelector />
        </div>
        <KeywordsWrapper />

        <RecipesFilter />

        <Suspense fallback={<AllRecipeSectionSkeleton />} key={curKey}>
          <AllRecipeSectionWrapper
            category={category}
            query={query}
            keyword={keyword}
            page={currentPage}
          />
        </Suspense>
      </section>

      <Footer />
    </div>
  );
}
