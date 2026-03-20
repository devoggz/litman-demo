import { getAllProducts } from "@/components/get-api-data/product";
import { getCategories } from "@/components/get-api-data/category";
import ShopWithSidebarClient from "@/components/Shop/ShopWithSidebarClient";

export default async function ShopWithSidebarPage() {
  const products = await getAllProducts();
  const categories = await getCategories();

  return (
    <div className="pt-35 pb-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
        <ShopWithSidebarClient
          categories={categories}
          initialProducts={products}
        />
      </div>
    </div>
  );
}
