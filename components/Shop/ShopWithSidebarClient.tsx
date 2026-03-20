"use client";
import { useState } from "react";

import ProductItem from "@/components/Common/ProductItem";
import ShopSidebar, { FilterState } from "@/components/Shop/ShopSidebar";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

type Props = {
  initialProducts: Product[];
  categories: Category[];
};

const PRODUCTS_PER_PAGE = 9;

export default function ShopWithSidebarClient({
  initialProducts,
  categories,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(
    // Sort by price (highest to lowest) by default
    [...initialProducts].sort((a, b) => b.price - a.price),
  );
  const [sortBy] = useState<"default" | "price-asc" | "price-desc">(
    "price-desc",
  );

  const handleFilterChange = (filters: FilterState) => {
    let filtered = [...initialProducts];

    // Filter by category
    if (filters.selectedCategory) {
      filtered = filtered.filter((product) => {
        const productSlug = product.category?.slug
          ? String(product.category.slug)
          : "";

        return productSlug === filters.selectedCategory;
      });
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    // Filter by sizes (if your products have size data)
    if (filters.selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.productVariants?.some((variant) =>
          filters.selectedSizes.includes(variant.size || ""),
        ),
      );
    }

    // Filter by colors (if your products have color data)
    if (filters.selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.productVariants?.some((variant) =>
          filters.selectedColors.some(
            (color) => variant.color?.toLowerCase() === color.toLowerCase(),
          ),
        ),
      );
    }

    // Apply current sorting
    if (sortBy === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar */}
      <aside className="lg:col-span-3">
        <ShopSidebar
          categories={categories}
          totalProducts={initialProducts.length}
          onFilterChange={handleFilterChange}
        />
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-9">
        {/* Sort Options */}
        {/*<div className="flex items-center justify-between mb-6">*/}
        {/*    <p className="text-sm text-dark-4">*/}
        {/*        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of{" "}*/}
        {/*        {filteredProducts.length} products*/}
        {/*    </p>*/}
        {/*    <select*/}
        {/*        value={sortBy}*/}
        {/*        onChange={(e) =>*/}
        {/*            handleSortChange(*/}
        {/*                e.target.value as "default" | "price-asc" | "price-desc"*/}
        {/*            )*/}
        {/*        }*/}
        {/*        className="px-4 py-2 border border-gray-3 rounded-lg text-sm focus:outline-none focus:border-blue"*/}
        {/*    >*/}
        {/*        <option value="price-desc">Price: High to Low</option>*/}
        {/*        <option value="price-asc">Price: Low to High</option>*/}
        {/*    </select>*/}
        {/*</div>*/}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-7.5 gap-y-9">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <ProductItem key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-dark-4">
              No products found matching your filters.
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {/* Previous Button */}
            <button
              className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-3 py-2 text-dark-4"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  className={`px-4 py-2 rounded-lg transition ${
                    currentPage === page
                      ? "bg-blue text-white"
                      : "border border-gray-3 hover:bg-gray-1"
                  }`}
                  onClick={() => handlePageChange(page as number)}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1 disabled:opacity-50 disabled:cursor-not-allowed transition"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}

        {/* Page Info */}
        {filteredProducts.length > 0 && totalPages > 1 && (
          <div className="text-center mt-4">
            <p className="text-sm text-dark-4">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
