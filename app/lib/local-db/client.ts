import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "app/lib/local-db/data");

export const localDB = {
  heroBanner: {
    async findMany(options?: {
      orderBy?: { [key: string]: "asc" | "desc" };
      include?: { [key: string]: any };
    }) {
      const filePath = path.join(DATA_DIR, "heroBanners.json");
      const data = await fs.readFile(filePath, "utf-8");
      let banners = JSON.parse(data);

      // Convert date strings to Date objects
      banners = banners.map((banner: any) => ({
        ...banner,
        createdAt: new Date(banner.createdAt),
        updatedAt: new Date(banner.updatedAt),
      }));

      // Apply ordering
      if (options?.orderBy) {
        const [field, order] = Object.entries(options.orderBy)[0];

        banners.sort((a: any, b: any) => {
          const aVal = a[field];
          const bVal = b[field];

          if (order === "desc") {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
          }

          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
      }

      return banners;
    },
    async findUnique(options: { where: { id: number } }) {
      const filePath = path.join(DATA_DIR, "heroBanners.json");
      const data = await fs.readFile(filePath, "utf-8");
      const banners = JSON.parse(data);

      const banner = banners.find((b: any) => b.id === options.where.id);

      if (!banner) {
        return null;
      }

      // Convert date strings to Date objects
      return {
        ...banner,
        createdAt: new Date(banner.createdAt),
        updatedAt: new Date(banner.updatedAt),
      };
    },
  },
  heroSlider: {
    async findMany(options?: {
      orderBy?: { [key: string]: "asc" | "desc" };
      include?: { [key: string]: any };
    }) {
      const filePath = path.join(DATA_DIR, "heroSliders.json");
      const data = await fs.readFile(filePath, "utf-8");
      let sliders = JSON.parse(data);

      // Convert date strings to Date objects
      sliders = sliders.map((slider: any) => ({
        ...slider,
        createdAt: new Date(slider.createdAt),
        updatedAt: new Date(slider.updatedAt),
      }));

      // Apply ordering
      if (options?.orderBy) {
        const [field, order] = Object.entries(options.orderBy)[0];

        sliders.sort((a: any, b: any) => {
          const aVal = a[field];
          const bVal = b[field];

          if (order === "desc") {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
          }

          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
      }

      return sliders;
    },
  },

  category: {
    async findMany(options?: {
      orderBy?: { [key: string]: "asc" | "desc" };
      include?: { [key: string]: any };
    }) {
      const filePath = path.join(DATA_DIR, "Categories.json");
      const data = await fs.readFile(filePath, "utf-8");
      let categories = JSON.parse(data);

      // Apply ordering
      if (options?.orderBy) {
        const [field, order] = Object.entries(options.orderBy)[0];

        categories.sort((a: any, b: any) => {
          const aVal = a[field];
          const bVal = b[field];

          if (order === "desc") {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
          }

          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
      }

      return categories;
    },
    async findUnique(options: { where: { id?: number; slug?: string } }) {
      const filePath = path.join(DATA_DIR, "Categories.json");
      const data = await fs.readFile(filePath, "utf-8");
      const categories = JSON.parse(data);

      const category = categories.find((c: any) => {
        if (options.where.id !== undefined) {
          return c.id === options.where.id;
        }
        if (options.where.slug !== undefined) {
          return c.slug === options.where.slug;
        }

        return false;
      });

      return category || null;
    },
  },

  product: {
    async findMany(options?: {
      orderBy?:
        | { [key: string]: "asc" | "desc" }
        | { reviews: { _count: "asc" | "desc" } }
        | Array<
            | { [key: string]: "asc" | "desc" }
            | { reviews: { _count: "asc" | "desc" } }
          >;
      select?: { [key: string]: any };
      take?: number;
      where?: {
        id?: { not: string };
        category?: { title?: { contains: string; mode?: string } };
        tags?: { hasSome: string[] };
        title?: { contains: string; mode?: string };
        OR?: any[];
      };
    }) {
      const filePath = path.join(DATA_DIR, "products.json");
      const data = await fs.readFile(filePath, "utf-8");
      let products = JSON.parse(data);

      // Convert date strings to Date objects
      products = products.map((product: any) => ({
        ...product,
        updatedAt: new Date(product.updatedAt),
      }));

      // Apply filtering
      if (options?.where) {
        // Filter out current product (for related products)
        if (options.where.id?.not) {
          const notId = options.where.id.not;

          products = products.filter((p: any) => p.id !== notId);
        }

        // Handle OR conditions (for related products)
        if (
          options.where.OR &&
          Array.isArray(options.where.OR) &&
          options.where.OR.length > 0
        ) {
          const orConditions = options.where.OR;

          products = products.filter((p: any) => {
            return orConditions.some((condition: any) => {
              // Category match
              if (condition.category?.title?.contains) {
                const categoryMatch =
                  p.category?.title
                    ?.toLowerCase()
                    .includes(
                      condition.category.title.contains.toLowerCase(),
                    ) ?? false;

                if (categoryMatch) return true;
              }

              // Tags match
              if (
                condition.tags?.hasSome &&
                Array.isArray(condition.tags.hasSome)
              ) {
                const tagsMatch =
                  p.tags?.some((tag: string) =>
                    condition.tags.hasSome.includes(tag),
                  ) ?? false;

                if (tagsMatch) return true;
              }

              // Title match
              if (condition.title?.contains) {
                const titleMatch = p.title
                  .toLowerCase()
                  .includes(condition.title.contains.toLowerCase());

                if (titleMatch) return true;
              }

              return false;
            });
          });
        }
      }

      // Apply ordering
      if (options?.orderBy) {
        const orderByArray = Array.isArray(options.orderBy)
          ? options.orderBy
          : [options.orderBy];

        products.sort((a: any, b: any) => {
          for (const orderByItem of orderByArray) {
            // Handle reviews count ordering
            if (typeof orderByItem === "object" && "reviews" in orderByItem) {
              const reviewsOrder = orderByItem.reviews as {
                _count: "asc" | "desc";
              };
              const order = reviewsOrder._count;
              const aVal = a.reviews || 0;
              const bVal = b.reviews || 0;

              if (aVal !== bVal) {
                return order === "desc" ? bVal - aVal : aVal - bVal;
              }
            } else {
              // Handle regular field ordering
              const [field, order] = Object.entries(orderByItem)[0];
              const aVal = a[field];
              const bVal = b[field];

              if (aVal !== bVal) {
                if (order === "desc") {
                  return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
                }

                return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
              }
            }
          }

          return 0;
        });
      }

      // Apply limit
      if (options?.take !== undefined && options.take > 0) {
        products = products.slice(0, options.take);
      }

      // Apply select (field projection)
      if (options?.select) {
        const selectObj = options.select;

        products = products.map((product: any) => {
          const selected: any = {};

          Object.keys(selectObj).forEach((key) => {
            if (key === "_count") {
              // Handle review count
              selected._count = { reviews: product.reviews };
            } else if (selectObj[key] === true) {
              selected[key] = product[key];
            } else if (selectObj[key] && typeof selectObj[key] === "object") {
              // Handle nested select (like productVariants)
              selected[key] = product[key];
            }
          });

          return selected;
        });
      }

      return products;
    },
    async findUnique(options: {
      where: { id?: string; slug?: string };
      select?: { [key: string]: any };
      include?: { [key: string]: any };
    }) {
      const filePath = path.join(DATA_DIR, "products.json");
      const data = await fs.readFile(filePath, "utf-8");
      const products = JSON.parse(data);

      const product = products.find((p: any) => {
        if (options.where.id !== undefined) {
          return p.id === options.where.id;
        }
        if (options.where.slug !== undefined) {
          return p.slug === options.where.slug;
        }

        return false;
      });

      if (!product) {
        return null;
      }

      // Convert date strings to Date objects
      const transformedProduct = {
        ...product,
        updatedAt: new Date(product.updatedAt),
      };

      // Apply select if specified
      if (options?.select) {
        const selectObj = options.select;
        const selected: any = {};

        Object.keys(selectObj).forEach((key) => {
          if (key === "_count") {
            selected._count = { reviews: transformedProduct.reviews };
          } else {
            selected[key] = transformedProduct[key];
          }
        });

        return selected;
      }

      return transformedProduct;
    },
  },

  headerSetting: {
    async findFirst() {
      const filePath = path.join(DATA_DIR, "headerSettings.json");
      const data = await fs.readFile(filePath, "utf-8");
      const headerSetting = JSON.parse(data);

      return headerSetting;
    },
    async findUnique(options: { where: { id: number } }) {
      const filePath = path.join(DATA_DIR, "headerSettings.json");
      const data = await fs.readFile(filePath, "utf-8");
      const headerSetting = JSON.parse(data);

      if (headerSetting.id === options.where.id) {
        return headerSetting;
      }

      return null;
    },
  },
};
