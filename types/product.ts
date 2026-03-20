export interface Product {
  id: string;
  title: string;
  price: number;
  discountedPrice?: number | null;
  slug: string;
  quantity: number;
  updatedAt: Date | string;
  reviews: number;
  shortDescription: string;
  category?: {
    title: string;
    slug?: {
      current: string;
    };
  } | null;

  productVariants: {
    color: string;
    image: string;
    size: string;
    isDefault: boolean;
  }[];
}

export interface IProductByDetails {
  id: string;
  title: string;
  shortDescription: string;
  description: string | null;
  price: number;
  discountedPrice?: number | null;
  slug: string;
  quantity: number;
  updatedAt: Date | string;
  category: {
    title: string;
    slug?: {
      current: string;
    };
  } | null;

  productVariants: {
    color: string;
    image: string;
    size: string;
    isDefault: boolean;
  }[];

  reviews: number;

  additionalInformation: {
    name: string;
    description: string;
  }[];

  customAttributes: {
    attributeName: string;
    attributeValues: {
      id: string;
      title: string;
    }[];
  }[];

  body: string | null;
  tags: string[] | null;
  offers: string[] | null;
  sku: string | null;
}

export interface ProductIdAndTitle {
  id: string;
  title: string;
}
