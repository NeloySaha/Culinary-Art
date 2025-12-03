import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGridSkeleton() {
  const skeletonItems = Array.from({ length: 12 });

  return (
    <div id="view-products" className="scroll-mt-16">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletonItems.map((_, index) => (
          <ProductCardSkeleton key={`Productskeleton-${index}`} />
        ))}
      </div>
    </div>
  );
}
