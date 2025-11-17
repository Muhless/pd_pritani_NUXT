interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase || "http://localhost:8080";

  // Helper untuk normalisasi URL dengan trailing slash
  const buildUrl = (endpoint: string) => {
    // Pastikan dimulai dengan /
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint;
    }

    // Tambahkan trailing slash jika belum ada (kecuali sudah ada :id)
    if (!endpoint.endsWith("/") && !endpoint.includes("/:")) {
      endpoint = endpoint + "/";
    }

    return `${baseURL}${endpoint}`;
  };

  async function get<T>(endpoint: string): Promise<T> {
    try {
      const url = buildUrl(endpoint);
      console.log("🔵 GET:", url);

      const response = await $fetch<ApiResponse<T>>(url, {
        method: "GET",
      });

      console.log("✅ Response:", response);

      if (response.success && response.data !== undefined) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal mengambil data"
      );
    }
  }

  async function post<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const url = buildUrl(endpoint);
      console.log("🔵 POST:", url, body);

      const response = await $fetch<ApiResponse<T>>(url, {
        method: "POST",
        body: body,
      });

      console.log("✅ Response:", response);

      if (response.success && response.data !== undefined) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal menambahkan data"
      );
    }
  }

  async function put<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const url = buildUrl(endpoint);
      console.log("🔵 PUT:", url, body);

      const response = await $fetch<ApiResponse<T>>(url, {
        method: "PUT",
        body: body,
      });

      console.log("✅ Response:", response);

      if (response.success && response.data !== undefined) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal mengupdate data"
      );
    }
  }

  async function patch<T>(endpoint: string, body?: any): Promise<T> {
    try {
      const url = buildUrl(endpoint);
      console.log("🔵 PATCH:", url, body);

      const response = await $fetch<ApiResponse<T>>(url, {
        method: "PATCH",
        body: body,
      });

      console.log("✅ Response:", response);

      if (response.success && response.data !== undefined) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal mengupdate data"
      );
    }
  }

  async function del<T>(endpoint: string): Promise<T> {
    try {
      const url = buildUrl(endpoint);
      console.log("🔵 DELETE:", url);

      const response = await $fetch<ApiResponse<T>>(url, {
        method: "DELETE",
      });

      console.log("✅ Response:", response);

      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || "Response tidak valid");
    } catch (err: any) {
      console.error("❌ Error:", err);
      throw new Error(
        err?.data?.message || err?.message || "Gagal menghapus data"
      );
    }
  }

  return {
    get,
    post,
    put,
    patch,
    del,
  };
};
