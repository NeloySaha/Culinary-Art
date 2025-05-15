import { Product } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PaginationLink from "./PaginationLink";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}

export default function ProductGrid({
  products,
  pagination,
}: ProductGridProps) {
  const { total, page, totalPages } = pagination;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">{total} products found</p>
      </div>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8">
              <PaginationLink
                page={page > 1 ? page - 1 : null}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </PaginationLink>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationLink
                  key={p}
                  page={p}
                  isActive={p === page}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </PaginationLink>
              ))}

              <PaginationLink
                page={page < totalPages ? page + 1 : null}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </PaginationLink>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
