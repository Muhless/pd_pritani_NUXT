// composables/useApi.ts

// Interface untuk response standar dari backend
interface ApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();

  const baseURL = config.public.apiBase || "http://localhost:8080/api";

  // Generic request function
  async function request<T>(
    endpoint: string,
    options: {
      method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
      body?: any;
      headers?: Record<string, string>;
      params?: Record<string, any>;
    } = {},
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        ...options.headers,
      };

      // ✅ CRITICAL FIX: Jangan set Content-Type untuk FormData
      // Browser akan otomatis set dengan boundary yang benar
      if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      // Attach token jika ada
      if (process.client && auth.token) {
        headers.Authorization = `Bearer ${auth.token}`;
      }

      // Debug log
      console.log("🔵 API Request:", {
        url: `${baseURL}${endpoint}`,
        method: options.method || "GET",
        hasToken: !!auth.token,
        isFormData: options.body instanceof FormData,
        contentType: headers["Content-Type"] || "auto (FormData)",
      });

      const res = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        method: options.method || "GET",
        body: options.body,
        params: options.params,
        headers,
      });

      console.log("🟢 API Response:", res);

      return res;
    } catch (err: any) {
      console.error("🔴 API Error:", err);

      // Handle 401 Unauthorized
      if (err?.response?.status === 401 || err?.statusCode === 401) {
        auth.logout();
        navigateTo("/login");
      }

      const msg =
        err?.data?.message ||
        err?.response?._data?.message ||
        err?.message ||
        "Terjadi kesalahan server";

      throw new Error(msg);
    }
  }

  return {
    // GET dengan support params
    get: <T>(url: string, params?: Record<string, any>) =>
      request<T>(url, { method: "GET", params }),

    // POST
    post: <T>(url: string, body?: any) =>
      request<T>(url, { method: "POST", body }),

    // PUT
    put: <T>(url: string, body?: any) =>
      request<T>(url, { method: "PUT", body }),

    // PATCH
    patch: <T>(url: string, body?: any) =>
      request<T>(url, { method: "PATCH", body }),

    // DELETE
    del: <T>(url: string) => request<T>(url, { method: "DELETE" }),
  };
};
