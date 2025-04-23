"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export default function RecipesFilter() {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();
  const currentCategory = searchParams.get("category") ?? "All";
  const query = searchParams.get("query") ?? undefined;
  //   const filters = [
  //     { capacity: "all", text: <>All Cabins</> },
  //     { capacity: "small", text: <>1&mdash;3 guests</> },
  //     { capacity: "medium", text: <>4&mdash;7 guests</> },
  //     { capacity: "large", text: <>8&mdash;12 guests</> },
  //   ];

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.set("category", filter);
    router.push(currentPath + "?" + params.toString(), { scroll: false });
  };

  const categories = [
    "All",
    "Breakfast",
    "Sides",
    "Brunch",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
    "Beverage",
  ];

  return (
    <div>
      <ul className="flex gap-3 mt-8 flex-wrap justify-center md:justify-start">
        {/* <div className="flex items-center text-sm font-semibold text-muted-foreground">
      <Filter className="h-4 w-4 mr-2" />
      <p>Filter by categories</p>
      </div> */}
        {categories.map((category) => (
          <li key={category}>
            <Button
              variant={"outline"}
              className={`rounded-full cursor-pointer ${
                currentCategory === category &&
                "bg-primary text-slate-50 hover:bg-primary hover:text-slate-50"
              }`}
              size={"lg"}
              onClick={() => handleFilter(category)}
            >
              {category}
            </Button>
          </li>
        ))}
      </ul>

      <h2 className="text-primary text-4xl font-semibold mt-8">
        {query ? `Search results for "${query}"` : `${currentCategory} Recipes`}
      </h2>
    </div>
  );
}
