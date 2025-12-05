import { Suspense } from "react";

import Footer from "@/components/Footer";
import ProductFilterSkeleton from "@/components/ProductFilterSkeleton";
import ProductFilterWrapper from "@/components/ProductFilterWrapper";
import ProductGrid from "@/components/ProductGrid";
import ProductSearchbar from "@/components/ProductSearchbar";
import ProductsWithFiltersSkeleton from "@/components/ProductsWithFiltersSkeleton";
import { getFilteredProducts } from "@/lib/actions";

type SearchParams = Promise<{
  category?: string;
  sort?: string;
  inStock?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
  page?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Get filter data (categories and price range)
  const searchParamsData = await searchParams;

  return (
    <div>
      <section className="max-w-7xl px-4 mx-auto py-24">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-primary">
              Shop
            </h1>
            <p className="text-muted-foreground mt-1">
              Browse our selection of high-quality cooking products
            </p>
          </div>

          {/* Search form - this will submit to the same page with a search param */}
          <ProductSearchbar />

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            <div className="w-full md:w-72 shrink-0">
              <div className="space-y-6">
                <Suspense fallback={<ProductFilterSkeleton />}>
                  <ProductFilterWrapper />
                </Suspense>
              </div>
            </div>

            {/* Products grid with suspense boundary for streaming */}
            <div className="flex-1 scroll-mt-20" id="view-products">
              <Suspense
                key={`${searchParamsData.category}.${searchParamsData.inStock}.${searchParamsData.maxPrice}.${searchParamsData.minPrice}.${searchParamsData.page}.${searchParamsData.search}.${searchParamsData.sort}`}
                fallback={<ProductsWithFiltersSkeleton />}
              >
                <ProductsWithFilters searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// This component fetches the filtered products
async function ProductsWithFilters({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParamsData = await searchParams;
  const { products, pagination } = await getFilteredProducts(searchParamsData);

  return <ProductGrid products={products} pagination={pagination} />;
}
