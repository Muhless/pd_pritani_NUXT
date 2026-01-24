interface ApiResponse<T> {
  data: T;
  message?: string;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const auth = useAuthStore();

  const baseURL = config.public.apiBase || "http://localhost:8080/api";

  async function request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      const headers: any = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (auth.token) {
        headers.Authorization = `Bearer ${auth.token}`;
      }

      const res = await $fetch<ApiResponse<T>>(`${baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      return res.data;
    } catch (err: any) {
      const msg =
        err?.data?.message || err?.message || "Terjadi kesalahan server";
      throw new Error(msg);
    }
  }

  return {
    get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),

    post: <T>(endpoint: string, body?: any) =>
      request<T>(endpoint, {
        method: "POST",
        body,
      }),

    put: <T>(endpoint: string, body?: any) =>
      request<T>(endpoint, {
        method: "PUT",
        body,
      }),

    patch: <T>(endpoint: string, body?: any) =>
      request<T>(endpoint, {
        method: "PATCH",
        body,
      }),

    del: <T>(endpoint: string) =>
      request<T>(endpoint, {
        method: "DELETE",
      }),
  };
};
