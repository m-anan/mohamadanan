import { GlobalFetchJson } from "@/core/api/fetcher/GlobalFetcher";
import GlobalService from "@/core/api/service/GlobalService";
import { _revalidate } from "@/utils";

interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  products_count: number;
}

interface CategoryResponse {
  data: Category[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export default class CategoryService implements GlobalService {
  methods = {
    async getCategories({ limit }: { limit?: string }): Promise<Category[]> {
      try {
        const headers = new Headers();
        headers?.set("Content-Type", "application/json");

        console.log(`Fetching categories with limit: ${limit || "none"}`);

        const response = await GlobalFetchJson<CategoryResponse>(
          `/categories${limit ? `?limit=${limit}` : ""}`,
          {
            method: "GET",
            headers: headers,
          }
        );

        console.log("Categories response:", response);

        if (!response.data || !Array.isArray(response.data)) {
          console.error("Invalid categories response format:", response);
          return [];
        }

        return response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
  };
}
