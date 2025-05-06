"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

export default function ProductSearchbar() {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleQuery = (Query: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("sort");
    params.delete("inStock");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("page");
    params.set("search", Query);

    router.push(currentPath + "?" + params.toString(), { scroll: false });
    setQuery("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleQuery(query);
      }}
      className="w-full"
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-4 w-4" />
        <Input
          type="text"
          value={query}
          placeholder="Search for a product here"
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 border-2 border-primary"
        />
      </div>
    </form>
  );
}
