"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  keywords: string[];
};

export default function KeywordsFilter({ keywords }: Props) {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();
  const currentCategory = searchParams.get("category") ?? "All";
  const query = searchParams.get("query") ?? undefined;
  const currentKeyword = searchParams.get("keyword") ?? undefined;
  //   const filters = [
  //     { capacity: "all", text: <>All Cabins</> },
  //     { capacity: "small", text: <>1&mdash;3 guests</> },
  //     { capacity: "medium", text: <>4&mdash;7 guests</> },
  //     { capacity: "large", text: <>8&mdash;12 guests</> },
  //   ];

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("category");

    params.set("keyword", filter);
    router.push(currentPath + "?" + params.toString(), { scroll: false });
  };

  return (
    <ul className="flex gap-3 mt-8 flex-wrap justify-center md:justify-start">
      {keywords.map((keyword) => (
        <li key={keyword}>
          <Button
            variant={"outline"}
            className={`rounded-full border border-primary cursor-pointer capitalize ${
              currentKeyword === keyword &&
              "bg-primary text-slate-50 hover:bg-primary hover:text-slate-50"
            }`}
            size={"sm"}
            onClick={() => handleFilter(keyword)}
          >
            {keyword}
          </Button>
        </li>
      ))}
    </ul>
  );
}
