import { unstable_cache } from "next/cache";

import { Product, IProductByDetails, ProductIdAndTitle } from "@/types/product";
import { localDB } from "@/app/lib/local-db/client";

// Get product for id and title
export const getProductsIdAndTitle = unstable_cache(
  async (): Promise<ProductIdAndTitle[]> => {
    const products = await localDB.product.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
      },
    });

    return products as ProductIdAndTitle[];
  },
  ["products"],
  { tags: ["products"] },
);

// Get new arrival products
export const getNewArrivalsProduct = unstable_cache(
  async (): Promise<Product[]> => {
    const products = await localDB.product.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        price: true,
        discountedPrice: true,
        slug: true,
        quantity: true,
        updatedAt: true,
        productVariants: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      take: 8,
    });

    return products.map(({ _count, ...item }: any) => ({
      ...item,
      reviews: _count.reviews,
    })) as Product[];
  },
  ["products"],
  { tags: ["products"] },
);

// Get bestselling products
export const getBestSellingProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const products = await localDB.product.findMany({
      select: {
        id: true,
        title: true,
        shortDescription: true,
        price: true,
        discountedPrice: true,
        slug: true,
        quantity: true,
        updatedAt: true,
        productVariants: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: {
        reviews: {
          _count: "desc",
        },
      },
      take: 6,
    });

    return products.map(({ _count, ...item }: any) => ({
      ...item,
      reviews: _count.reviews,
    })) as Product[];
  },
  ["products"],
  { tags: ["products"] },
);

// Get latest products
export const getLatestProducts = unstable_cache(
  async (): Promise<Product[]> => {
    const products = await localDB.product.findMany({
      select: {
        id: true,
        title: true,
        shortDescription: true,
        price: true,
        discountedPrice: true,
        slug: true,
        quantity: true,
        updatedAt: true,
        productVariants: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: [{ reviews: { _count: "desc" } }, { updatedAt: "desc" }],
      take: 3,
    });

    return products.map(({ _count, ...item }: any) => ({
      ...item,
      reviews: _count.reviews,
    })) as Product[];
  },
  ["products"],
  { tags: ["products"] },
);

// GET ALL PRODUCTS
export const getAllProducts = unstable_cache(
  async (
    orderBy:
      | { updatedAt?: "asc" | "desc" }
      | { reviews: { _count: "asc" | "desc" } } = { updatedAt: "desc" },
  ): Promise<Product[]> => {
    const products = await localDB.product.findMany({
      orderBy,
      select: {
        id: true,
        title: true,
        shortDescription: true,
        price: true,
        discountedPrice: true,
        slug: true,
        quantity: true,
        updatedAt: true,
        productVariants: true,
        category: {
          select: {
            title: true,
            slug: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    return products.map(({ _count, ...item }: any) => ({
      ...item,
      reviews: _count.reviews,
    })) as Product[];
  },
  ["products"],
  { tags: ["products"] },
);

// GET PRODUCT BY SLUG
export const getProductBySlug = async (
  slug: string,
): Promise<IProductByDetails | null> => {
  const product = await localDB.product.findUnique({
    where: { slug },
    select: {
      id: true,
      title: true,
      shortDescription: true,
      description: true,
      price: true,
      discountedPrice: true,
      slug: true,
      quantity: true,
      updatedAt: true,
      category: true,
      productVariants: true,
      _count: {
        select: {
          reviews: true,
        },
      },
      additionalInformation: true,
      customAttributes: true,
      body: true,
      tags: true,
      offers: true,
      sku: true,
    },
  });

  if (!product) {
    return null;
  }

  const transformProduct: IProductByDetails = {
    ...product,
    reviews: product._count.reviews,
  };

  return transformProduct;
};

// GET PRODUCT BY ID
export const getProductById = async (
  productId: string,
): Promise<IProductByDetails | null> => {
  const product = await localDB.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return null;
  }

  return product as IProductByDetails;
};

// GET RELATED PRODUCTS
export const getRelatedProducts = unstable_cache(
  async (
    category: string,
    tags: string[] | undefined,
    currentProductId: string,
    productTitle: string,
  ): Promise<Product[]> => {
    const products = await localDB.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        price: true,
        discountedPrice: true,
        quantity: true,
        updatedAt: true,
        tags: true,
        category: true,
        productVariants: true,
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      where: {
        id: {
          not: currentProductId,
        },
        OR: [
          {
            category: {
              title: {
                contains: category,
                mode: "insensitive",
              },
            },
          },
          {
            tags: {
              hasSome: tags,
            },
          },
          {
            title: {
              contains: productTitle,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 8,
    });

    return products.map(({ _count, ...item }: any) => ({
      ...item,
      reviews: _count.reviews,
    })) as Product[];
  },
  ["related-products"],
  { tags: ["products"] },
);
