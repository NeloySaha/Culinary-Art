"use client";

import { useSearchParams } from "next/navigation";

export default function RecipesFilter() {
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") ?? "All";
  const query = searchParams.get("query") ?? undefined;
  const keyword = searchParams.get("keyword") ?? undefined;

  return (
    <div>
      <h2
        className="text-primary text-xl lg:text-3xl font-semibold mt-8 scroll-mt-20"
        id="view-recipes"
      >
        {keyword && `Results for keyword: "${keyword}"`}
        {query && `Search results for "${query}"`}
        {!keyword && !query && `${currentCategory}`}
      </h2>
    </div>
  );
}
