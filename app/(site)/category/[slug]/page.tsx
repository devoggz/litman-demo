import { notFound } from "next/navigation";

import { getAllProducts } from "@/components/get-api-data/product";
import { getCategories } from "@/components/get-api-data/category";
import ProductItem from "@/components/Common/ProductItem";
import ShopSidebar from "@/components/Shop/ShopSidebar";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ FIX: await params before using it
  const { slug } = await params;

  const allProducts = await getAllProducts();
  const categories = await getCategories();

  // Find the current category
  const currentCategory = categories.find((cat) => cat.slug?.current === slug);

  if (!currentCategory) {
    notFound();
  }

  // Filter products by category
  const categoryProducts = allProducts.filter(
    (product) => product.category?.slug?.current === slug,
  );

  return (
    <div className="pt-35 pb-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">
            {currentCategory.title}
          </h1>
          <p className="text-dark-4">{currentCategory.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <ShopSidebar
              categories={categories}
              totalProducts={categoryProducts.length}
              onFilterChange={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-dark-4">
                  Showing {categoryProducts.length} of {categoryProducts.length}{" "}
                  Products
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select className="px-4 py-2 border border-gray-3 rounded-lg text-sm focus:outline-none focus:border-blue">
                  <option>Latest Products</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Best Selling</option>
                </select>

                <div className="flex gap-2">
                  <button className="p-2 bg-blue text-white rounded-lg">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 border border-gray-3 rounded-lg hover:bg-gray-1">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        fillRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {categoryProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-7.5 gap-y-9">
                  {categoryProducts.map((item) => (
                    <ProductItem
                      key={item.id} // ✅ FIX: stable key
                      item={item}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {categoryProducts.length > 9 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      disabled
                      className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button className="px-4 py-2 bg-blue text-white rounded-lg">
                      1
                    </button>
                    <button className="px-4 py-2 border border-gray-3 rounded-lg hover:bg-gray-1">
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-dark-4">
                  No products found in this category
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
