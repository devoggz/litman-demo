import { unstable_cache } from "next/cache";

import { localDB } from "@/app/lib/local-db/client";
import { IHeroBanner, IHeroSlider } from "@/types/hero";

/**
 * Get all hero banners with product details
 * Data is cached and revalidated based on the "heroBanners" tag
 */
export const getHeroBanners = unstable_cache(
  async (): Promise<IHeroBanner[]> => {
    const heroBanners = await localDB.heroBanner.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        product: {
          select: {
            price: true,
            discountedPrice: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    // Data is already in the correct format from JSON
    // No need to convert Decimal to number since JSON stores numbers directly
    return heroBanners as IHeroBanner[];
  },
  ["heroBanners"],
  { tags: ["heroBanners"] },
);

/**
 * Get all hero sliders with product details
 * Data is cached and revalidated based on the "heroSliders" tag
 */
export const getHeroSliders = unstable_cache(
  async (): Promise<IHeroSlider[]> => {
    const heroSliders = await localDB.heroSlider.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        product: {
          select: {
            price: true,
            discountedPrice: true,
            title: true,
            slug: true,
            shortDescription: true,
          },
        },
      },
    });

    // Data is already in the correct format from JSON
    // No need to convert Decimal to number since JSON stores numbers directly
    return heroSliders as IHeroSlider[];
  },
  ["heroSliders"],
  { tags: ["heroSliders"] },
);

/**
 * Get a single hero banner by ID
 * Data is cached with a tag specific to the banner ID
 */
export const getSingleHeroBanner = async (id: number) =>
  unstable_cache(
    async () => {
      return await localDB.heroBanner.findUnique({
        where: {
          id: id,
        },
      });
    },
    ["single-hero-banner"],
    { tags: [`single-hero-banner-${id}`] },
  )();
