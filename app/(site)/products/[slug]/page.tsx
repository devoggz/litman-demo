import { notFound } from "next/navigation";

import { getProductBySlug } from "@/components/get-api-data/product";
import ProductPageClient from "@/components/Shop/ProductPageClient";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Serialize the product data to make it safe for client components
  const serializedProduct = {
    ...product,
    slug:
      typeof product.slug === "string" ? product.slug : String(product.slug),
    body: product.body ?? undefined, // Convert null to undefined
    discountedPrice: product.discountedPrice ?? undefined, // Convert null to undefined
    updatedAt:
      typeof product.updatedAt === "string"
        ? product.updatedAt
        : product.updatedAt.toISOString(),
    category: product.category
      ? {
          ...product.category,
          slug:
            typeof product.category.slug === "string"
              ? product.category.slug
              : String(product.category.slug),
        }
      : undefined,
    description: product.description ?? undefined, // Convert null to undefined
    sku: product.sku ?? undefined, // Convert null to undefined
    tags: product.tags ?? undefined, // Convert null to undefined
    offers: product.offers ?? undefined, // Convert null to undefined
  };

  return <ProductPageClient product={serializedProduct} />;
}
