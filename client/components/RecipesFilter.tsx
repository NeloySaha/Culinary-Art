"use client";

import { useSearchParams } from "next/navigation";

export default function RecipesFilter() {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "All";
  const query = searchParams.get("query") ?? undefined;
  const keyword = searchParams.get("keyword") ?? undefined;

  return (
    <div>
      <h2 className="text-primary text-4xl font-semibold mt-8">
        {keyword && `Search results for Keyword: "${keyword}"`}
        {query && `Search results for "${query}"`}
        {!keyword && !query && `${currentCategory} Recipes`}
      </h2>
    </div>
  );
}
