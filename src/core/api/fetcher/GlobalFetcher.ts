import GlobalError from "../../models/GlobalError";
import { API_URL } from "@/config/apiUrl";

// Custom fetch wrapper
export async function GlobalFetchJson<T>(
  url: string,
  params?: RequestInit,
  base_url?: string
): Promise<T> {
  // Handle proxy route differently
  const fullUrl = base_url ? `${base_url}${url}` : `${API_URL}${url}`;

  console.log("Fetching from URL:", fullUrl);

  if (!params) {
    params = {};
  }

  // ✅ Force method to default to GET if not defined
  if (!params.method) {
    params.method = "GET";
  }

  // ✅ Only include credentials for direct API calls, not proxy calls
  if (!base_url || base_url !== "/api/proxy") {
    params.credentials = "include";
  }

  // ✅ Optional: Add headers if not present
  if (!params.headers) {
    params.headers = {
      "Content-Type": "application/json",
    };
  }

  // Add additional headers for proxy requests to ensure they're treated as API requests
  if (base_url === "/api/proxy") {
    params.headers = {
      ...params.headers,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };
  }

  try {
    const response = await fetch(fullUrl, params);
    if (!response.ok) {
      const errorResponse: GlobalError = await response.json();
      throw errorResponse;
    }
    const successResponse: T = await response.json();
    return successResponse;
  } catch (error) {
    throw error;
  }
}
