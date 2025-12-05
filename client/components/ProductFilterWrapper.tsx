import React from "react";
import ProductFilter from "./ProductFilter";
import { getFilterData } from "@/lib/actions";

type ProductFiltersProps = {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
};

export default async function ProductFilterWrapper() {
  const filterData = await getFilterData();

  return (
    <ProductFilter
      categories={filterData.categories}
      priceRange={filterData.priceRange}
    />
  );
}
