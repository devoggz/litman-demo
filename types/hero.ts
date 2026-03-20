// types/hero.ts

export type IHeroSlider = {
  id: number;
  sliderName: string;
  sliderImage: string;
  discountRate: number;
  slug: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
  product: {
    price: number;
    discountedPrice?: number | null;
    title: string;
    slug: string;
    shortDescription: string;
  };
};

export type IHeroBanner = {
  id: number;
  bannerName: string | null;
  bannerImage: string;
  slug: string;
  productId: string;
  subtitle?: string;
  createdAt: Date;
  updatedAt: Date;
  product: {
    price: number;
    discountedPrice?: number | null;
    title: string;
    slug: string;
  };
};
