import { unstable_cache } from "next/cache";

import { Category } from "@/types/category";
import { localDB } from "@/app/lib/local-db/client";

export const getCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const categories = await localDB.category.findMany({
      orderBy: { id: "asc" },
    });

    // Data is already in the correct format from JSON
    return categories as Category[];
  },
  ["categories"],
  { tags: ["categories"] },
);
